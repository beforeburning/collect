import ClassGrab from './classGrab';
import ListGrab from './listGrab';
import YOULAICONFIG from '../../config';

export default class Start {

    // 第几个大分类
    classCount: number = 0;
    // 第几个小分类
    smallCount: number = 1;

    start() {
        // 抓取分类
        let classGrab = new ClassGrab();
        // 抓取分类 返回所有分类的地址
        classGrab.classGrab(this.classCount).then(res => {
            console.log(`开始抓取 ${this.classCount} 分类下 ${this.smallCount}`);
            if (!res[this.smallCount]) {
                this.classCount++;
                this.smallCount = 1;
                this.start();
            }
            // 通过分类抓取列表
            let listGrab = new ListGrab();
            listGrab.listGrab(res[this.smallCount], () => {
                this.smallCount++;
                this.start();
            });

        })

    }

}


