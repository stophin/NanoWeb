����mysql-server����
mysql-server_5.7.21-1debian9_amd64.deb-bundle.tar

��ѹ��
tar -xvf  ysql-server_5.7.21-1debian9_amd64.deb-bundle.tar

��װ��������
apt-get    install    libaio1

��˳��ִ�����в�����
dpkg -i  mysql-common_5.7.17-1ubuntu16.04_amd64.deb

dpkg -i  libmysqlclient20_5.7.17-1ubuntu16.04_amd64.deb

dpkg -i  libmysqlclient-dev_5.7.17-1ubuntu16.04_amd64.deb

dpkg -i  libmysqld-dev_5.7.17-1ubuntu16.04_amd64.deb

dpkg -i  mysql-community-client_5.7.17-1ubuntu16.04_amd64.deb

dpkg -i  mysql-client_5.7.17-1ubuntu16.04_amd64.deb

dpkg -i  mysql-community-source_5.7.17-1ubuntu16.04_amd64.deb

��װserver����
dpkg  -i  mysql-community-server_5.7.17-1ubuntu16.04_amd64.deb

���ִ���ʱ���У�
apt --fix-broken install

���������server���İ�װ����ʾ����root���룬����ȷ���Ժ�Ϳ����ˡ�