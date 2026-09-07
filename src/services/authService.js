import apiClient from "./apiClient";

const authService = {
    async logInService(loginData){
        try {
            //login data JSON {importedEmail:...,importedPassword:...}
            const response =  await apiClient.post('/auth/login',loginData);
            console.log(response.data);
            return {success:true,data:response.data};
        } catch (error) {
            console.log(error);
            return {success:false,data:error};
        }
    },
    async signUpService(signUpData){
        try {
            //signUpData a JSON {fullName,email,password}
            const response = await apiClient.post('/auth/signUp',signUpData);
            return {success:true,data:response.data};   
        } catch (error) {
            console.log(error);
            return {success:false,data:error};
        }
    }
} 

export default authService;