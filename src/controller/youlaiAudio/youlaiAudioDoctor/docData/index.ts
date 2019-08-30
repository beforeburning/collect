import Mysql from '../../../../common/mysql';

const docData = () => {
    return new Promise(resolve => {
        let mysql = new Mysql()
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
