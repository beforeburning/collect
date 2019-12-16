/**
 Function: dom 抓取
 User: burning <923398776@qq.com>
 Date: 2019年07月31日
 */

import * as Cheerio from 'cheerio';
import * as Superagent from 'superagent';
import * as Request from "request";
import Interface from './Interface';


export default class DomObtain implements Interface {

    UA: string = ' ';
    link: string;

    constructor(link: string) {
        this.link = link;
    }

    // 抓取dom
    private superagent() {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            Request.options = {
                timeout: 5000
            };
            Superagent.get(this.link).set('User-Agent', this.UA).end((err, sres) => {
                (err || !sres || !sres.text) ? reject() : resolve(sres.text);
            })
        })
    }

    // 分析DOM
    private cheerio(text: string, domClass: string[]) {
        let domArr: object[] = [];
        let $ = Cheerio.load(text);
        domClass.map(item => domArr.push($(item)));
        return domArr
    }

    public obtain(domClass: string[], callback: any) {
        this.superagent().then(text => {
            let dom: object[] = this.cheerio(<string>text, domClass);
            callback(dom);
        }).catch(() => {
            callback(false);
        })
    }
}
