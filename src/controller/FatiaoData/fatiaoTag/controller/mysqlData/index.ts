import Mysql from '../../../../../common/mysql';
import jsonToJson from '../../../../../common/tool/json';

export default class MysqlData {
    mysql: any;

    constructor() {
        this.mysql = new Mysql();
    }

    listData() {
        return new Promise(resolve => {
            this.mysql.joinTable(['jk_fatiao_article', 'jk_fatiao_article_info'], ['id', 'title'], ['article_id', 'content'], 'id', 'article_id', 'jk_fatiao_article.mark = 1', res => {
                resolve(<object[]>jsonToJson.jsonToJson(res));
            })
        })
    }

    dataSave(data) {
        return new Promise(resolve => {
            this.mysql.insert('fatiaoTag', data, () => {
                console.log('已保存');
                resolve();
            })
        })
    }
}
