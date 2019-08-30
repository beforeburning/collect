import ListGrab from "../controller/listGrab";
import HospitalData from '../controller/hospitalData';

export default class YoulaiVideoDoctor {

    // 第几个大分类
    classCount: number = 0;

    start() {
        // 获取所有医院
        let hospitalData = new HospitalData();
        hospitalData.hospitalData().then(data => {
            if (data[this.classCount]) {
                let listGrab = new ListGrab(data[this.classCount]);
                listGrab.listGrab(() => {
                    this.classCount++;
                    this.start();
                })
            } else {
                console.log('抓取结束');
                process.exit();
            }
        });


    }


}
