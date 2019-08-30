import jiankangyixianConfig from '../config';
import DomObtain from '../../../../common/domObtain';
import Mysql from '../../../../common/mysql';

export default class YoulaiAmount {

    lvCount: number = 0;
    docCount: number = 1;

    mysql: any;

    constructor() {
        this.mysql = new Mysql();
    }


    start() {
        this.lvFun()
    }

    lvFun() {
        console.log(`开始抓取分类${this.lvCount}的第${this.docCount}页`);
        if (jiankangyixianConfig.youlaiLink[this.lvCount]) {
            let url = `${jiankangyixianConfig.youlaiLink[this.lvCount]}${this.docCount}`;
            let domObtain = new DomObtain(url);
            domObtain.obtain(['.zhuanjia_list li div'], dom => {
                if (dom[0][0]) {
                    let docData: object[] = [];
                    dom[0].map(item => {
                        if (dom[0][item].children[1].attribs.href) {
                            let str = {
                                link: dom[0][item].children[1].attribs.href
                            };
                            docData.push(str);
                        }
                    });
                    let map = docData.map(item => {
                        return new Promise(resolve => {
                            this.mysql.insert('jiankangyixian_doctor', item, () => {
                                console.log(`已抓取`);
                                resolve()
                            })
                        })
                    });

                    Promise.all(map).then(() => {
                        this.docCount++;
                        this.lvFun();
                    })
                } else {
                    this.lvCount++;
                    this.docCount = 1;
                    this.lvFun();
                }
            })
        } else {
            console.log('抓取结束');
            process.exit();
        }
    }

}

