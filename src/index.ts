/**
 User: burning <923398776@qq.com>
 Date: 2019年07月31日
 */

import App from './controller/app';

// 配置文件
global['CONFIG'] = require('../config.json');

let index = new App();

index.app();
