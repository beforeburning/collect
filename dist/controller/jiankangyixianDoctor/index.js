"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jiankangyixianDoctorAll_1 = require("./jiankangyixianDoctorAll");
class Collection {
    run(classification) {
        let fun = new Collection.fun[classification];
        fun.start();
    }
}
Collection.fun = {
    JiankangyixianDoctorAll: jiankangyixianDoctorAll_1.default
};
exports.default = Collection;
//# sourceMappingURL=index.js.map