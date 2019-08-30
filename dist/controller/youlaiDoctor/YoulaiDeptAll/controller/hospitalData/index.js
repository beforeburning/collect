"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../../../../../common/mysql");
class HospitalData {
    hospitalData() {
        return new Promise(resolve => {
            let mysql = new mysql_1.default();
            mysql.select('youlai_hospital', ['id', 'hospitalName', 'hospitalLink'], res => {
                resolve(res);
            });
        });
    }
}
exports.default = HospitalData;
//# sourceMappingURL=index.js.map