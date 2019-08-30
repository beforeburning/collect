import YoulaiAudioPlay from '../youlaiAudio/youlaiAudioPlay';
import YoulaiAudioDoctor from '../youlaiAudio/youlaiAudioDoctor';

export default class Collection {

    private static fun = {
        YoulaiAudioPlay,
        YoulaiAudioDoctor
    };

    run(classification: string) {
        let fun = new Collection.fun[classification];
        fun.start();
    }

}
