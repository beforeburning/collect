"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domObtain_1 = require("../../../../../common/domObtain");
const mysql_1 = require("../../../../../common/mysql");
const character_1 = require("../../../../../common/tool/character");
const config_1 = require("../../config");
class ListGrab {
    constructor() {
        this.count = 0;
        this.mysql = new mysql_1.default();
    }
    listGrab(link, callback) {
        let domObtain = new domObtain_1.default(link);
        domObtain.obtain(['.mymvlist .listone', '#next'], dom => {
            let nextT = `${config_1.default.jiankangyixianLink}${dom[1][0].attribs.href}`;
            let next = nextT.indexOf('javascript') !== -1 ? 'false' : nextT;
            let listData = [];
            dom[0].map(item => {
                if (dom[0][item]) {
                    let cover = dom[0][item].children[1].children[3].children[1].children[1].attribs.src;
                    let str = {
                        url: dom[0][item].children[1].attribs.href,
                        title: dom[0][item].children[1].children[1].children[2].data.replace(/[\r\n]/g, ''),
                        cover: cover,
                        time: character_1.default.jiankangyixianLinkTime(cover)
                    };
                    listData.push(str);
                }
            });
            if (listData.toString()) {
                let map = listData.map(item => {
                    return new Promise(resolve => {
                        this.mysql.insert('jiankangyixian_audio', item, () => {
                            console.log(`音频 - ${item['title']} 已抓取`);
                            resolve();
                        });
                    });
                });
                Promise.all(map).then(() => {
                    next === 'false' ? callback() : this.listGrab(next, callback);
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