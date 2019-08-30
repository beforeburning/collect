"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 正则
const filterHtml = (string) => string.replace(/<[^>]*>|<\/[^>]*>/gm, '');
exports.default = {
    filterHtml
};
//# sourceMappingURL=index.js.map