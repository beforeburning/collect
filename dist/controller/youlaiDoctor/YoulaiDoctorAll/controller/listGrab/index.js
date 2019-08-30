"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domObtain_1 = require("../../../../../common/domObtain");
class ListGrab {
    constructor(data) {
        this.data = '';
        // 栏目数
        this.count = 0;
        this.data = data;
    }
    listGrab() {
        let domObtain = new domObtain_1.default(this.data['hospitalLink']);
        domObtain.obtain(['.main_content .yslist06 div li a'], dom => {
            dom[0].map(item => {
                if (dom[0][item]) {
                    console.log(dom[0][item].children[0].data);
                    // this.contentLink.push(`${YOULAICONFIG.youlaiLink}${dom[0][item].children[0].parent.attribs.href}`)
                }
            });
            // // 并发抓取所有地区
            // console.log(this.contentLink);
        });
    }
}
exports.default = ListGrab;
//# sourceMappingURL=index.js.map