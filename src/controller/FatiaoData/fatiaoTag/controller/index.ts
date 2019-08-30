import MysqlData from './mysqlData';
import * as async from 'async';
import filter from '../../../../common/tool/filter'
import topic from './baiduTag';

export default class Start {

    MysqlData: any;

    constructor() {
        this.MysqlData = new MysqlData();
    }

    start() {
        this.MysqlData.listData().then(res => {
            this.asyncStart(<object[]>res);
        });
    }

    asyncStart(list: object[]) {
        async.mapLimit(list, 1, (data, callback) => {
            console.log(`${data['title']} 正在处理`);
            data['content'] = filter.filterHtml(data['content']);
            topic.topic(data['title'], data['content']).then(res => {
                let str = {
                    ...data,
                    ...res
                };
                this.MysqlData.dataSave(str).then(() => {
                    callback();
                })
            })
        })
    }

}
