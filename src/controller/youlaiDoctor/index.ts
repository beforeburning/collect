import YoulaiDeptAll from './YoulaiDeptAll';
import YoulaiHospitalAll from './YoulaiHospitalAll';
import YoulaiDoctor from './YoulaiDoctor';

export default class Collection {

    private static fun = {
        YoulaiDeptAll,
        YoulaiHospitalAll,
        YoulaiDoctor
    };

    run(classification: string) {
        let fun = new Collection.fun[classification];
        fun.start();
    }

}
