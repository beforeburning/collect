import YoulaiAmount from './YoulaiAmount';

export default class Collection {

    private static fun = {
        YoulaiAmount
    };

    run(classification: string) {
        let fun = new Collection.fun[classification];
        fun.start();
    }

}
