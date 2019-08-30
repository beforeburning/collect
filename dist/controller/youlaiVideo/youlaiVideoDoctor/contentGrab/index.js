"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domObtain_1 = require("../../../../common/domObtain");
const mysql_1 = require("../../../../common/mysql");
class ContentGrab {
    constructor(link) {
        this.link = [];
        this.link = link;
    }
    contentGrab(docCount) {
        return new Promise(resolve => {
            let mysql = new mysql_1.default();
            let map = this.link.map(item => {
                return new Promise(contentResolve => {
                    let domObtain = new domObtain_1.default(item);
                    domObtain.obtain(['#video2', '.info_box h3', '.p_time span', '#dda .p_name', '#dda .p_hospital'], dom => {
                        if (!dom) {
                            console.log(`抓取错误 跳过`);
                            contentResolve();
                        }
                        else {
                            if (dom[1] && dom[3][0].children[1]) {
                                let str = {
                                    url: item,
                                    title: dom[1][0].children[0].data,
                                    time: dom[2][0].children[0].data,
                                    cover: dom[0][0].children[1].parent.attribs.poster,
                                    video: dom[0][0].children[1].attribs.src,
                                    name: dom[3][0].children[0].data,
                                    position: dom[3][0].children[1].children[0].data,
                                    hospital: dom[4][0].children[0].data.split(' ')[3],
                                    department: dom[4][0].children[0].data.split(' ')[4],
                                    doctorid: docCount
                                };
                                // 入库
                                mysql.insert('youlai', str, () => {
                                    console.log(`${str.title} 已抓取`);
                                    contentResolve();
                                });
                            }
                            else {
                                contentResolve();
                            }
                        }
                    });
                });
            });
            Promise.all(map).then(() => {
                resolve();
            });
        });
    }
}
exports.default = ContentGrab;
//# sourceMappingURL=index.js.map