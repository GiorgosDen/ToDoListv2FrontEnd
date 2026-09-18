import { useEffect, useState } from "react";
import StatisticsHeader from "./components/StatisticsHeader";
import taskService from "../../services/taskService";
import taskCatService from "../../services/taskCatService";
import statisticsService from "../../services/statisticService";
import taskPriorityService from "../../services/taskPriorityService";
import TaskPieChart from "./Charts/TaskPieChart";
import SimpleAreaChart from "./Charts/SimpleAreaChart";
import SimpleBarChart from "./Charts/SimpleBarChart";
//Charts
function StatisticsPage(){
    const [userTasks, setUserTasks] = useState([]);
    const [completedTasks,setCompletedTasks] = useState([]);
    const [taskCategories, setTaskCategories] = useState([]);
    const [taskCategoriesNumbers,setTaskCategoriesNumbers] = useState([]);
    const [taskCategoriesRates, setTasksCategoriesRates] = useState([]);
    const [totalCompletedNumbers, setTotalCompletedNumbers] = useState([]);
    const [taskPrioritiesNumbers, setTaskPrioritiesNumbers] = useState([]);

    useEffect(()=>{
        const getAllTasksData =async()=>{
            //Get data to export statistics
            try{
                const resTasks = await taskService.getUserTasks("month");
                let fetchTaskData = [];
                let fetchComplTaskData = [];
                if(resTasks && resTasks.userTasks){
                    fetchTaskData = resTasks.userTasks;
                    setUserTasks(fetchTaskData);
                    fetchComplTaskData = statisticsService.getCompletedTasks(fetchTaskData);
                    setCompletedTasks(fetchComplTaskData);
                } 

                const resCategories = await taskCatService.getTaskCategories();
                //console.log(resCategories);
                if(resCategories){
                    const fetchCategories = resCategories;
                    setTaskCategories(fetchCategories);
                    //console.log(fetchCategories);
                    const catNums = statisticsService.getTaskCategoriesNumber(fetchTaskData,fetchCategories);
                    setTaskCategoriesNumbers(catNums);
                    setTasksCategoriesRates(statisticsService.getTaskCategoriesRate(catNums,fetchTaskData.length))
                }

                if(fetchTaskData){
                    console.log(statisticsService.getTaskTotalCompletedNumbers("month",fetchTaskData));
                    setTotalCompletedNumbers((statisticsService.getTaskTotalCompletedNumbers("month",fetchTaskData)));
                }

                const taskPriorities = await taskPriorityService.getTaskCategories();
                if(taskPriorities){
                    setTaskPrioritiesNumbers(statisticsService.getPriorityNumbers(taskPriorities,fetchTaskData));
                }
                

            } catch (error) {
                console.log(error);
            }
        }
        getAllTasksData();
    },[]);


    return(
        <div className="flex flex-col w-full h-screen overflow-hidden">
            <div className="w-full shrink-0 sticky top-0 z-10">
                <StatisticsHeader completedTasks={completedTasks.length} totalTasks={userTasks.length}/>
            </div>            
            <div className="w-full flex-1 flex flex-wrap overflow-y-auto p-4 gap-4 min-h-0">
                <div className="w-full h-fit md:w-[25%] flex flex-col items-center justify-center border-2">
                    <h1>Tasks By Category:</h1>
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
                <div id="SingleRow" className="w-full md:w-[65%] flex flex-col items-center justify-center border-2">
                    <h1>Single Area Chart:</h1>
                    <SimpleAreaChart chartData={totalCompletedNumbers}/>
                </div>
                <div className="w-full md:w-[35%] flex flex-col items-center justify-center border-2">
                    <h1>Bar Chart:</h1>
                    <SimpleBarChart chartData={taskPrioritiesNumbers}/>
                </div>
                <div className="w-full md:w-[55%] flex flex-col items-center justify-center border-2 cursor-pointer">
                    <h1>Recent Activity:</h1>
                    <div className="w-full flex-1 overflow-y-auto max-h-80 py-2 px-2 gap-2 min-h-0">
                    {
                        userTasks.map((task,index)=>{
                            let currColor = "";
                            if(task.State===2) currColor="red";
                            if(task.State===3) currColor="green";
                            if(index<=4){
                                return (
                                    <div key={index} className="w-full flex align-bottom gap-1 py-2 px-3 hover:border shadow-lg rounded-lg">
                                        <svg style={{ color: currColor }} className={`w-4 h-4 shrink-0 `} 
                                            viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" 
                                            className="fill-current stroke-gray-800 stroke-[1]"/>
                                        </svg>  
                                        <p className="w-full flex justify-between text-lg md:text-xl py-2">
                                            {task.Name} 
                                            <span className="text-md md:text-lg rounded-lg bg-gray-300 px-1 py-2">{task.CatName}</span>
                                        </p>
                                    </div>
                                )
                            }
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatisticsPage;