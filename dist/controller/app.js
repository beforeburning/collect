"use strict";
/**
 Function: inquirer 入口文件 命令行工具执行器
 User: burning <923398776@qq.com>
 Date: 2019年07月31日
 */
Object.defineProperty(exports, "__esModule", { value: true });
const rawlist_1 = require("../common/tool/inquirer/rawlist");
const youlaiVideo_1 = require("./youlaiVideo");
const youlaiAudio_1 = require("./youlaiAudio");
const youlaiDoctor_1 = require("./youlaiDoctor");
const youlaiAmount_1 = require("./youlaiAmount");
const jiankangyixianVideo_1 = require("./jiankangyixianVideo");
const jiankangyixianDoctor_1 = require("./jiankangyixianDoctor");
const jiankangyixianAudio_1 = require("./jiankangyixianAudio");
const FatiaoData_1 = require("./FatiaoData");
class App {
    // 方法集合
    static collection(scriptName, classification) {
        let classificationList = {
            YoulaiVideo: youlaiVideo_1.default,
            YoulaiAudio: youlaiAudio_1.default,
            YoulaiDoctor: youlaiDoctor_1.default,
            YoulaiAmount: youlaiAmount_1.default,
            JiankangyixianVideo: jiankangyixianVideo_1.default,
            JiankangyixianDoctor: jiankangyixianDoctor_1.default,
            JiankangyixianAudio: jiankangyixianAudio_1.default,
            FatiaoData: FatiaoData_1.default
        };
        let collection = new classificationList[scriptName]();
        collection.run(classification);
    }
    // 命令行工具
    app() {
        let cmd = new rawlist_1.default();
        let source = global['CONFIG'].source;
        cmd.rawlist('请选择要执行的脚本', source).then(scriptName => {
            for (let item in source) {
                if (source[item].key === scriptName) {
                    cmd.rawlist('选择要执行的分类', source[item].list).then(classification => {
                        App.collection(scriptName, classification);
                    });
                    break;
                }
            }
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map