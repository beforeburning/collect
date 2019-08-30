"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classGrab_1 = require("./classGrab");
const listGrab_1 = require("./listGrab");
class Start {
    constructor() {
        this.classData = [];
        this.classCount = 462;
        this.listGrabFun = new listGrab_1.default();
    }
    start() {
        // 抓取分类
        let classGrab = new classGrab_1.default();
        // 抓取分类 返回所有分类的地址
        classGrab.classGrab().then(res => {
            this.classData = res;
            this.listGrab();
        });
    }
    listGrab() {
        if (this.classData[this.classCount]) {
            console.log(`开始抓取第${this.classCount}个`);
            this.listGrabFun.listGrab(this.classData[this.classCount], () => {
                this.classCount++;
                this.listGrab();
            });
        }
        else {
            console.log('采集结束');
            process.exit();
        }
    }
}
exports.default = Start;
//# sourceMappingURL=index.js.map