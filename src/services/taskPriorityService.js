import apiClient from "./apiClient";

const taskPriorityService ={
    async getTaskPriorities(){
        try {
            const response = await apiClient.get('/priority');
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};

export default taskPriorityService;