import apiClient from "./apiClient";

const userService ={
    async updateUserData(userData){
        try {
            const response = await apiClient.put("/user",userData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async getUserData(){
        try {
            const response = await apiClient.get("/user");
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async deleteUser(){
        try {
            const logOutRes = await apiClient.post('/auth/logout');
            const deleteUserRes = await apiClient.delete("/user");
            if(logOutRes && deleteUserRes){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default userService;