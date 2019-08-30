"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const fatiaoTag_1 = require("./fatiaoTag");
class Collection {
    run(classification) {
        let fun = new Collection.fun[classification];
        fun.start();
    }
}
Collection.fun = {
    FatiaoTag: fatiaoTag_1.default
};
exports.default = Collection;
//# sourceMappingURL=index.js.map