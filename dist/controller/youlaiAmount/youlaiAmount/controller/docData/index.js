"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../../../../../common/mysql");
const docData = () => {
    return new Promise(resolve => {
        let mysql = new mysql_1.default();
        // mysql.select('youlai_doctor', ['doctorId'], docId => {
        //     let docIdArr = [];
        //     docId.map(item => docIdArr.push(item.doctorId))
        //     resolve(docIdArr);
        // })
        mysql.distinct('doctor', 'doctorid', docId => {
            let docIdArr = [];
            docId.map(item => docIdArr.push(item.doctorid));
            resolve(docIdArr);
        });
    });
};
exports.default = {
    docData
};
//# sourceMappingURL=index.js.map