import dao from './dao';
import character from '../tool/character';
import Interface from './Interface';

export default class mysql implements Interface {

    dao: object;

    constructor() {
        this.dao = dao();
    }

    insert(tableName: string, parameters: object, callback: any) {
        let field: string = '';
        let parameter: string = '';

        for (let item in parameters) {
            if (item !== 'id') {
                field += `${item},`;
                parameter += `'${parameters[item]}',`;
            }
        }

        let sql: string = `INSERT INTO ${tableName} (${character.removeOneSubstring(field)}) VALUES (${character.removeOneSubstring(parameter)})`;
        // @ts-ignore
        this.dao.query(sql, () => {
            callback();
        });
    }

    select(tableName: string, parameters: string[], callback: any) {
        let field: string = '';

        for (let item in parameters) {
            field += `${parameters[item]},`;
        }

        let sql: string = `SELECT ${character.removeOneSubstring(field)} FROM ${tableName}`;

        // @ts-ignore
        this.dao.query(sql, (err, res) => {
            callback(res);
        });
    }

    distinct(tableName: string, parameters: string, callback: any) {
        let sql: string = `select distinct ${parameters} FROM ${tableName}`;
        // @ts-ignore
        this.dao.query(sql, (err, res) => {
            callback(res);
        });
    }

    // select jk_fatiao_article.id, jk_fatiao_article.title, jk_fatiao_article_info.content from jk_fatiao_article
    // jk_fatiao_article LEFT join jk_fatiao_article_info jk_fatiao_article_info
    // on jk_fatiao_article.id = jk_fatiao_article_info.article_id WHERE jk_fatiao_article.mark = 1
    joinTable(tableName: string[], oParameters: string[], tParameters: string[], oKey: string, tKey: string, where: string, callback) {
        let parameters = ``;
        oParameters.map(item => {
            parameters += `${tableName[0]}.${item},`
        });
        tParameters.map(item => {
            parameters += `${tableName[1]}.${item},`
        });
        let sql: string = `
            select ${character.removeOneSubstring(parameters)} FROM ${tableName[0]}
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
