export default interface Interface {
    UA: string;

    link: string;

    // 私有方法不能定义接口
    // superagent(): object;

    // cheerio(text: string, domClass: string[]): object[];

    obtain(domClass: string[], callback: any): any;


}
