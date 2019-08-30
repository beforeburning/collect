"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domObtain_1 = require("../../../../common/domObtain");
const contentGrab_1 = require("../contentGrab");
const character_1 = require("../../../../common/tool/character");
const config_1 = require("../config");
class ListGrab {
    constructor(docCount) {
        // 医生id
        this.docCount = '';
        // 列表页数
        this.count = 1;
        this.linkArr = [];
        this.docCount = docCount;
    }
    listGrab(callback) {
        let url = character_1.default.regularUrl(config_1.default.youlaiVideoDocLink, this.count, parseInt(this.docCount));
        let domObtain = new domObtain_1.default(url);
        domObtain.obtain(['a'], dom => {
            if (dom[0]) {
                dom[0].map(item => {
                    let link = dom[0][item].attribs.href;
                    this.linkArr.push(`${config_1.default.youlaiMLink}${link}`);
                });
                this.count++;
                this.listGrab(callback);
            }
            else {
                let contentGrab = new contentGrab_1.default(this.linkArr);
                contentGrab.contentGrab(parseInt(this.docCount)).then(() => {
                    callback();
                });
            }
        });
    }
}
exports.default = ListGrab;
//# sourceMappingURL=index.js.map