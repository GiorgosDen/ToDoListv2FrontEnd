import apiClient from "./apiClient"
const taskService = {
    //View mode: day/week/month
    async getUserTasks(viewMode){
        try {
            const response =  await apiClient.get(`/tasks/${viewMode}`);
            console.log("The Task I get");
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async getUserTaskByID(taskID){
        try {
            const response = await apiClient.get(`/tasks/${taskID}`);
            //console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async createNewTask(newTaskObj){
        try {
            const response = await apiClient.post('/tasks',newTaskObj);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    //Update a task as completed
    async updateTaskStateByID(taskID){
        try {
            const response = await apiClient.patch(`/tasks/${taskID}`);
            return ({success:true,data:response.data});
        } catch (error) {
            console.log(error);
            return ({success:false,data:error});
        }
    },
    //Update 1 or more task columns
    async updateTaskByID(taskID,taskData){
        try {
            const response = await apiClient.put(`/tasks/${taskID}`,taskData);
            return response.status;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async deleteTaskByID(taskID){
        try {
            const response = await apiClient.delete(`/tasks/${taskID}`);
            return response.status;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default taskService;