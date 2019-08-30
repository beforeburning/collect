import YOULAICONFIG from '../../config';
import DomObtain from '../../../../../common/domObtain';

export default class RegionGrab {
    regionLinkArr: string[] = [];

    regionGrab() {
        return new Promise<string[]>(resolve => {
            console.log('抓取地区列表');
            let domObtain = new DomObtain(YOULAICONFIG.regionLink);
            domObtain.obtain(['.main_content .yslist_dq dl:nth-child(1) a'], dom => {
                dom[0].map(item => {
                    this.regionLinkArr.push(`${YOULAICONFIG.youlaiLink}${dom[0][item].attribs.href}`)
                });
                resolve(this.regionLinkArr);
            })
        })
    }
}
