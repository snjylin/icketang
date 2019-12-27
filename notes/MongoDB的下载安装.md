MongoDB
## I 下载压缩包
官网：https://www.mongodb.com/
点击右上角‘Try Free’
点击Server
选择操作系统 OS：macOS x64
选择版本 Version：4.2.2
选择包 Package：TGZ
点击Download下载

安装文档：https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x-tarball/

## II 从下载的存档文件中提取文件

在下载目录下执行以下代码
```
tar -zxvf mongodb-macos-x86_64-4.2.2.tgz
```
## III 确保二进制文件位于PATH环境变量中列出的目录中

MongoDB二进制文件位于解压包的bin/目录中。您可以：

将二进制文件复制到PATH变量中列出的目录中，例如/usr/local/bin（根据需要使用安装目录更新/PATH/to/the/mongodb directory/）
```
sudo cp /path/to/the/mongodb-directory/bin/* /usr/local/bin/
```
从PATH变量中列出的目录创建指向二进制文件的符号链接，例如/usr/local/bin（根据需要使用安装目录更新/PATH/to/the/mongodb directory/）：

```
sudo ln -s  /path/to/the/mongodb-directory/bin/* /usr/local/bin/
```


运行MongoDB
## I 创建数据目录
在第一次启动MongoDB之前，必须创建mongod进程将向其写入数据的目录。
例如，要创建/usr/local/var/mongodb目录：
```
sudo mkdir -p /usr/local/var/mongodb
```

## II 创建日志目录
您还必须创建mongod进程将在其中写入其日志文件的目录：
例如，要创建/usr/local/var/log/mongodb目录：
```
sudo mkdir -p /usr/local/var/log/mongodb
```

## III 设置数据和日志目录的权限
确保运行mongod的用户帐户对这两个目录具有读写权限。如果您以自己的用户帐户运行mongod，并且您刚刚创建了上面的两个目录，那么您的用户应该已经可以访问它们了。否则，可以使用chown设置所有权，替换适当的用户：
```
sudo chown my_mongodb_user /usr/local/var/mongodb
sudo chown my_mongodb_user /usr/local/var/log/mongodb
```

## IV 运行MongoDB
要运行MongoDB，在系统提示下运行mongod进程，提供上面的dbpath和logpath两个参数，以及在后台运行mongod的fork参数。或者，您可以选择在配置文件中存储dbpath、logpath、fork和许多其他参数的值。

使用命令行参数运行mongod
在系统提示下运行mongod进程，在命令行上直接提供三个必要的参数：
```
mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
```

使用配置文件运行mongod
在系统提示下运行mongod进程，提供带有config参数的配置文件的路径：
```
mongod --config /usr/local/etc/mongod.conf
```
提示：
如果收到错误消息，表明无法打开mongod，请转至系统偏好设置>安全和隐私。在“常规”选项卡下，单击有关mongod的消息右侧的“仍然允许”按钮

(
    在终端输入`sudo spctl --master-disable`设置任何来源
)

## V 验证MongoDB是否已成功启动
```
ps aux | grep -v grep | grep mongod
```
如果没有看到mongod进程正在运行，请检查日志文件中是否有任何错误消息。


## VI 开始使用MongoDB
在与mongod相同的主机上启动mongo shell。您可以在不使用任何命令行选项的情况下运行mongo shell来连接到本地主机上运行的mongod，默认端口为27017：
```
mongo
```
如果需要在上面的系统首选项中显式批准mongod应用程序，还必须为mongo这样做。

有关使用mongo shell连接的更多信息，例如连接到运行在不同主机和/或端口上的mongod实例，请参阅mongoshell。



为了帮助您开始使用MongoDB，MongoDB提供了各种驱动程序版本的入门指南。有关可用版本，请参见入门。


## 启动mongodb服务端出现错误汇总
1 `Failed to unlink socket file /tmp/mongodb-27017.sock
Fatal Assertion 40486 at src/mongo/transport/transport_layer_asio.cpp 693`
在终端中输入 `sudo rm /tmp/mongodb-27017.sock`移除该文件

2 `Failed to set up listener: SocketException: Address already in use
now exiting
shutting down with code:48`
