"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regionGrab_1 = require("./regionGrab");
const hospitalGrab_1 = require("./hospitalGrab");
class YoulaiVideoDoctor {
    start() {
        let regionGrab = new regionGrab_1.default();
        regionGrab.regionGrab().then(regionLinkArr => {
            // 并发抓取所有医院
            let map = regionLinkArr.map(item => {
                return new Promise(resolve => {
                    let hospitalGrab = new hospitalGrab_1.default();
                    hospitalGrab.hospitalGrab(item, () => {
                        resolve();
                    });
                });
            });
            Promise.all(map).then(() => {
                console.log('抓取结束');
                process.exit();
            });
        });
    }
}
exports.default = YoulaiVideoDoctor;
//# sourceMappingURL=index.js.map