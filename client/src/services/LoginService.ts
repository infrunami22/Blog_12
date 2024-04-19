export class LoginService {

    login(token:string,username:string){
        localStorage.setItem("username", username)
        localStorage.setItem("token", token)
    }

    async logOut(){
        const userData = {token : this.checkLogin() }
        console.log(userData)
        const response = await fetch('http://localhost:5000/auth/logout', {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
     })
    console.log(response)

    if(response.status == 204){
        localStorage.removeItem("token")
        localStorage.removeItem("username")
   }
   else{
    console.log(response.statusText)
   }
        
    }

    checkLogin(){
       return localStorage.getItem("token")
    }

    getUserName(){
        return localStorage.getItem("username")
    }

    header():RequestInit{
        const headers = {
            "authorization" : 'Bearer '+this.checkLogin(),
            'Content-Type': 'application/json'
         }
        
         return {
            headers
         }
    }

}