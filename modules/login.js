/**
 * Created by cybuster on 2017/6/10.
 */
const dbHelper=require('./dbHelper');

function UserInfo(username,password){
    this.user    = username;
    this.password= password;
}

//登陆
UserInfo.prototype.login =async function save() {
    let user = [this.user, this.password];
    await dbHelper.start();
    let result=await dbHelper.execute('select * from users where name = ? and password = ?',user);
    await dbHelper.stop();
    return result;
};


module.exports = UserInfo;