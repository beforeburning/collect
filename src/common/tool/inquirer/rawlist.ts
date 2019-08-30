/**
 Function: inquirer 命令行工具
 User: burning <923398776@qq.com>
 Date: 2019年07月31日
 */

import * as inquirer from 'inquirer';
import RawlistInterface from './RawlistInterface';

export default class Inquirer implements RawlistInterface {
    public rawlist(text: string, data: object[]) {
        return new Promise(resolve => {
            let promptList: object[] = [{
                type: 'rawlist',
                name: 'radio',
                message: text,
                choices: data
            }];
            inquirer.prompt(promptList).then((answers: string) => {
                resolve(answers['radio']);
            })
        })
    }
}

