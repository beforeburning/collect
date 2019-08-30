"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const classGrab_1 = require("./classGrab");
const listGrab_1 = require("./listGrab");
class YoulaiAmount {
    constructor() {
        this.classLink = [];
        this.classCount = 0;
        global['config'] = config_1.default;
        this.listGrab = new listGrab_1.default();
    }
    start() {
        // 抓取所有分类
        let classGrab = new classGrab_1.default();
        classGrab.classGrab().then(classLink => {
            this.classLink = classLink;
            this.list();
        });
    }
    list() {
        if (this.classLink[this.classCount]) {
            console.log(`开始采集 第${this.classCount}页`);
            // @ts-ignore
            this.listGrab.listGrabs(this.classLink[this.classCount], () => {
                this.classCount++;
                this.list();
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