"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = require("./dao");
const character_1 = require("../tool/character");
class mysql {
    constructor() {
        this.dao = dao_1.default();
    }
    insert(tableName, parameters, callback) {
        let field = '';
        let parameter = '';
        for (let item in parameters) {
            if (item !== 'id') {
                field += `${item},`;
                parameter += `'${parameters[item]}',`;
            }
        }
        let sql = `INSERT INTO ${tableName} (${character_1.default.removeOneSubstring(field)}) VALUES (${character_1.default.removeOneSubstring(parameter)})`;
        // @ts-ignore
        this.dao.query(sql, () => {
            callback();
        });
    }
    select(tableName, parameters, callback) {
        let field = '';
        for (let item in parameters) {
            field += `${parameters[item]},`;
        }
        let sql = `SELECT ${character_1.default.removeOneSubstring(field)} FROM ${tableName}`;
        // @ts-ignore
        this.dao.query(sql, (err, res) => {
            callback(res);
        });
    }
    distinct(tableName, parameters, callback) {
        let sql = `select distinct ${parameters} FROM ${tableName}`;
        // @ts-ignore
        this.dao.query(sql, (err, res) => {
            callback(res);
        });
    }
    // select jk_fatiao_article.id, jk_fatiao_article.title, jk_fatiao_article_info.content from jk_fatiao_article
    // jk_fatiao_article LEFT join jk_fatiao_article_info jk_fatiao_article_info
    // on jk_fatiao_article.id = jk_fatiao_article_info.article_id WHERE jk_fatiao_article.mark = 1
    joinTable(tableName, oParameters, tParameters, oKey, tKey, where, callback) {
        let parameters = ``;
        oParameters.map(item => {
            parameters += `${tableName[0]}.${item},`;
        });
        tParameters.map(item => {
            parameters += `${tableName[1]}.${item},`;
        });
        let sql = `
            select ${character_1.default.removeOneSubstring(parameters)} FROM ${tableName[0]}
            ${tableName[0]} LEFT join ${tableName[1]} 
            ${tableName[1]} on ${tableName[0]}.${oKey} = ${tableName[1]}.${tKey}
            WHERE ${where}
        `;
        // @ts-ignore
        this.dao.query(sql, (err, res) => {
            callback(res);
        });
    }
}
exports.default = mysql;
//# sourceMappingURL=index.js.map