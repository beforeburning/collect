"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AipNlpClient = require("baidu-aip-sdk").nlp;
const APP_ID = "17109623";
const API_KEY = "277ouG7piWHFNQKLgGPqP5BU";
const SECRET_KEY = "XeKj4eBgcvlP2Pj0wIyb806ba7bM1iSR";
const client = new AipNlpClient(APP_ID, API_KEY, SECRET_KEY);
const topic = (title, content) => {
    return new Promise(resolve => {
        client.topic(title, content).then((result) => {
            let tag1 = '';
            let tag2 = '';
            if (result.item.lv1_tag_list[0]) {
                tag1 = result.item.lv1_tag_list[0].tag ? result.item.lv1_tag_list[0].tag : ' ';
            }
            if (result.item.lv2_tag_list[0]) {
                tag2 = result.item.lv2_tag_list[0].tag ? result.item.lv2_tag_list[0].tag : ' ';
            }
            resolve({ tag1, tag2 });
        }).catch((e) => {
            resolve({ tag1: '', tag2: '' });
        });
    });
};
exports.default = {
    topic
};
//# sourceMappingURL=index.js.map