import DomObtain from '../../../../../common/domObtain';

export default class DocId {
    docId(url) {
        return new Promise(resolve => {
            let domObtain = new DomObtain(url);
            domObtain.obtain(['script'], dom => {
                dom[0].map(item => {
                    if (!dom[0][item].attribs.src && dom[0][item].children[0].data.indexOf('spaceid') !== -1) {
                        let id = dom[0][item].children[0].data.split('spaceid')[1].split(';')[0].split('\'')[1]
                        resolve(id);
                    }
                })
            })
        })
    }
}
