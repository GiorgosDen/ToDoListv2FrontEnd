import apiClient from "./apiClient";

const taskCatService ={
    async getTaskCategories(){
        try {
            const response = await apiClient.get('/taskCategories');
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async createTaskCategory(categoryData){
        try {
            const response = await apiClient.post('/taskCategories',categoryData);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async updateTaskCategory(catID,categoryData){
        try {
            const response = await apiClient.put(`/taskCategories/${catID}`,categoryData);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async deleteTaskCategory(catID){
        try {
            const response = await apiClient.delete(`/taskCategories/${catID}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};

export default taskCatService;