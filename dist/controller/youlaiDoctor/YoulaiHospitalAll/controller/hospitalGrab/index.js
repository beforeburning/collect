"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const domObtain_1 = require("../../../../../common/domObtain");
const mysql_1 = require("../../../../../common/mysql");
class HospitalGrab {
    hospitalGrab(regionLink, callback) {
        let domObtain = new domObtain_1.default(regionLink);
        let mysql = new mysql_1.default();
        domObtain.obtain(['.main_content .yslist06 div', '.main_content dl:nth-child(1) a.link05'], dom => {
            dom[0].map(item => {
                let str = {
                    reguinName: dom[0][item].children[1].children[0].children[0].data,
                    hospitalLink: `${config_1.default.youlaiLink}${dom[0][item].children[4].prev.children[0].next.children[1].attribs.href}`,
                    hospitalName: dom[0][item].children[4].prev.children[0].next.children[1].children[0].data
                };
                mysql.insert('youlai_hospital', str, () => {
                    console.log(`${str.hospitalName} 已抓取`);
                    callback();
                });
            });
        });
    }
}
exports.default = HospitalGrab;
//# sourceMappingURL=index.js.map