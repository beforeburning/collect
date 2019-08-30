"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const youlaiAudioPlay_1 = require("../youlaiAudio/youlaiAudioPlay");
const youlaiAudioDoctor_1 = require("../youlaiAudio/youlaiAudioDoctor");
class Collection {
    run(classification) {
        let fun = new Collection.fun[classification];
        fun.start();
    }
}
Collection.fun = {
    YoulaiAudioPlay: youlaiAudioPlay_1.default,
    YoulaiAudioDoctor: youlaiAudioDoctor_1.default
};
exports.default = Collection;
//# sourceMappingURL=index.js.map