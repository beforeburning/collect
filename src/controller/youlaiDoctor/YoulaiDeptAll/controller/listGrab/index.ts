import YOULAICONFIG from '../../config';
import DomObtain from '../../../../../common/domObtain';
import Mysql from '../../../../../common/mysql';

export default class ListGrab {

    data: string = '';
    // 栏目数
    count: number = 0;

    constructor(data: string) {
        this.data = data;
    }

    listGrab(callback) {
        let mysql = new Mysql();
        let domObtain = new DomObtain(this.data['hospitalLink']);
        let domObj: object[] = []
        domObtain.obtain(['.main_content .yslist06 div li a'], dom => {
            if (dom[0]) {
                dom[0].map(item => {
                    let str = {
                        hospitalId: this.data['id'],
                        deptName: dom[0][item].children[0].data,
                        deptLink: `${YOULAICONFIG.youlaiLink}${dom[0][item].children[0].parent.attribs.href}`
                    };
                    domObj.push(str);
                })

                let map = domObj.map(item => {
                    return new Promise(resolve => {
                        mysql.insert('youlai_dept', item, () => {
                            console.log(`${item['deptName']} 已抓取`);
                            resolve()
                        })
                    })
                })
                Promise.all(map).then(() => {
                    callback()
                })
            } else {
                callback()
            }
        })
    }
}
