"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JiankangyixianVideoLatest_1 = require("./JiankangyixianVideoLatest");
const JiankangyixianVideoDoctor_1 = require("./JiankangyixianVideoDoctor");
class Collection {
    run(classification) {
        let fun = new Collection.fun[classification];
        fun.start();
    }
}
Collection.fun = {
    JiankangyixianVideoLatest: JiankangyixianVideoLatest_1.default,
    JiankangyixianVideoDoctor: JiankangyixianVideoDoctor_1.default
};
exports.default = Collection;
//# sourceMappingURL=index.js.map