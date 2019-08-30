"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const domObtain_1 = require("../../../../../common/domObtain");
class RegionGrab {
    constructor() {
        this.regionLinkArr = [];
    }
    regionGrab() {
        return new Promise(resolve => {
            console.log('抓取地区列表');
            let domObtain = new domObtain_1.default(config_1.default.regionLink);
            domObtain.obtain(['.main_content .yslist_dq dl:nth-child(1) a'], dom => {
                dom[0].map(item => {
                    this.regionLinkArr.push(`${config_1.default.youlaiLink}${dom[0][item].attribs.href}`);
                });
                resolve(this.regionLinkArr);
            });
        });
    }
}
exports.default = RegionGrab;
//# sourceMappingURL=index.js.map