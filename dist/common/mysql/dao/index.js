"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mysql = require("mysql");
// 启动数据库
let connection = undefined;
const dao = () => {
    if (connection === undefined) {
        connection = Mysql.createConnection({
            host: global['CONFIG'].sql.host,
            user: global['CONFIG'].sql.user,
            password: global['CONFIG'].sql.password,
            database: global['CONFIG'].sql.database
        });
        connection.connect();
    }
    return connection;
};
exports.default = dao;
//# sourceMappingURL=index.js.map