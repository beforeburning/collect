"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const docData_1 = require("./docData");
const amountGrab_1 = require("./amountGrab");
class YoulaiAmount {
    constructor() {
        // 开始抓取第7411个医生 id:363203
        this.docCount = 7411;
        this.docData = [];
    }
    start() {
        docData_1.default.docData().then(data => {
            this.docData = data;
            this.amountGrab();
        });
    }
    amountGrab() {
        let docId = this.docData[this.docCount];
        if (docId) {
            console.log(`开始抓取第${this.docCount}个医生 id:${docId}`);
            let amountGrab = new amountGrab_1.default(docId);
            amountGrab.amountGrab(() => {
                this.docCount++;
                this.amountGrab();
            });
        }
        else {
            console.log('采集结束');
            process.exit();
        }
    }
}
exports.default = YoulaiAmount;
//# sourceMappingURL=index.js.map