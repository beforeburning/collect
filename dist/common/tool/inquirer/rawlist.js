"use strict";
/**
 Function: inquirer 命令行工具
 User: burning <923398776@qq.com>
 Date: 2019年07月31日
 */
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
class Inquirer {
    rawlist(text, data) {
        return new Promise(resolve => {
            let promptList = [{
                    type: 'rawlist',
                    name: 'radio',
                    message: text,
                    choices: data
                }];
            inquirer.prompt(promptList).then((answers) => {
                resolve(answers['radio']);
            });
        });
    }
}
exports.default = Inquirer;
//# sourceMappingURL=rawlist.js.map