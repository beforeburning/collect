import character from '../../../../../common/tool/character';
import jiankangyixianConfig from '../../config';
import * as request from 'request';
import Mysql from '../../../../../common/mysql';

export default class DocList {

    mysql: any;

    constructor() {
        this.mysql = new Mysql();
    }

    docList(id, callback) {
        let link = character.regularUrlJK(jiankangyixianConfig.jiankangyixianDoctorVidoe, id);
        request({
            url: link,
            method: "POST",
            headers: {
                "content-type": "application/json",
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.10 Safari/537.36'
            },
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let list: object[] = JSON.parse(body).data;
                let listData: object[] = [];
                list.map(item => {
                    let str = {
                        url: item['url'],
                        title: item['title'],
                        cover: item['thumb'],
                        time: item['published']
                    };
                    listData.push(str);
                });
                let map = listData.map(item => {
                    return new Promise(resolve => {
                        this.mysql.insert('jiankangyixian_video', item, () => {
                            console.log(`视频 - ${item['title']} 已抓取`);
                            resolve()
                        })
                    })
                });
                Promise.all(map).then(() => {
                    callback()
                })
            } else {
                callback()
            }
        });
    }
}
