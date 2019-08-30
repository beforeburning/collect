// 正则
const filterHtml = (string: string) => string.replace(/<[^>]*>|<\/[^>]*>/gm, '');

export default {
    filterHtml
}
