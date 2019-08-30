"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const domObtain_1 = require("../../../../common/domObtain");
const mysql_1 = require("../../../../common/mysql");
class YoulaiAmount {
    constructor() {
        this.lvCount = 0;
        this.docCount = 1;
        this.mysql = new mysql_1.default();
    }
    start() {
        this.lvFun();
    }
    lvFun() {
        console.log(`开始抓取分类${this.lvCount}的第${this.docCount}页`);
        if (config_1.default.youlaiLink[this.lvCount]) {
            let url = `${config_1.default.youlaiLink[this.lvCount]}${this.docCount}`;
            let domObtain = new domObtain_1.default(url);
            domObtain.obtain(['.zhuanjia_list li div'], dom => {
                if (dom[0][0]) {
                    let docData = [];
                    dom[0].map(item => {
                        if (dom[0][item].children[1].attribs.href) {
                            let str = {
                                link: dom[0][item].children[1].attribs.href
                            };
                            docData.push(str);
                        }
                    });
                    let map = docData.map(item => {
                        return new Promise(resolve => {
                            this.mysql.insert('jiankangyixian_doctor', item, () => {
                                console.log(`已抓取`);
                                resolve();
                            });
                        });
                    });
                    Promise.all(map).then(() => {
                        this.docCount++;
                        this.lvFun();
                    });
                }
                else {
                    this.lvCount++;
                    this.docCount = 1;
                    this.lvFun();
                }
            });
        }
        else {
            console.log('抓取结束');
            process.exit();
        }
    }
}
exports.default = YoulaiAmount;
//# sourceMappingURL=index.js.map