import VueJwtDecode from 'vue-jwt-decode';

export class LoginService {
    decode(intoken){
        //Take token from window local storage
        let token = intoken;
        try{
            return VueJwtDecode.decode(token)
            
        }
        catch(err){
            console.log('token is null: ',err);
            return ""
        }
      }

    login(token:string,username:string){
        localStorage.setItem("username", username)
        localStorage.setItem("token", token)
        localStorage.setItem("role",this.decode(token).role[0])
        localStorage.setItem("id",this.decode(token).id)
        console.log(token)
    }



    async logOut(){
        const userData = {token : this.checkLogin() }
        console.log(userData)
        const response = await fetch('http://localhost:5000/auth/logout', {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'authorization' : 'Bearer '+this.checkLogin(),
      },
      body: JSON.stringify(userData),
     })
    console.log(response)

    if(response.status == 204){
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("role")
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

    getRole(): string{ 
        return localStorage.getItem("role") || ""
    }

    getUserId(): string {
        return localStorage.getItem("id") || ""
    }
}