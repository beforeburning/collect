import Mysql from '../../../../../common/mysql';
import character from '../../../../../common/tool/character';
import YOULAICONFIG from "../../config";
import DomObtain from '../../../../../common/domObtain';

export default class AmountGrab {

    docId: number;
    mysql: any;

    constructor(docId) {
        this.docId = parseInt(docId);
        this.mysql = new Mysql();
    }

    amountGrab(callback) {
        let video = new Promise(resolve => {
            this.videoGrab(1, this.docId, () => {
                resolve()
            })
        });
        let audio = new Promise(resolve => {
            this.audioGrab(1, this.docId, () => {
                resolve();
            })
        });
        Promise.all([video, audio]).then(() => {
            callback()
        })
    }

    private videoGrab(count: number, docId: number, callback) {
        // docId = 22829;
        let url = character.regularUrl(YOULAICONFIG.youlaiVideoDocLink, count, docId);
        let domObtain = new DomObtain(url);
        domObtain.obtain(['a'], dom => {
            if (dom[0] && dom[0].length !== 0) {
                let domObj: object[] = [];
                dom[0].map(item => {
                    let str = {
                        url: `${YOULAICONFIG.youlaiMLink}${dom[0][item].attribs.href}`,
                        title: dom[0][item].children[1].children[3].children[1].children[0].data,
                        time: dom[0][item].children[1].children[3].children[3].children[1].children[0].data,
                        doctorid: docId
                    };
                    domObj.push(str);
                });

                let map = domObj.map(item => {
                    return new Promise(resolve => {
                        this.mysql.insert('youlai_video', item, () => {
                            console.log(`视频 - ${item['title']} 已抓取`);
                            resolve()
                        })
                    })
                });

                Promise.all(map).then(() => {
                    this.audioGrab(++count, docId, callback);
                })

            } else {
                callback();
            }
        })
    }

    private audioGrab(count: number, docId: number, callback) {
        // docId = 22829;
        // 列表页数
        let url = character.regularUrl(YOULAICONFIG.youlaiAudioDocLink, count, docId);
        let domObtain = new DomObtain(url);
        domObtain.obtain(['a.audioAsk'], dom => {
            if (dom[0] && dom[0].length !== 0) {
                let domObj: object[] = [];
                dom[0].map(item => {
                    let str = {
                        url: `${YOULAICONFIG.youlaiMLink}${dom[0][item].attribs.href}`,
                        title: dom[0][item].children[1].children[0].data,
                        time: dom[0][item].children[3].children[1].children[0].data,
                        audioTime: dom[0][item].children[3].children[0].children[0].next.data.split('时长')[1],
                        doctorid: docId
                    };
                    domObj.push(str);
                });

                let map = domObj.map(item => {
                    return new Promise(resolve => {
                        this.mysql.insert('youlai_audio', item, () => {
                            console.log(`音频 - ${item['title']} 已抓取`);
                            resolve()
                        })
                    })
                });

                Promise.all(map).then(() => {
                    this.audioGrab(++count, docId, callback);
                })

            } else {
                callback();
            }
        })
    }
}
