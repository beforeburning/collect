"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const character_1 = require("../../../../../common/tool/character");
const config_1 = require("../../config");
const request = require("request");
const mysql_1 = require("../../../../../common/mysql");
class DocList {
    constructor() {
        this.mysql = new mysql_1.default();
    }
    docList(id, callback) {
        let link = character_1.default.regularUrlJK(config_1.default.jiankangyixianDoctorVidoe, id);
        request({
            url: link,
            method: "POST",
            headers: {
                "content-type": "application/json",
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.10 Safari/537.36'
            },
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let list = JSON.parse(body).data;
                let listData = [];
                list.map(item => {
                    let str = {
                        url: item['url'],
                        title: item['title'],
                        cover: item['thumb'],
                        time: item['published']
                    };
                    listData.push(str);
                });
                let map = listData.map(item => {
                    return new Promise(resolve => {
                        this.mysql.insert('jiankangyixian_video', item, () => {
                            console.log(`视频 - ${item['title']} 已抓取`);
                            resolve();
                        });
                    });
                });
                Promise.all(map).then(() => {
                    callback();
                });
            }
            else {
                callback();
            }
        });
    }
}
exports.default = DocList;
//# sourceMappingURL=index.js.map