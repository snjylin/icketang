// 引入Mongodb
var mongodb = require('mongodb');

// 定义连接客户端
var mongoClient = mongodb.MongoClient;

/**
 * Database 用于封装数据库 简化操作
 * @connectStr 连接字符串 ex: 'mongodb://localhost:27017'
 * @dbname 数据库名称 ex: 'students'
 * @collname 集合名称 ex: 'user'
 */

// 定义构造函数
function Database(connectStr, dbname, collname) {
	if (!(this instanceof Database)) {
		throw new Error('请使用new 调用');
	}

	// 接收数据
	this.connectStr = connectStr;
	this.dbname = dbname;
	this.collname = collname;
}


// 增加一条数据
Database.prototype.insertOne = function(obj, callback) {
	// 备份this
	var me = this;
	// 连接数据库
	mongoClient.connect(this.connectStr,  { useUnifiedTopology: true }, function(err, client) {
		// 捕获错误
		if (err) {
			// 执行回调函数
			callback(err, null);
			return;
		}

		// 执行到这里说明没有问题
		// 连接数据库
		var db = client.db(me.dbname);

		// 连接集合
		var coll = db.collection(me.collname);

		// 插入一条数据
		coll.insertOne(obj, function(err, result) {
			// 关闭数据库
			client.close();
			// 捕获错误
			if (err) {
				// 执行回调函数
				callback(err, null);
				return;
			}

			// 如果成功
			callback(null, result);
		})

	})
}

// 增加多条数据
Database.prototype.insertMany = function(arr, callback) {
	// 备份this
	var me = this;
	// 连接数据库
	mongoClient.connect(this.connectStr, { useUnifiedTopology: true }, function(err, client) {
		// 捕获错误
		if (err) {
			// 执行回调函数
			callback(err, null);
			return;
		}

		// 执行到这里说明没有问题
		// 连接数据库
		var db = client.db(me.dbname);

		// 连接集合
		var coll = db.collection(me.collname);

		// 插入一条数据
		coll.insertMany(arr, function(err, result) {
			// 关闭数据库
			client.close();
			// 捕获错误
			if (err) {
				// 执行回调函数
				callback(err, null);
				return;
			}

			// 如果成功
			callback(null, result);
		})

	})
}

// 封装connect连接过程
function connect(connectStr, dbname, collname, callback) {
	mongoClient.connect(connectStr, { useUnifiedTopology: true }, function(err, client) {
		// 捕获错误
		if (err) {
			// 执行回调函数
			callback(err, null);
			return;
		}

		// 执行到这里说明没有问题
		// 连接数据库
		var db = client.db(dbname);

		// 连接集合
		var coll = db.collection(collname);

		// 执行回调函数
		callback(err, coll, client)
	})
}

// 删除一条数据
Database.prototype.deleteOne = function(obj, callback) {
	connect(this.connectStr, this.dbname, this.collname, function(err, coll, client) {
		// 捕获错误
		if (err) {
			// 执行回调函数
			callback(err, null);
			return;
		}

		// 删除一条数据
		coll.deleteOne(obj, function(err, result) {
			// 关闭数据库
			client.close();
			// 捕获错误
			if (err) {
				callback(err, null);
				return;
			}

			// 没有问题
			callback(null, result);
		})

	})
}

// 删除多条数据
Database.prototype.deleteMany = function(obj, callback) {
	connect(this.connectStr, this.dbname, this.collname, function(err, coll, client) {
		// 捕获错误
		if (err) {
			// 执行回调函数
			callback(err, null);
			return;
		}

		// 删除一条数据
		coll.deleteMany(obj, function(err, result) {
			// 关闭数据库
			client.close();
			// 捕获错误
			if (err) {
				callback(err, null);
				return;
			}

			// 没有问题
			callback(null, result);
		})

	})
}

// 修改一条数据
Database.prototype.updateOne = function(query, updated, callback) {
	connect(this.connectStr, this.dbname, this.collname, function(err, coll, client) {
		// 捕获错误
		if (err) {
			// 执行回调函数
			callback(err, null);
			return;
		}

		// 删除一条数据
		coll.update(query, updated, function(err, result) {
			// 关闭数据库
			client.close();
			// 捕获错误
			if (err) {
				callback(err, null);
				return;
			}

			// 没有问题
			callback(null, result);
		})

	})
}


// 修改多条数据
Database.prototype.updateMany = function(query, updated, callback) {
	connect(this.connectStr, this.dbname, this.collname, function(err, coll, client) {
		// 捕获错误
		if (err) {
			// 执行回调函数
			callback(err, null);
			return;
		}

		// 删除一条数据
		coll.updateMany(query, updated, function(err, result) {
			// 关闭数据库
			client.close();
			// 捕获错误
			if (err) {
				callback(err, null);
				return;
			}

			// 没有问题
			callback(null, result);
		})

	})
}

// 查询一条数据
Database.prototype.findOne = function(query, callback) {
	connect(this.connectStr, this.dbname, this.collname, function(err, coll, client) {
		// 捕获错误
		if (err) {
			// 执行回调函数
			callback(err, null);
			return;
		}

		// 删除一条数据
		coll.findOne(query, function(err, result) {
			// 关闭数据库
			client.close();
			// 捕获错误
			if (err) {
				callback(err, null);
				return;
			}

			// 没有问题
			callback(null, result);
		})

	})
}

// 查询多条数据
Database.prototype.findMany = function(query, callback) {
	connect(this.connectStr, this.dbname, this.collname, function(err, coll, client) {
			// 捕获错误
			if (err) {
				// 执行回调函数
				callback(err, null);
				return;
			}

			// 删除一条数据
			coll.find(query).toArray(function(err, result) {
				// 关闭数据库
				client.close();
				// 捕获错误
				if (err) {
					callback(err, null);
					return;
				}

				// 没有问题
				callback(null, result);
			})

		})
	}

// 暴露功能
module.exports = Database;
