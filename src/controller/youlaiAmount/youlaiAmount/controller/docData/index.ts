import Mysql from '../../../../../common/mysql';

const docData = () => {
    return new Promise(resolve => {
        let mysql = new Mysql()
        // mysql.select('youlai_doctor', ['doctorId'], docId => {
        //     let docIdArr = [];
        //     docId.map(item => docIdArr.push(item.doctorId))
        //     resolve(docIdArr);
        // })
        mysql.distinct('doctor', 'doctorid', docId => {
            let docIdArr = [];
            docId.map(item => docIdArr.push(item.doctorid))
            resolve(docIdArr);
        })
    })
}

export default {
    docData
}
