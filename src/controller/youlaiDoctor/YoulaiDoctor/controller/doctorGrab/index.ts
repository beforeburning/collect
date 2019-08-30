import * as async from 'async';
import json from '../../../../../common/tool/json';
import DomObtain from '../../../../../common/domObtain';
import Mysql from '../../../../../common/mysql';

export default class DoctorGrab {

    data: object[];

    constructor(data: object) {
        this.data = json.jsonToJson(data)
    }

    doctorData() {
        let mysql = new Mysql();
        async.mapLimit(this.data, 20, (url, callback) => {
            let domObtain = new DomObtain(url['deptLink']);
            domObtain.obtain(['.yslist02_2 div'], dom => {
                if (dom[0]) {
                    let domObj: object[] = [];
                    dom[0].map(item => {
                        let str = {
                            hospitalId: url['id'],
                            doctorId: dom[0][item].children[1].attribs.href.split('/')[3],
                            doctorName: dom[0][item].children[1].children[1].children[3].children[0].data,
                            position: dom[0][item].children[1].children[1].children[5].children[0].data,
                            doctorGood: dom[0][item].children[1].children[3].children[3].children[0].data
                        };
                        domObj.push(str);
                    });

                    let map = domObj.map(item => {
                        return new Promise(resolve => {
                            if (item['doctorName'].indexOf('测试') === -1) {
                                mysql.insert('youlai_doctor', item, () => {
                                    console.log(`${item['doctorName']} 已抓取`);
                                    resolve();
                                })
                            } else {
                                resolve();
                            }
                        })
                    });

                    Promise.all(map).then(() => {
                        callback()
                    })

                } else {
                    callback();
                }
            })
        }, () => {
            console.log('抓取结束');
            process.exit();
        });
    }
}
