"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domObtain_1 = require("../../../../../common/domObtain");
// 详情页和之前的一样
const contentGrab_1 = require("../../../youlaiVideoReading/controller/contentGrab");
const config_1 = require("../../../youlaiVideoReading/config");
class ListGrab {
    constructor(data) {
        this.data = '';
        // 列表页数
        this.count = 1;
        this.data = data;
    }
    listGrab(next, callback) {
        let domObtain = new domObtain_1.default(next ? next : this.data);
        domObtain.obtain(['#videoList li', '.page_next'], dom => {
            if (!dom) {
                this.listGrab(false, callback);
            }
            else {
                console.log(`正在抓取 第${this.count}页`);
                let contentLink = [];
                let next = dom[1][0] ? `${config_1.default.youlaiLink}${dom[1][0].attribs.href}` : false;
                dom[0].map(item => {
                    if (dom[0][item]) {
                        contentLink.push(`${config_1.default.youlaiLink}${dom[0][item].children[1].attribs.href}`);
                    }
                });
                if (next === false || next.indexOf('javascript:;') !== -1) {
                    callback();
                }
                else {
                    // 并发抓取
                    let contentGrab = new contentGrab_1.default(contentLink);
                    contentGrab.contentGrab().then(() => {
                        this.count++;
                        this.listGrab(next, callback);
                    });
                }
            }
        });
    }
}
exports.default = ListGrab;
//# sourceMappingURL=index.js.map