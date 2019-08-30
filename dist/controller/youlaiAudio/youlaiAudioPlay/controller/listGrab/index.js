"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../config");
const domObtain_1 = require("../../../../../common/domObtain");
const contentGrab_1 = require("../contentGrab");
const character_1 = require("../../../../../common/tool/character");
class ListGrab {
    constructor() {
        this.contentLink = [];
        this.data = '';
        // 列表页数
        this.count = 0;
        // ID容错
        this.idErrorCount = 0;
    }
    listGrab(next, callback) {
        let domObtain = new domObtain_1.default(next ? next : this.data);
        domObtain.obtain(['.mymvlist li', '#pages li:last-child a', '#next'], dom => {
            if (!dom) {
                this.listGrab(false, callback);
            }
            else {
                // 小标下一页
                let smallNextUrl = dom[2][0].attribs.href;
                // 小标下一页 id
                let smallNextUrlId = character_1.default.urlNextId(smallNextUrl);
                // 当前页面id
                let currentUrlId = character_1.default.urlNextId(next);
                // 下一页的url
                let nextUrl = `${config_1.default.youlaiLink}${smallNextUrl}`;
                dom[0].map(item => {
                    if (dom[0][item]) {
                        this.contentLink.push(`${config_1.default.youlaiLink}${dom[0][item].children[1].attribs.href}`);
                    }
                });
                let contentGrab = new contentGrab_1.default(this.contentLink);
                // 详情抓取完毕 抓取下一个
                contentGrab.contentGrab().then(() => {
                    console.log(`开始抓取第${currentUrlId}页`);
                    if (currentUrlId < smallNextUrlId) {
                        this.listGrab(nextUrl, callback);
                    }
                    else if ((smallNextUrlId < currentUrlId) && this.idErrorCount <= 3) {
                        nextUrl = character_1.default.youlaiNextErr(next);
                        this.idErrorCount++;
                        this.listGrab(nextUrl, callback);
                    }
                    else {
                        callback();
                    }
                });
            }
        });
    }
}
exports.default = ListGrab;
//# sourceMappingURL=index.js.map