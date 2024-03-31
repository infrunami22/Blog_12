export class LoginService {

    login(token:string,username:string){
        localStorage.setItem("username", username)
        localStorage.setItem("token", token)
    }

    logOut(){
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        
    }

    checkLogin(){
       return localStorage.getItem("token")
    }

    getUserName(){
        return localStorage.getItem("username")
    }

}