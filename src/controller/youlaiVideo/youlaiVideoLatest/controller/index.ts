import YOULAICONFIG from '../config';
import character from '../../../../common/tool/character';
import ListGrab from './listGrab';

export default class Start {

    // 第几个大分类
    classCount: number = 0;

    // 分页
    pageCount: number = 1;

    start() {
        console.log(`开始抓取最新数据 分类 ${this.classCount}`);

        // 抓取url
        let url = character.regularUrl(YOULAICONFIG.youlaiVideoLatestLink, YOULAICONFIG.youlaiListKey[this.classCount], this.pageCount);

        let listGrab = new ListGrab(url);
        listGrab.listGrab(false, () => {
            this.classCount++;
            this.start();
        });

    }
}
