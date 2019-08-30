"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const jiankangyixianAudioAll_1 = require("./jiankangyixianAudioAll");
class Collection {
    run(classification) {
        let fun = new Collection.fun[classification];
        fun.start();
    }
}
Collection.fun = {
    JiankangyixianAudioAll: jiankangyixianAudioAll_1.default
};
exports.default = Collection;
//# sourceMappingURL=index.js.map