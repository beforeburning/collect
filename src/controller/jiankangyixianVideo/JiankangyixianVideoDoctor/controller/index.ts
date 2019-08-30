import docData from "./docLinkData";
import DocId from "./docId";
import DocList from "./docList";

export default class YoulaiAmount {
    docId: any;
    docList: any;
    docData: string[] = [];
    docConst: number = 2968;

    constructor() {
        this.docId = new DocId();
        this.docList = new DocList();
    }

    start() {
        // 获取所有link
        docData.docData().then(res => {
            this.docData = <string[]>res;
            this.listFun();
        })
    }

    listFun() {
        console.log(`开始抓取第${this.docConst}个`);
        if (this.docData[this.docConst]) {
            this.docId.docId(this.docData[this.docConst]).then(id => {
                // 抓取视频数据
                this.docList.docList(id, () => {
                    this.docConst++;
                    this.listFun();
                })
            })
        } else {
            console.log('采集结束');
            process.exit()
        }
    }
}

