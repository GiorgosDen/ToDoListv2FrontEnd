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
    }
}

export default userService;