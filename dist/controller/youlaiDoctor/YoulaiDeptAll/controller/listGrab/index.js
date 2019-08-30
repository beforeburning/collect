"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const domObtain_1 = require("../../../../../common/domObtain");
const mysql_1 = require("../../../../../common/mysql");
class ListGrab {
    constructor(data) {
        this.data = '';
        // 栏目数
        this.count = 0;
        this.data = data;
    }
    listGrab(callback) {
        let mysql = new mysql_1.default();
        let domObtain = new domObtain_1.default(this.data['hospitalLink']);
        let domObj = [];
        domObtain.obtain(['.main_content .yslist06 div li a'], dom => {
            if (dom[0]) {
                dom[0].map(item => {
                    let str = {
                        hospitalId: this.data['id'],
                        deptName: dom[0][item].children[0].data,
                        deptLink: `${config_1.default.youlaiLink}${dom[0][item].children[0].parent.attribs.href}`
                    };
                    domObj.push(str);
                });
                let map = domObj.map(item => {
                    return new Promise(resolve => {
                        mysql.insert('youlai_dept', item, () => {
                            console.log(`${item['deptName']} 已抓取`);
                            resolve();
                        });
                    });
                });
                Promise.all(map).then(() => {
                    callback();
                });
            }
            else {
                callback();
            }
        });
    }
}
exports.default = ListGrab;
//# sourceMappingURL=index.js.map