"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domObtain_1 = require("../../../../../common/domObtain");
class ClassGrab {
    classGrab() {
        return new Promise(resolve => {
            let domObtain = new domObtain_1.default(global['config'].jiankangyixianClass);
            domObtain.obtain(['.kstab .content_item a'], dom => {
                let classLink = [];
                dom[0].map(item => {
                    classLink.push(dom[0][item].attribs.href);
                });
                resolve(classLink);
            });
        });
    }
}
exports.default = ClassGrab;
//# sourceMappingURL=index.js.map