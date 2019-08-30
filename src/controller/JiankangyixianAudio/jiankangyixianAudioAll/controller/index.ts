import ClassGrab from './classGrab';
import ListGrab from './listGrab';

export default class Start {

    classData: string[] = [];
    classCount: number = 462;

    listGrabFun: any;

    constructor() {
        this.listGrabFun = new ListGrab()
    }

    start() {
        // 抓取分类
        let classGrab = new ClassGrab();
        // 抓取分类 返回所有分类的地址
        classGrab.classGrab().then(res => {
            this.classData = <string[]>res;
            this.listGrab();
        })
    }

    listGrab() {
        if (this.classData[this.classCount]) {
            console.log(`开始抓取第${this.classCount}个`);
            this.listGrabFun.listGrab(this.classData[this.classCount], () => {
                this.classCount++;
                this.listGrab();
            })
        } else {
            console.log('采集结束');
            process.exit();
        }

    }


}
