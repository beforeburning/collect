import YOULAICONFIG from '../../config';
import DomObtain from '../../../../../common/domObtain';
import ContentGrab from "../contentGrab";

export default class ListGrab {
    contentLink: string[] = [];
    data: string = '';
    // 列表页数
    count: number = 0;

    constructor(data: string) {
        this.data = data;
    }

    listGrab(next, callback: any) {
        let domObtain = new DomObtain(next ? next : this.data);
        domObtain.obtain(['#videoList li', '.page_next'], dom => {
            if (!dom) {
                this.listGrab(false, callback);
            } else {
                let next = dom[1][0] ? `${YOULAICONFIG.youlaiLink}${dom[1][0].attribs.href}` : false;
                dom[0].map(item => {
                    if (dom[0][item]) {
                        this.contentLink.push(`${YOULAICONFIG.youlaiLink}${dom[0][item].children[1].attribs.href}`)
                    }
                });
                if (next === false || next.indexOf('javascript:;') !== -1) {
                    // 并发抓取
                    let contentGrab = new ContentGrab(this.contentLink);
                    // 详情抓取完毕 抓取下一个
                    contentGrab.contentGrab().then(() => {
                        callback()
                    })

                } else {
                    this.count++;
                    this.listGrab(next, callback);
                }
            }
        })

    }
}
