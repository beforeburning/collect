import YOULAICONFIG from '../../../config';
import DomObtain from '../../../../../common/domObtain';
import ContentGrab from '../contentGrab';
import character from '../../../../../common/tool/character';

export default class ListGrab {
    contentLink: string[] = [];
    data: string = '';
    // 列表页数
    count: number = 0;
    // ID容错
    idErrorCount: number = 0;

    listGrab(next, callback: any) {
        let domObtain = new DomObtain(next ? next : this.data);
        domObtain.obtain(['.mymvlist li', '#pages li:last-child a', '#next'], dom => {
            if (!dom) {
                this.listGrab(false, callback);
            } else {
                // 小标下一页
                let smallNextUrl: string = dom[2][0].attribs.href;
                // 小标下一页 id
                let smallNextUrlId: number = character.urlNextId(smallNextUrl);
                // 当前页面id
                let currentUrlId: number = character.urlNextId(next);
                // 下一页的url
                let nextUrl: string = `${YOULAICONFIG.youlaiLink}${smallNextUrl}`;

                dom[0].map(item => {
                    if (dom[0][item]) {
                        this.contentLink.push(`${YOULAICONFIG.youlaiLink}${dom[0][item].children[1].attribs.href}`)
                    }
                });

                let contentGrab = new ContentGrab(this.contentLink);
                // 详情抓取完毕 抓取下一个
                contentGrab.contentGrab().then(() => {
                    console.log(`开始抓取第${currentUrlId}页`);
                    if (currentUrlId < smallNextUrlId) {
                        this.listGrab(nextUrl, callback);
                    } else if ((smallNextUrlId < currentUrlId) && this.idErrorCount <= 3) {
                        nextUrl = character.youlaiNextErr(next);
                        this.idErrorCount++;
                        this.listGrab(nextUrl, callback);
                    } else {
                        callback();
                    }
                })
            }
        })

    }
}
