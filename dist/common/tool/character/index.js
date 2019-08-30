"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 去除字符串最后一位
const removeOneSubstring = (text) => text.substring(0, text.length - 1);
// 正则替换内容
const regularUrl = (link, classCount, pageCount) => link.replace('#####', `${classCount}`).replace('*****', `${pageCount}`);
// 正则替换内容
const regularUrlJK = (link, ID) => link.replace('#####', `${ID}`);
// 去除收尾空格 以空格分割 拿到时间
const timeCharacter = (time) => time.replace(/(^\s*)|(\s*$)/g, '').split(' ')[0];
// 有来 下一页 获取ID
const urlNextId = (link) => link ? parseInt(link.split('.html')[0].split('_').pop()) : null;
// 有来 url容错 +1
const youlaiNextErr = (link) => {
    let id = urlNextId(link);
    let newId = id + 1;
    return link.replace(id.toString(), newId.toString());
};
// 健康一线 封面图分割出时间
const jiankangyixianTime = (link, url) => {
    let timeArr = link.split('vodjk.com/')[1].split('/');
    if (timeArr[0] === 'autothumb') {
        let urlArr = url.split('vodjk.com/')[1].split('/')[1];
        return `20${urlArr.slice(0, 2)}-${urlArr.slice(2, 4)}-${urlArr.slice(4)}`;
    }
    else {
        return timeArr[1].length === 4 ? `${timeArr[0]} -${timeArr[1].slice(0, 2)} -${timeArr[1].slice(2)}` : `${timeArr[0]} - 0${timeArr[1].slice(0, 1)} -${timeArr[1].slice(1)}`;
    }
};
// 健康一线 url分割出时间
const jiankangyixianLinkTime = (link) => {
    let timeArr = link.split('vodjk.com/')[1].split('/');
    return `${timeArr[1]}-${timeArr[2].slice(0, 2)}-${timeArr[2].slice(2)}`;
};
exports.default = {
    removeOneSubstring,
    regularUrl,
    timeCharacter,
    urlNextId,
    youlaiNextErr,
    jiankangyixianTime,
    regularUrlJK,
    jiankangyixianLinkTime
};
//# sourceMappingURL=index.js.map