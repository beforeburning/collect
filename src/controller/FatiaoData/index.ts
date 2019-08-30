// @ts-ignore
import FatiaoTag from './fatiaoTag';

export default class Collection {

    private static fun = {
        FatiaoTag
    };

    run(classification: string) {
        let fun = new Collection.fun[classification];
        fun.start();
    }

}
