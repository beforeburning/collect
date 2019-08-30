"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const domObtain_1 = require("../../../../../common/domObtain");
const contentGrab_1 = require("../contentGrab");
class ListGrab {
    constructor(data) {
        this.contentLink = [];
        this.data = '';
        // 列表页数
        this.count = 0;
        this.data = data;
    }
    listGrab(next, callback) {
        let domObtain = new domObtain_1.default(next ? next : this.data);
        domObtain.obtain(['#videoList li', '.page_next'], dom => {
            if (!dom) {
                this.listGrab(false, callback);
            }
            else {
                let next = dom[1][0] ? `${config_1.default.youlaiLink}${dom[1][0].attribs.href}` : false;
                dom[0].map(item => {
                    if (dom[0][item]) {
                        this.contentLink.push(`${config_1.default.youlaiLink}${dom[0][item].children[1].attribs.href}`);
                    }
                });
                if (next === false || next.indexOf('javascript:;') !== -1) {
                    // 并发抓取
                    let contentGrab = new contentGrab_1.default(this.contentLink);
                    // 详情抓取完毕 抓取下一个
                    contentGrab.contentGrab().then(() => {
                        callback();
                    });
                }
                else {
                    this.count++;
                    this.listGrab(next, callback);
                }
            }
        });
    }
}
exports.default = ListGrab;
//# sourceMappingURL=index.js.map