"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domObtain_1 = require("../../../../../common/domObtain");
const mysql_1 = require("../../../../../common/mysql");
const character_1 = require("../../../../../common/tool/character");
class ContentGrab {
    constructor(link) {
        this.link = [];
        this.link = link;
    }
    contentGrab() {
        return new Promise(resolve => {
            let mysql = new mysql_1.default();
            let map = this.link.map(item => {
                return new Promise(contentResolve => {
                    let domObtain = new domObtain_1.default(item);
                    domObtain.obtain(['.v_title', '.v_info_01 .time', '#myVideo', '.doc_pic_box .mgBottom10 strong', '.doc_pic_box .mgBottom10 span', '.doc_pic_box .p1', '.doc_pic_box a'], dom => {
                        if (!dom) {
                            console.log(`抓取错误 跳过`);
                            contentResolve();
                        }
                        else {
                            if (!dom[0][0]) {
                                contentResolve();
                            }
                            else {
                                let docUrl = dom[6][1].attribs.href.split('/');
                                let time = character_1.default.timeCharacter(dom[1][0].children[0].data);
                                let str = {
                                    url: item,
                                    title: dom[0][0].children[0].data,
                                    time: time,
                                    cover: dom[2][0].children[0].parent.attribs.poster,
                                    video: dom[2][0].children[1].attribs.src,
                                    name: dom[3][0].children[0].data,
                                    position: dom[4][0].children[0].data,
                                    hospital: dom[5][0].children[0].data,
                                    department: dom[5][1].children[0].data,
                                    doctorid: docUrl[docUrl.length - 2]
                                };
                                // 入库
                                mysql.insert('youlai_video_old', str, () => {
                                    console.log(`${str.title} 已抓取`);
                                    contentResolve();
                                });
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