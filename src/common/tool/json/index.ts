// mysql 返回的对象转json对象
const jsonToJson = (data) => JSON.parse(JSON.stringify(data));

export default {
    jsonToJson
}
