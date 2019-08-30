"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../../../../../common/mysql");
const character_1 = require("../../../../../common/tool/character");
const config_1 = require("../../config");
const domObtain_1 = require("../../../../../common/domObtain");
class AmountGrab {
    constructor(docId) {
        this.docId = parseInt(docId);
        this.mysql = new mysql_1.default();
    }
    amountGrab(callback) {
        let video = new Promise(resolve => {
            this.videoGrab(1, this.docId, () => {
                resolve();
            });
        });
        let audio = new Promise(resolve => {
            this.audioGrab(1, this.docId, () => {
                resolve();
            });
        });
        Promise.all([video, audio]).then(() => {
            callback();
        });
    }
    videoGrab(count, docId, callback) {
        // docId = 22829;
        let url = character_1.default.regularUrl(config_1.default.youlaiVideoDocLink, count, docId);
        let domObtain = new domObtain_1.default(url);
        domObtain.obtain(['a'], dom => {
            if (dom[0] && dom[0].length !== 0) {
                let domObj = [];
                dom[0].map(item => {
                    let str = {
                        url: `${config_1.default.youlaiMLink}${dom[0][item].attribs.href}`,
                        title: dom[0][item].children[1].children[3].children[1].children[0].data,
                        time: dom[0][item].children[1].children[3].children[3].children[1].children[0].data,
                        doctorid: docId
                    };
                    domObj.push(str);
                });
                let map = domObj.map(item => {
                    return new Promise(resolve => {
                        this.mysql.insert('youlai_video', item, () => {
                            console.log(`视频 - ${item['title']} 已抓取`);
                            resolve();
                        });
                    });
                });
                Promise.all(map).then(() => {
                    this.audioGrab(++count, docId, callback);
                });
            }
            else {
                callback();
            }
        });
    }
    audioGrab(count, docId, callback) {
        // docId = 22829;
        // 列表页数
        let url = character_1.default.regularUrl(config_1.default.youlaiAudioDocLink, count, docId);
        let domObtain = new domObtain_1.default(url);
        domObtain.obtain(['a.audioAsk'], dom => {
            if (dom[0] && dom[0].length !== 0) {
                let domObj = [];
                dom[0].map(item => {
                    let str = {
                        url: `${config_1.default.youlaiMLink}${dom[0][item].attribs.href}`,
                        title: dom[0][item].children[1].children[0].data,
                        time: dom[0][item].children[3].children[1].children[0].data,
                        audioTime: dom[0][item].children[3].children[0].children[0].next.data.split('时长')[1],
                        doctorid: docId
                    };
                    domObj.push(str);
                });
                let map = domObj.map(item => {
                    return new Promise(resolve => {
                        this.mysql.insert('youlai_audio', item, () => {
                            console.log(`音频 - ${item['title']} 已抓取`);
                            resolve();
                        });
                    });
                });
                Promise.all(map).then(() => {
                    this.audioGrab(++count, docId, callback);
                });
            }
            else {
                callback();
            }
        });
    }
}
exports.default = AmountGrab;
//# sourceMappingURL=index.js.map