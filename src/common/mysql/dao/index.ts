import * as Mysql from 'mysql'

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
}

export default dao;

