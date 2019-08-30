import jiankangyixianConfig from '../config';
import ClassGrab from './classGrab';
import ListGrab from './listGrab';

export default class YoulaiAmount {

    listGrab: object;
    classLink: string[] = [];
    classCount: number = 0;

    constructor() {
        global['config'] = jiankangyixianConfig;
        this.listGrab = new ListGrab();
    }

    start() {
        // 抓取所有分类
        let classGrab = new ClassGrab();
        classGrab.classGrab().then(classLink => {
            this.classLink = <string[]>classLink;
            this.list();
        })
    }

    list() {
        if (this.classLink[this.classCount]) {
            console.log(`开始采集 第${this.classCount}页`);
            // @ts-ignore
            this.listGrab.listGrabs(this.classLink[this.classCount], () => {
                this.classCount++;
                this.list()
            })
        } else {
            console.log('采集结束');
            process.exit();
        }
    }
}

