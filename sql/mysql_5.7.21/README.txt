下载mysql-server包：
mysql-server_5.7.21-1debian9_amd64.deb-bundle.tar

解压：
tar -xvf  ysql-server_5.7.21-1debian9_amd64.deb-bundle.tar

安装依赖包：
apt-get    install    libaio1

按顺序执行下列操作：
dpkg -i  mysql-common_5.7.17-1ubuntu16.04_amd64.deb

dpkg -i  libmysqlclient20_5.7.17-1ubuntu16.04_amd64.deb

dpkg -i  libmysqlclient-dev_5.7.17-1ubuntu16.04_amd64.deb

dpkg -i  libmysqld-dev_5.7.17-1ubuntu16.04_amd64.deb

dpkg -i  mysql-community-client_5.7.17-1ubuntu16.04_amd64.deb

dpkg -i  mysql-client_5.7.17-1ubuntu16.04_amd64.deb

dpkg -i  mysql-community-source_5.7.17-1ubuntu16.04_amd64.deb

安装server包：
dpkg  -i  mysql-community-server_5.7.17-1ubuntu16.04_amd64.deb

出现错误时运行：
apt --fix-broken install

会继续进行server包的安装，提示输入root密码，两次确认以后就可以了。