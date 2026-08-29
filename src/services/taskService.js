import apiClient from "./apiClient"
const taskService = {
    async getDailyTasks(){
        try {
            const response =  await apiClient.get('/tasks/day');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default taskService;