"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const character_1 = require("../../../../common/tool/character");
const listGrab_1 = require("./listGrab");
class Start {
    constructor() {
        // 第几个大分类
        this.classCount = 0;
        // 分页
        this.pageCount = 1;
    }
    start() {
        console.log(`开始抓取最新数据 分类 ${this.classCount}`);
        // 抓取url
        let url = character_1.default.regularUrl(config_1.default.youlaiVideoLatestLink, config_1.default.youlaiListKey[this.classCount], this.pageCount);
        let listGrab = new listGrab_1.default(url);
        listGrab.listGrab(false, () => {
            this.classCount++;
            this.start();
        });
    }
}
exports.default = Start;
//# sourceMappingURL=index.js.map