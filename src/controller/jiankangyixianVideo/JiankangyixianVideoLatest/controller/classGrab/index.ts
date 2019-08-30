import DomObtain from '../../../../../common/domObtain';

export default class ClassGrab {

    classGrab() {
        return new Promise(resolve => {
            let domObtain = new DomObtain(global['config'].jiankangyixianClass);

            domObtain.obtain(['.kstab .content_item a'], dom => {
                let classLink: string[] = [];
                dom[0].map(item => {
                    classLink.push(dom[0][item].attribs.href);
                });
                resolve(classLink);
            })
        })
    }

}
