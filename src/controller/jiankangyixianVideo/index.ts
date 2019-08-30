import JiankangyixianVideoLatest from './JiankangyixianVideoLatest';
import JiankangyixianVideoDoctor from './JiankangyixianVideoDoctor';

export default class Collection {

    private static fun = {
        JiankangyixianVideoLatest,
        JiankangyixianVideoDoctor
    };

    run(classification: string) {
        let fun = new Collection.fun[classification];
        fun.start();
    }

}
