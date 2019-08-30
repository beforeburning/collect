"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const domObtain_1 = require("../../../../../common/domObtain");
class ClassGrab {
    classGrab(classCount) {
        return new Promise(resolve => {
            if (!config_1.default.youlaiListKey[classCount]) {
                console.log('抓取结束');
                process.exit();
            }
            // 抓取地址
            let link = `${config_1.default.firstClass}${config_1.default.youlaiListKey[classCount]}/`;
            // 抓取dom
            let domObtain = new domObtain_1.default(link);
            domObtain.obtain(['.main_content .yslist_dq dl:nth-child(2) dd a'], dom => {
                if (dom) {
                    // 返回所有分类的地址
                    let linkArr = [];
                    dom[0].map(item => {
                        linkArr.push(`${config_1.default.youlaiLink}${dom[0][item].attribs.href}`);
                    });
                    resolve(linkArr);
                }
                else {
                    console.log('抓取错误');
                    process.exit();
                }
            });
        });
    }
}
exports.default = ClassGrab;
//# sourceMappingURL=index.js.map