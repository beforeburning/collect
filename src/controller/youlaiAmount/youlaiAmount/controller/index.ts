import docData from './docData';
import AmountGrab from './amountGrab';

export default class YoulaiAmount {

    // 开始抓取第7411个医生 id:363203
    docCount: number = 7411;
    docData: string[] = [];

    start() {
        docData.docData().then(data => {
            this.docData = <string[]>data;
            this.amountGrab();
        })
    }

    amountGrab() {
        let docId: string = this.docData[this.docCount];
        if (docId) {
            console.log(`开始抓取第${this.docCount}个医生 id:${docId}`);
            let amountGrab = new AmountGrab(docId);
            amountGrab.amountGrab(() => {
                this.docCount++;
                this.amountGrab();
            })
        } else {
            console.log('采集结束');
            process.exit();
        }

    }
}

