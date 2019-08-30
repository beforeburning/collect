import DomObtain from '../../../../../common/domObtain';
// 详情页和之前的一样
import ContentGrab from '../../../youlaiVideoReading/controller/contentGrab';
import YOULAICONFIG from "../../../youlaiVideoReading/config";

export default class ListGrab {
    data: string = '';
    // 列表页数
    count: number = 1;

    constructor(data: string) {
        this.data = data;
    }

    listGrab(next, callback: any) {
        let domObtain = new DomObtain(next ? next : this.data);
        domObtain.obtain(['#videoList li', '.page_next'], dom => {
            if (!dom) {
                this.listGrab(false, callback);
            } else {
                console.log(`正在抓取 第${this.count}页`);
                let contentLink: string[] = [];
                let next = dom[1][0] ? `${YOULAICONFIG.youlaiLink}${dom[1][0].attribs.href}` : false;

                dom[0].map(item => {
                    if (dom[0][item]) {
                        contentLink.push(`${YOULAICONFIG.youlaiLink}${dom[0][item].children[1].attribs.href}`)
                    }
                });

                if (next === false || next.indexOf('javascript:;') !== -1) {
                    callback()
                } else {
                    // 并发抓取
                    let contentGrab = new ContentGrab(contentLink);
                    contentGrab.contentGrab().then(() => {
                        this.count++;
                        this.listGrab(next, callback);
                    })
                }
            }
        })

    }
}
