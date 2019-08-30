// @ts-ignore
import JiankangyixianAudioAll from './jiankangyixianAudioAll';

export default class Collection {

    private static fun = {
        JiankangyixianAudioAll
    };

    run(classification: string) {
        let fun = new Collection.fun[classification];
        fun.start();
    }

}
