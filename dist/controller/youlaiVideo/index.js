"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const youlaiVideoReading_1 = require("./youlaiVideoReading");
const youlaiVideoLatest_1 = require("./youlaiVideoLatest");
const youlaiVideoDoctor_1 = require("./youlaiVideoDoctor");
class Collection {
    run(classification) {
        let fun = new Collection.fun[classification];
        fun.start();
    }
}
Collection.fun = {
    YoulaiVideoReading: youlaiVideoReading_1.default,
    YoulaiVideoLatest: youlaiVideoLatest_1.default,
    YoulaiVideoDoctor: youlaiVideoDoctor_1.default
};
exports.default = Collection;
//# sourceMappingURL=index.js.map