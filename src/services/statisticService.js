//Fuctions for Statistics
//Input a tasks list {title, description, category...}

const statisticsService ={
    getCompletedTasks(tasksList){
        //Return the completed tasks
        const CompletedTasks = tasksList.filter((task)=> {return task.State===3;});
        return CompletedTasks?CompletedTasks:[];
    },
    getTaskCategoriesNumber(tasksList,categoriesList){
        //Return a list of categories Number {cat:70}
        let categoriesNumberList = categoriesList.map((catObject)=>{
            return {
                id:catObject.id,
                Name:catObject.Name,
                Color:catObject.ColorRGB,
                Rate:0
            }
        });

       tasksList.forEach((task) => {
            const match = categoriesNumberList.find(cat => cat.id === task.Category);
            if (match) {
                match.Rate += 1;
            }
        });

        return categoriesNumberList;

    },
    getTaskCategoriesRate(catNumbers,totalTasks){
        //Input a list built by getTaskCategoriesNumber {id,Name,Number}
        //and the total tasks 

        catNumbers.forEach((catObj) => {
            catObj.Rate = Math.round((catObj.Rate / totalTasks) * 100);
        });
        return catNumbers;
    }
}

export default statisticsService;