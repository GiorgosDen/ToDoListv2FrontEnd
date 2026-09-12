import { useEffect, useState } from "react";
import StatisticsHeader from "./components/StatisticsHeader";
import taskService from "../../services/taskService";
import taskCatService from "../../services/taskCatService";
import statisticsService from "../../services/statisticService";
import TaskPieChart from "./Charts/TaskPieChart";
//Charts
function StatisticsPage(){
    const [userTasks, setUserTasks] = useState([]);
    const [completedTasks,setCompletedTasks] = useState([]);
    const [taskCategories, setTaskCategories] = useState([]);
    const [taskCategoriesNumbers,setTaskCategoriesNumbers] = useState([]);
    const [taskCategoriesRates, setTasksCategoriesRates] = useState([]);

    useEffect(()=>{
        const getAllTasksData =async()=>{
            //Get data to export statistics
            try{
                const resTasks = await taskService.getUserTasks("");
                let fetchTaskData = [];
                if(resTasks && resTasks.userTasks){
                    fetchTaskData = resTasks.userTasks;
                    setUserTasks(fetchTaskData);
                    setCompletedTasks(statisticsService.getCompletedTasks(fetchTaskData));
                } 
                const resCategories = await taskCatService.getTaskCategories();
                //console.log(resCategories);
                if(resCategories){
                    const fetchCategories = resCategories;
                    setTaskCategories(fetchCategories);
                    //console.log(fetchCategories);
                    const catNums = statisticsService.getTaskCategoriesNumber(fetchTaskData,resCategories);
                    setTaskCategoriesNumbers(catNums);
                    setTasksCategoriesRates(statisticsService.getTaskCategoriesRate(catNums,fetchTaskData.length))
                }
            } catch (error) {
                console.log(error);
            }
        }
        getAllTasksData();
    },[]);


    return(
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="sticky top-0 z-10">
                <StatisticsHeader completedTasks={completedTasks.length} totalTasks={userTasks.length}/>
            </div>            
            <hr/>
            <div className="flex-1 overflow-y-auto p-4">
                <div className="w-full md:w-[30%] flex flex-col items-center justify-center border-2">
                    <TaskPieChart totalTasks={userTasks.length} data={taskCategoriesNumbers}/>
                    <div className="flex flex-col items-start">
                    {
                        taskCategoriesRates.map((cat,index)=>(
                            <div key={index} className="flex align-bottom gap-1">
                                <svg style={{ color: cat.Color }} className={`w-4 h-4 shrink-0 `} 
                                    viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" 
                                    className="fill-current stroke-gray-800 stroke-[1]"/>
                                </svg>     
                                <p>{`${cat.Name}: ${cat.Rate}%`}</p>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatisticsPage;