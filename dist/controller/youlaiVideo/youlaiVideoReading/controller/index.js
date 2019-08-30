"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classGrab_1 = require("./classGrab");
const listGrab_1 = require("./listGrab");
class Start {
    constructor() {
        // 第几个大分类
        this.classCount = 0;
        // 第几个小分类
        this.smallCount = 1;
    }
    start() {
        // 抓取分类
        let classGrab = new classGrab_1.default();
        // 抓取分类 返回所有分类的地址
        classGrab.classGrab(this.classCount).then(res => {
            console.log(`开始抓取 ${this.classCount} 分类下 ${this.smallCount}`);
            if (!res[this.smallCount]) {
                this.classCount++;
                this.smallCount = 1;
                this.start();
            }
            // 通过分类抓取列表
            let listGrab = new listGrab_1.default(res[this.smallCount]);
            listGrab.listGrab(false, () => {
                this.smallCount++;
                this.start();
            });
        });
    }
}
exports.default = Start;
//# sourceMappingURL=index.js.map