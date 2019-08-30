import DomObtain from '../../../../common/domObtain';
import ContentGrab from '../contentGrab'
import character from '../../../../common/tool/character';
import YOULAICONFIG from "../config";

export default class ListGrab {
    // 医生id
    docCount: string = '';
    // 列表页数
    count: number = 1;
    linkArr: string[] = [];

    constructor(docCount: string) {
        this.docCount = docCount;
    }

    listGrab(callback: any) {
        let url = character.regularUrl(YOULAICONFIG.youlaiVideoDocLink, this.count, parseInt(this.docCount));
        let domObtain = new DomObtain(url);
        domObtain.obtain(['a'], dom => {
            if (dom[0]) {
                dom[0].map(item => {
                    let link = dom[0][item].attribs.href;
                    this.linkArr.push(`${YOULAICONFIG.youlaiMLink}${link}`);
                });
                this.count++;
                this.listGrab(callback);
            } else {
                let contentGrab = new ContentGrab(this.linkArr)
                contentGrab.contentGrab(parseInt(this.docCount)).then(() => {
                    callback()
                });
            }
        })
    }
}
