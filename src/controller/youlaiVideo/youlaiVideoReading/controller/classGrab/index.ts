import YOULAICONFIG from '../../config';
import DomObtain from '../../../../../common/domObtain';

export default class ClassGrab {
    public classGrab(classCount: number) {
        return new Promise<string[]>(resolve => {
            if (!YOULAICONFIG.youlaiListKey[classCount]) {
                console.log('抓取结束');
                process.exit();
            }
            // 抓取地址
            let link = `${YOULAICONFIG.firstClass}${YOULAICONFIG.youlaiListKey[classCount]}.html`;
            let domObtain = new DomObtain(link);
            // 抓取dom
            domObtain.obtain(['.ylpc_dise_list a'], dom => {
                if (dom) {
                    // 返回所有分类的地址
                    let linkArr: string[] = [];
                    dom[0].map(item => {
                        linkArr.push(`${YOULAICONFIG.youlaiLink}${dom[0][item].attribs.href}`);
                    });
                    resolve(linkArr);
                } else {
                    console.log('抓取错误');
                    process.exit();
                }
            });
        })
    }
}

