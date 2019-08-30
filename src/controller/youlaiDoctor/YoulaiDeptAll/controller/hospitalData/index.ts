import Mysql from '../../../../../common/mysql';

export default class HospitalData {
    hospitalData() {
        return new Promise(resolve => {
            let mysql = new Mysql();
            mysql.select('youlai_hospital', ['id', 'hospitalName', 'hospitalLink'], res => {
                resolve(res);
            })
        })
    }
}
