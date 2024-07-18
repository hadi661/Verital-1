import UserDao from '../dao/UserDao.js';

export default class UserService {
    UserDao;
    
    //handles db queries for user related tasks 
    constructor () {
        this.userDao = new UserDao ();
    }

//retrieve  all users from db
getUsers() {
    return this.userDao.getUsers();
}
//retrieve a specific user "index= user name "
getUsers(username) {
    return this.userDao.getUsers(username);
}
}
