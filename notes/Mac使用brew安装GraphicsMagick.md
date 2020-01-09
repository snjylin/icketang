首先需要安装homebrew

执行命令
```
brew install GraphicsMagick
```

报错
```
Updating Homebrew...
==> Auto-updated Homebrew!
Updated 1 tap (homebrew/core).
==> Updated Formulae
imagemagick         imagemagick@6       swiftlint           watch

Error: The following directories are not writable by your user:
/usr/local/share/man/man8
/usr/local/var/log

You should change the ownership of these directories to your user.
  sudo chown -R $(whoami) /usr/local/share/man/man8 /usr/local/var/log

And make sure that your user has write permission.
  chmod u+w /usr/local/share/man/man8 /usr/local/var/log
```

按照提示执行
```
sudo chown -R $(whoami) /usr/local/share/man/man8 /usr/local/var/log
chmod u+w /usr/local/share/man/man8 /usr/local/var/log
```

再重新执行命令
```
brew install GraphicsMagick
```

就可以成功安装了
