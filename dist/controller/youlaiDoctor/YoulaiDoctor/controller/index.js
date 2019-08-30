"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deptData_1 = require("./deptData");
const doctorGrab_1 = require("./doctorGrab");
class YoulaiDoctor {
    start() {
        let deptData = new deptData_1.default();
        deptData.deptData().then(res => {
            let doctorData = new doctorGrab_1.default(res);
            doctorData.doctorData();
        });
    }
}
exports.default = YoulaiDoctor;
//# sourceMappingURL=index.js.map