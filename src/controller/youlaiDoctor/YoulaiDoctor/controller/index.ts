import DeptData from './deptData';
import DoctorGrab from './doctorGrab';

export default class YoulaiDoctor {

    start() {
        let deptData = new DeptData();
        deptData.deptData().then(res => {
            let doctorData = new DoctorGrab(<object>res);
            doctorData.doctorData()
        })
    }

}
