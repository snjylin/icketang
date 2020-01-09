// 引入mongodb
let mongodb = require('mongodb');
// 连接客户端
let mongoClient = mongodb.MongoClient;

/**
 * Database方法 用于封装数据库 简化操作
 * @connectStr	连接字符串 ex: 'mongodb://localhost:27017'
 * @dbname 		数据库名称 ex: 'ickt'
 * @collname 	集合名称   ex: 'students'
 */
function Database(connectStr, dbname, collname) {
    // 安全校验
    if (!(this instanceof Database)) {
        return new Database(connectStr, dbname, collname);
    }

    // 赋值
    this.connectStr = connectStr;
    this.dbname = dbname;
    this.collname = collname;
}
function connect(connectStr, dbname, collname, callback) {
    // 连接数据库
    mongoClient.connect(connectStr, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            // 执行callback
            callback(err);
            return;
        }

        // 连接指定数据库
        let db = client.db(dbname);
        // 连接集合
        let coll = db.collection(collname);
        // 执行callback并传递参数
        callback(err, client, coll);
    });
}
function collCallback(err, result, client, callback) {
    if (err) {
        callback(err, null);
        return;
    }

    // 成功之后执行callback
    callback(err, result);
    // 断开连接
    client.close();
}
// 增加一条数据
Database.prototype.insertOne = function(obj, callback) {
    connect(this.connectStr, this.dbname, this.collname, (err, client, coll) => {
        // 通过coll操作集合
        coll.insertOne(obj, (err, result) => {
            collCallback(err, result, client, callback);
        });
    })
}
// 增加多条数据
Database.prototype.insertMany = function(arr, callback) {
    connect(this.connectStr, this.dbname, this.collname, (err, client, coll) => {
        // 通过coll操作集合
        coll.insertMany(arr, (err, result) => {
            collCallback(err, result, client, callback);
        });
    })
}
// 删除一条数据
Database.prototype.deleteOne = function(obj, callback) {
    connect(this.connectStr, this.dbname, this.collname, (err, client, coll) => {
        // 通过coll操作集合
        coll.deleteOne(obj, (err, result) => {
            collCallback(err, result, client, callback);
        });
    })
}
// 删除多条数据
Database.prototype.deleteMany = function(obj, callback) {
    connect(this.connectStr, this.dbname, this.collname, (err, client, coll) => {
        // 通过coll操作集合
        coll.deleteMany(obj, (err, result) => {
            collCallback(err, result, client, callback);
        });
    })
}
// 修改一条数据
Database.prototype.updateOne = function(query, updated, callback) {
    connect(this.connectStr, this.dbname, this.collname, (err, client, coll) => {
        // 通过coll操作集合
        coll.updateOne(query, updated, (err, result) => {
            collCallback(err, result, client, callback);
        });
    })
}
// 修改多条数据
Database.prototype.updateMany = function(query, updated, callback) {
    connect(this.connectStr, this.dbname, this.collname, (err, client, coll) => {
        // 通过coll操作集合
        coll.updateMany(query, updated, (err, result) => {
            collCallback(err, result, client, callback);
        });
    })
}
// 查找一条数据
Database.prototype.findOne = function(obj, callback) {
    connect(this.connectStr, this.dbname, this.collname, (err, client, coll) => {
        // 通过coll操作集合
        coll.findOne(obj, (err, result) => {
            collCallback(err, result, client, callback);
        });
    })
}
// 查找多条数据
Database.prototype.findMany = function(obj, callback) {
    connect(this.connectStr, this.dbname, this.collname, (err, client, coll) => {
        // 通过coll操作集合
        coll.find(obj).toArray((err, result) => {
            collCallback(err, result, client, callback);
        });
    })
}

// 暴露接口
module.exports = Database;
