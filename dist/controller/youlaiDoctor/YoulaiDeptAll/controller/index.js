"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listGrab_1 = require("../controller/listGrab");
const hospitalData_1 = require("../controller/hospitalData");
class YoulaiVideoDoctor {
    constructor() {
        // 第几个大分类
        this.classCount = 0;
    }
    start() {
        // 获取所有医院
        let hospitalData = new hospitalData_1.default();
        hospitalData.hospitalData().then(data => {
            if (data[this.classCount]) {
                let listGrab = new listGrab_1.default(data[this.classCount]);
                listGrab.listGrab(() => {
                    this.classCount++;
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
exports.default = YoulaiVideoDoctor;
//# sourceMappingURL=index.js.map