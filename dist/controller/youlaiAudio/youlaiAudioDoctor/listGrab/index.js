"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domObtain_1 = require("../../../../common/domObtain");
const mysql_1 = require("../../../../common/mysql");
const character_1 = require("../../../../common/tool/character");
const config_1 = require("../config");
class ListGrab {
    constructor(docCount) {
        // 医生id
        this.docId = '';
        // 列表页数
        this.count = 1;
        this.docId = docCount;
    }
    listGrab(callback) {
        let mysql = new mysql_1.default();
        let url = character_1.default.regularUrl(config_1.default.youlaiAudioDocLink, this.count, parseInt(this.docId));
        let domObtain = new domObtain_1.default(url);
        domObtain.obtain(['a.audioAsk'], dom => {
            if (dom[0] && dom[0].length !== 0) {
                let map = dom[0].map(item => {
                    return new Promise(resolve => {
                        let str = {
                            url: `${config_1.default.youlaiMLink}${dom[0][item].attribs.href}`,
                            title: dom[0][item].children[1].children[0].data,
                            time: dom[0][item].children[3].children[1].children[0].data,
                            audioTime: dom[0][item].children[3].children[0].children[0].next.data.split('时长')[1],
                            doctorid: this.docId
                        };
                        mysql.insert('youlai_audio', str, () => {
                            console.log(`${str.title} 已抓取`);
                            resolve();
                        });
                    });
                });
                Promise.all(map).then(() => {
                    this.count++;
                    this.listGrab(callback);
                }).catch(() => {
                    this.count++;
                    this.listGrab(callback);
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