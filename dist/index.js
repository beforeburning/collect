"use strict";
/**
 User: burning <923398776@qq.com>
 Date: 2019年07月31日
 */
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./controller/app");
// 配置文件
global['CONFIG'] = require('../config.json');
let index = new app_1.default();
index.app();
//# sourceMappingURL=index.js.map