import Mysql from '../../../../../common/mysql';

export default class DeptData {
    deptData() {
        return new Promise(resolve => {
            let mysql = new Mysql();
            mysql.select('youlai_dept', ['id', 'deptLink'], res => {
                resolve(res);
            })
        })
    }
}
