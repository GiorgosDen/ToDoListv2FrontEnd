//Fuctions for Statistics
//Input a tasks list {title, description, category...}

const statisticsService ={
    getCompletedTasks(tasksList){
        //Return the completed tasks
        const CompletedTasks = tasksList.filter((task)=> {return task.State===3;});
        //console.log(tasksList);
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
    },
    getTaskTotalCompletedNumbers(viewMode,totalTasksList){
        //Input: viewMode (week, month,..,year)
        //totalTaskList (all tasks)
        //completedTasksList (the completed tasks)
        //Output: List of timeUnit: tasks, completed ex.{monday: 10, 7}
        const chronologicalList = this.getChronologicalList(viewMode);
    
        let taskTotalCompletedNumbers = chronologicalList.map((item, index) => ({
            id: index,
            name: item,
            totalNum: 0,
            ComplNum: 0
        }));

        return totalTasksList.reduce((acc, task) => {
                if (!task.DateTime) return acc;       

                //console.log(typeof task.DateTime);
                const day = Number(task.DateTime.slice(0,2));
                const month = Number(task.DateTime.slice(3,5));
                const week = Math.ceil(day / 7);

                let index = 0;
                if(viewMode==="week"){
                    index = day-1;
                }else if(viewMode==="month"){
                    index = week-1;
                }else{
                    index = month-1;
                }
    
                if (acc[index]) {
                    if (task.State === 3) {
                        acc[index].ComplNum += 1;
                    }
                    acc[index].totalNum += 1;
                }

                return acc;
            }, taskTotalCompletedNumbers);
    },
    getChronologicalList(viewMode){
        //Input: viewMode (week,month,year)
        //Output: chronologicalList (days,weeks,months)
        if(viewMode==="week"){
            return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        }else if(viewMode==="month"){
            return ["Week 1","Week 2","Week 3","Week 4"];
        }else{
            return ["January","February","March","April","May","June","July","August","September","October","Noveber","December"];
        }
    },
    getPriorityNumbers(prioritiesList,totalTaskList){
        //Input: Priority List and List with all tasks
        //Output: List with Priority and Tasks Number {id,Name,Count}
        let prioritiesNumbers = prioritiesList.map((prio)=>{
            return {
                id:prio.id,
                Name:prio.Name,
                Number:0,
            }
        });
        totalTaskList.forEach((task)=>{
            const match = prioritiesNumbers.find(pr=> pr.id===task.Priority);
            if(match){
                match.Number+=1;
            }
        });
        console.log(prioritiesNumbers); 
        return prioritiesNumbers;
    }
}

export default statisticsService;