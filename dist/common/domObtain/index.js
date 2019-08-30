"use strict";
/**
 Function: dom 抓取
 User: burning <923398776@qq.com>
 Date: 2019年07月31日
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Cheerio = require("cheerio");
const Superagent = require("superagent");
const Request = require("request");
class DomObtain {
    constructor(link) {
        this.UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3642.0 Safari/537.36';
        this.link = link;
    }
    // 抓取dom
    superagent() {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            Request.options = {
                timeout: 5000
            };
            Superagent.get(this.link).set('User-Agent', this.UA).end((err, sres) => {
                (err || !sres || !sres.text) ? reject() : resolve(sres.text);
            });
        });
    }
    // 分析DOM
    cheerio(text, domClass) {
        let domArr = [];
        let $ = Cheerio.load(text);
        domClass.map(item => domArr.push($(item)));
        return domArr;
    }
    obtain(domClass, callback) {
        this.superagent().then(text => {
            let dom = this.cheerio(text, domClass);
            callback(dom);
        }).catch(() => {
            callback(false);
        });
    }
}
exports.default = DomObtain;
//# sourceMappingURL=index.js.map