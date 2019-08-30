import DomObtain from '../../../../../common/domObtain';
import jiankangyixianConfig from '../../config';

export default class ClassGrab {
    classGrab() {
        return new Promise(resolve => {
            let domObtain = new DomObtain(jiankangyixianConfig.jiankangyixianClass);

            domObtain.obtain(['.ylpc_dise_list a'], dom => {
                let classLink: string[] = [];
                dom[0].map(item => {
                    classLink.push(`${jiankangyixianConfig.jiankangyixianLink}${dom[0][item].attribs.href}`);
                });
                resolve(classLink);
            })
        })
    }
}
