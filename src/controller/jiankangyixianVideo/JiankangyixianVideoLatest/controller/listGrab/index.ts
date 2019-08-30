import DomObtain from '../../../../../common/domObtain';
import character from '../../../../../common/tool/character';
import Mysql from '../../../../../common/mysql';

export default class ListGrab {

    mysql: any;

    constructor() {
        this.mysql = new Mysql();
    }

    listGrabs(link, callback) {
        let domObtain = new DomObtain(link);
        domObtain.obtain(['.content_item div:nth-child(1) .v_list2 li', '.next'], dom => {
            let dataArr: object[] = [];
            if (dom[0]) {
                // 页面数据
                dom[0].map(item => {
                    let url = dom[0][item].children[1].attribs.href;
                    let cover = dom[0][item].children[1].children[1].children[1].attribs.src
                    let str = {
                        url: url,
                        title: dom[0][item].children[1].children[3].children[0].data,
                        cover: cover,
                        time: character.jiankangyixianTime(cover, url)
                    };
                    dataArr.push(str);
                });
                let map = dataArr.map(item => {
                    return new Promise(resolve => {
                        this.mysql.insert('jiankangyixian_video', item, () => {
                            console.log(`视频 - ${item['title']} 已抓取`);
                            resolve()
                        })
                    })
                });

                // 下一页
                let nextUrl: string | boolean;
                dom[1] && dom[1][0] && dom[1][0].attribs.href.indexOf('vodjk') >= 1 ? nextUrl = dom[1][0].attribs.href : nextUrl = false

                Promise.all(map).then(() => {
                    if (nextUrl) {
                        this.listGrabs(nextUrl, callback);
                    } else {
                        callback();
                    }
                })
            } else {
                callback();
            }
        })
    }
}
