"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YoulaiDeptAll_1 = require("./YoulaiDeptAll");
const YoulaiHospitalAll_1 = require("./YoulaiHospitalAll");
const YoulaiDoctor_1 = require("./YoulaiDoctor");
class Collection {
    run(classification) {
        let fun = new Collection.fun[classification];
        fun.start();
    }
}
Collection.fun = {
    YoulaiDeptAll: YoulaiDeptAll_1.default,
    YoulaiHospitalAll: YoulaiHospitalAll_1.default,
    YoulaiDoctor: YoulaiDoctor_1.default
};
exports.default = Collection;
//# sourceMappingURL=index.js.map