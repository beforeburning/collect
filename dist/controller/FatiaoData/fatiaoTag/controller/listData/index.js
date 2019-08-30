"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../../../../../common/mysql");
const json_1 = require("../../../../../common/tool/json");
class ListData {
    constructor() {
        this.mysql = new mysql_1.default();
    }
    listData() {
        return new Promise(resolve => {
            this.mysql.joinTable(['jk_fatiao_article', 'jk_fatiao_article_info'], ['id', 'title'], ['content'], 'id', 'article_id', 'jk_fatiao_article.mark = 1', res => {
                resolve(json_1.default.jsonToJson(res));
            });
        });
    }
}
exports.default = ListData;
//# sourceMappingURL=index.js.map