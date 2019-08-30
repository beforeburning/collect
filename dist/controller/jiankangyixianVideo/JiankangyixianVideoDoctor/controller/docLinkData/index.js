"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../../../../../common/mysql");
const docData = () => {
    return new Promise(resolve => {
        let mysql = new mysql_1.default();
        mysql.select('jiankangyixian_doctor', ['link'], docId => {
            let docIdArr = [];
            docId.map(item => docIdArr.push(item['link']));
            resolve(docIdArr);
        });
    });
};
exports.default = {
    docData
};
//# sourceMappingURL=index.js.map