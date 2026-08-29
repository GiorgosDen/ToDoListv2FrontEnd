import apiClient from "./apiClient";

const authService = {
    async logInService(loginData){
        try {
            //login data JSON {importedEmail:...,importedPassword:...}
            const response =  await apiClient.post('/login',loginData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async signUpService(signUpData){
        try {
            //signUpData a JSON {fullName,email,password}
            const response = await apiClient.post('/signUp',signUpData);
            return response.data;   
        } catch (error) {
            console.log(error);
        }
    }
} 

export default authService;