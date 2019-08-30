"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const docData_1 = require("./docData");
const listGrab_1 = require("./listGrab");
class youlaiVideoDoctor {
    constructor() {
        this.docCount = 0;
    }
    start() {
        docData_1.default.docData().then(res => {
            if (res[this.docCount]) {
                console.log(`开始抓取第${this.docCount}个医生`);
                let listGrab = new listGrab_1.default(res[this.docCount]);
                listGrab.listGrab(() => {
                    this.docCount++;
                    this.start();
                });
            }
            else {
                console.log('抓取结束');
                process.exit();
            }
        });
    }
}
exports.default = youlaiVideoDoctor;
//# sourceMappingURL=index.js.map