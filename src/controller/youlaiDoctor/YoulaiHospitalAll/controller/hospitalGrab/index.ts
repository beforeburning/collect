import YOULAICONFIG from '../../config';
import DomObtain from '../../../../../common/domObtain';
import Mysql from '../../../../../common/mysql';

export default class HospitalGrab {
    hospitalGrab(regionLink: string, callback) {
        let domObtain = new DomObtain(regionLink);
        let mysql = new Mysql();
        domObtain.obtain(['.main_content .yslist06 div', '.main_content dl:nth-child(1) a.link05'], dom => {
            dom[0].map(item => {
                let str = {
                    reguinName: dom[0][item].children[1].children[0].children[0].data,
                    hospitalLink: `${YOULAICONFIG.youlaiLink}${dom[0][item].children[4].prev.children[0].next.children[1].attribs.href}`,
                    hospitalName: dom[0][item].children[4].prev.children[0].next.children[1].children[0].data
                };
                mysql.insert('youlai_hospital', str, () => {
                    console.log(`${str.hospitalName} 已抓取`);
                    callback()
                })
            })
        })
    }
}
