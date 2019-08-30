import DomObtain from '../../../../common/domObtain';
import Mysql from '../../../../common/mysql'
import character from '../../../../common/tool/character';
import YOULAICONFIG from "../config";

export default class ListGrab {
    // 医生id
    docId: string = '';
    // 列表页数
    count: number = 1;

    constructor(docCount: string) {
        this.docId = docCount;
    }

    listGrab(callback: any) {
        let mysql = new Mysql();
        let url = character.regularUrl(YOULAICONFIG.youlaiAudioDocLink, this.count, parseInt(this.docId));
        let domObtain = new DomObtain(url);
        domObtain.obtain(['a.audioAsk'], dom => {
            if (dom[0] && dom[0].length !== 0) {
                let map = dom[0].map(item => {
                    return new Promise(resolve => {
                        let str = {
                            url: `${YOULAICONFIG.youlaiMLink}${dom[0][item].attribs.href}`,
                            title: dom[0][item].children[1].children[0].data,
                            time: dom[0][item].children[3].children[1].children[0].data,
                            audioTime: dom[0][item].children[3].children[0].children[0].next.data.split('时长')[1],
                            doctorid: this.docId
                        };
                        mysql.insert('youlai_audio', str, () => {
                            console.log(`${str.title} 已抓取`);
                            resolve()
                        })
                    })
                });
                Promise.all(map).then(() => {
                    this.count++;
                    this.listGrab(callback);
                }).catch(() => {
                    this.count++;
                    this.listGrab(callback);
                })

            } else {
                callback();
            }
        })
    }
}
