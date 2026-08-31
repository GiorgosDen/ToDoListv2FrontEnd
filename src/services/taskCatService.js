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
    }
};

export default taskCatService;