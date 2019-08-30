import Mysql from '../../../../../common/mysql';

const docData = () => {
    return new Promise(resolve => {
        let mysql = new Mysql()
        mysql.select('jiankangyixian_doctor', ['link'], docId => {
            let docIdArr = [];
            docId.map(item => docIdArr.push(item['link']))
            resolve(docIdArr);
        })
    })
}

export default {
    docData
}
