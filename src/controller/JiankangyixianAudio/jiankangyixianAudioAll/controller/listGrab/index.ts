import DomObtain from '../../../../../common/domObtain';
import Mysql from '../../../../../common/mysql';
import character from '../../../../../common/tool/character';
import jiankangyixianConfig from '../../config';

export default class ListGrab {
    count: number = 0;
    mysql: any;

    constructor() {
        this.mysql = new Mysql();
    }

    listGrab(link, callback) {
        let domObtain = new DomObtain(link);
        domObtain.obtain(['.mymvlist .listone', '#next'], dom => {
            let nextT = `${jiankangyixianConfig.jiankangyixianLink}${dom[1][0].attribs.href}`
            let next: string = nextT.indexOf('javascript') !== -1 ? 'false' : nextT;
            let listData: object[] = [];
            dom[0].map(item => {
                if (dom[0][item]) {
                    let cover = dom[0][item].children[1].children[3].children[1].children[1].attribs.src;
                    let str = {
                        url: dom[0][item].children[1].attribs.href,
                        title: dom[0][item].children[1].children[1].children[2].data.replace(/[\r\n]/g, ''),
                        cover: cover,
                        time: character.jiankangyixianLinkTime(cover)
                    };
                    listData.push(str);
                }
            });
            if (listData.toString()) {
                let map = listData.map(item => {
                    return new Promise(resolve => {
                        this.mysql.insert('jiankangyixian_audio', item, () => {
                            console.log(`音频 - ${item['title']} 已抓取`);
                            resolve()
                        })
                    })
                });
                Promise.all(map).then(() => {
                    next === 'false' ? callback() : this.listGrab(next, callback);
                })
            } else {
                callback()
            }
        })
    }
}
