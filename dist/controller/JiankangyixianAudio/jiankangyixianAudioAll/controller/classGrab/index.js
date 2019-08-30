"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domObtain_1 = require("../../../../../common/domObtain");
const config_1 = require("../../config");
class ClassGrab {
    classGrab() {
        return new Promise(resolve => {
            let domObtain = new domObtain_1.default(config_1.default.jiankangyixianClass);
            domObtain.obtain(['.ylpc_dise_list a'], dom => {
                let classLink = [];
                dom[0].map(item => {
                    classLink.push(`${config_1.default.jiankangyixianLink}${dom[0][item].attribs.href}`);
                });
                resolve(classLink);
            });
        });
    }
}
exports.default = ClassGrab;
//# sourceMappingURL=index.js.map