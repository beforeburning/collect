"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YoulaiAmount_1 = require("./YoulaiAmount");
class Collection {
    run(classification) {
        let fun = new Collection.fun[classification];
        fun.start();
    }
}
Collection.fun = {
    YoulaiAmount: YoulaiAmount_1.default
};
exports.default = Collection;
//# sourceMappingURL=index.js.map