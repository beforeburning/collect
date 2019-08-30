/**
 Function: inquirer 入口文件 命令行工具执行器
 User: burning <923398776@qq.com>
 Date: 2019年07月31日
 */

import Inquirer from '../common/tool/inquirer/rawlist';
import YoulaiVideo from './youlaiVideo';
import YoulaiAudio from './youlaiAudio';
import YoulaiDoctor from './youlaiDoctor';
import YoulaiAmount from './youlaiAmount';
import JiankangyixianVideo from './jiankangyixianVideo';
import JiankangyixianDoctor from './jiankangyixianDoctor';
import JiankangyixianAudio from './jiankangyixianAudio';
import FatiaoData from './FatiaoData';

export default class App {

    // 方法集合
    private static collection(scriptName: string, classification: string) {
        let classificationList = {
            YoulaiVideo: YoulaiVideo,
            YoulaiAudio: YoulaiAudio,
            YoulaiDoctor: YoulaiDoctor,
            YoulaiAmount: YoulaiAmount,
            JiankangyixianVideo: JiankangyixianVideo,
            JiankangyixianDoctor: JiankangyixianDoctor,
            JiankangyixianAudio: JiankangyixianAudio,
            FatiaoData: FatiaoData
        }
        let collection = new classificationList[scriptName]();
        collection.run(classification);
    }

    // 命令行工具
    app() {
        let cmd = new Inquirer();
        let source = global['CONFIG'].source;
        cmd.rawlist('请选择要执行的脚本', source).then(scriptName => {
            for (let item in source) {
                if (source[item].key === scriptName) {
                    cmd.rawlist('选择要执行的分类', source[item].list).then(classification => {
                        App.collection(<string>scriptName, <string>classification);
                    })
                    break;
                }
            }
        })
    }
}
