import RegionGrab from './regionGrab';
import HospitalGrab from './hospitalGrab';

export default class YoulaiVideoDoctor {

    start() {
        let regionGrab = new RegionGrab();
        regionGrab.regionGrab().then(regionLinkArr => {
            // 并发抓取所有医院
            let map = regionLinkArr.map(item => {
                return new Promise(resolve => {
                    let hospitalGrab = new HospitalGrab();
                    hospitalGrab.hospitalGrab(item, () => {
                        resolve();
                    })
                })
            });

            Promise.all(map).then(() => {
                console.log('抓取结束');
                process.exit();
            })
        });
    }


}
