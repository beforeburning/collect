import DomObtain from '../../../../../common/domObtain';
import Mysql from '../../../../../common/mysql';
import character from '../../../../../common/tool/character';

export default class ContentGrab {

    link: string[] = [];

    constructor(link: string[]) {
        this.link = link
    }

    contentGrab() {
        return new Promise<void>(resolve => {
            let mysql = new Mysql();
            let map = this.link.map(item => {
                return new Promise<void>(contentResolve => {
                    let domObtain = new DomObtain(item);
                    domObtain.obtain(['.v_title', '.v_info_01 .time', '.doc_pic_box .mgBottom10 strong', '.doc_pic_box .mgBottom10 span', '.doc_pic_box .p1', '.doc_pic_box a', '.containner_time'], dom => {
                        if (!dom) {
                            console.log(`抓取错误 跳过`);
                            contentResolve();
                        } else {
                            if (!dom[0][0]) {
                                contentResolve();
                            } else {
                                let docUrl = dom[5][1].attribs.href.split('/');
                                let time = character.timeCharacter(dom[1][0].children[0].data);
                                let str = {
                                    url: item,
                                    title: dom[0][0].children[0].data,
                                    time: time,
                                    name: dom[2][0].children[0].data,
                                    position: dom[3][0].children[0].data,
                                    hospital: dom[4][0].children[0].data,
                                    department: dom[4][1].children[0].data,
                                    audioTime: dom[6][0].children[0].data,
                                    doctorid: docUrl[docUrl.length - 2]
                                };
                                // 入库
                                mysql.insert('youlai_audio', str, () => {
                                    console.log(`${str.title} 已抓取`);
                                    contentResolve();
                                })
                            }
                        }
                    })
                })
            });

            Promise.all(map).then(() => {
                resolve()
            })
        })
    }
}
