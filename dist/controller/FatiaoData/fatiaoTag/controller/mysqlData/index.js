"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../../../../../common/mysql");
const json_1 = require("../../../../../common/tool/json");
class MysqlData {
    constructor() {
        this.mysql = new mysql_1.default();
    }
    listData() {
        return new Promise(resolve => {
            this.mysql.joinTable(['jk_fatiao_article', 'jk_fatiao_article_info'], ['id', 'title'], ['article_id', 'content'], 'id', 'article_id', 'jk_fatiao_article.mark = 1', res => {
                resolve(json_1.default.jsonToJson(res));
            });
        });
    }
    dataSave(data) {
        return new Promise(resolve => {
            this.mysql.insert('fatiaoTag', data, () => {
                console.log('已保存');
                resolve();
            });
        });
    }
}
exports.default = MysqlData;
//# sourceMappingURL=index.js.map