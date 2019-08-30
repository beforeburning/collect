import JiankangyixianDoctorAll from './jiankangyixianDoctorAll';

export default class Collection {

    private static fun = {
        JiankangyixianDoctorAll
    };

    run(classification: string) {
        let fun = new Collection.fun[classification];
        fun.start();
    }

}
