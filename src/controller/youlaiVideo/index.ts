import YoulaiVideoReading from './youlaiVideoReading';
import YoulaiVideoLatest from './youlaiVideoLatest';
import YoulaiVideoDoctor from './youlaiVideoDoctor';

export default class Collection {

    private static fun = {
        YoulaiVideoReading,
        YoulaiVideoLatest,
        YoulaiVideoDoctor
    };

    run(classification: string) {
        let fun = new Collection.fun[classification];
        fun.start();
    }

}
