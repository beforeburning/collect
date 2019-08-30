"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../../../../../common/mysql");
class DeptData {
    deptData() {
        return new Promise(resolve => {
            let mysql = new mysql_1.default();
            mysql.select('youlai_dept', ['id', 'deptLink'], res => {
                resolve(res);
            });
        });
    }
}
exports.default = DeptData;
//# sourceMappingURL=index.js.map