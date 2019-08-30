"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysqlData_1 = require("./mysqlData");
const async = require("async");
const filter_1 = require("../../../../common/tool/filter");
const baiduTag_1 = require("./baiduTag");
class Start {
    constructor() {
        this.MysqlData = new mysqlData_1.default();
    }
    start() {
        this.MysqlData.listData().then(res => {
            this.asyncStart(res);
        });
    }
    asyncStart(list) {
        async.mapLimit(list, 1, (data, callback) => {
            console.log(`${data['title']} 正在处理`);
            data['content'] = filter_1.default.filterHtml(data['content']);
            baiduTag_1.default.topic(data['title'], data['content']).then(res => {
                let str = Object.assign({}, data, res);
                this.MysqlData.dataSave(str).then(() => {
                    callback();
                });
            });
        });
    }
}
exports.default = Start;
//# sourceMappingURL=index.js.map