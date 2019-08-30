import docData from './docData';
import ListGrab from './listGrab';

export default class youlaiVideoDoctor {

    docCount: number = 0;

    start() {
        docData.docData().then(res => {
            if (res[this.docCount]) {
                console.log(`开始抓取第${this.docCount + 1}个医生`);
                let listGrab = new ListGrab(res[this.docCount]);
                listGrab.listGrab(() => {
                    this.docCount++;
                    this.start();
                });
            } else {
                console.log('抓取结束');
                process.exit();
            }
        })
    }


}
