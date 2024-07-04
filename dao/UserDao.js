export default class UserDao {

// we can use db to store data here but just for now , array USERS to example
static USERS = [];
insertUser (User) {
    UserDao.USERS.push(User);
}
getUser (User){
    return UserDao.USERS.find (u => u.username === username);
}
getUsers (){
    return UserDao.USERS;
}
}