"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const docLinkData_1 = require("./docLinkData");
const docId_1 = require("./docId");
const docList_1 = require("./docList");
class YoulaiAmount {
    constructor() {
        this.docData = [];
        this.docConst = 2968;
        this.docId = new docId_1.default();
        this.docList = new docList_1.default();
    }
    start() {
        // 获取所有link
        docLinkData_1.default.docData().then(res => {
            this.docData = res;
            this.listFun();
        });
    }
    listFun() {
        console.log(`开始抓取第${this.docConst}个`);
        if (this.docData[this.docConst]) {
            this.docId.docId(this.docData[this.docConst]).then(id => {
                // 抓取视频数据
                this.docList.docList(id, () => {
                    this.docConst++;
                    this.listFun();
                });
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