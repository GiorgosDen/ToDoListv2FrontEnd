import { useState, useEffect } from 'react';
import {io} from 'socket.io-client';
//Imported services
import taskService from '../../services/taskService';
//Import Page Components
import CheckTask from './components/CheckTask';
import MainHeader from './components/MainHeader';
import AddTaskMenu from './components/AddTaskMenu';
import CompletedTaskMenu from './components/CompletedTaskMenu';
//Import css files
import '../../App.css'
import '../../index.css'
import { useLocation, useOutletContext } from 'react-router-dom';
import statisticsService from '../../services/statisticService';

//socket connection
const serverURL = import.meta.env.SERVER_URL;
const socket = io(serverURL);

function MainPage(){

  //Get viewMode from outlet context
  const {viewMode,handleChangeViewMode} = useOutletContext();
  //Get the username
  const location = useLocation();
  const name = location.state?.username;
  /**Hooks UseStates**/
  //user tasks that extract from database 
  const [userTasks, setUserTasks] = useState([]);
  //Set tasks counter (change with view mode)
  const [currentViewModeTasks,setCurrentViewModeTasks] = useState(0);
  //Set completed Tasks counter based on updated userTasks
  const [completedTasks, setCompletedTasks] = useState(0);
  //Greeting
  const [greetingMessage,setGreetingMessage] = useState('Hello');
  //Sorter 
  const [taskSorter,setTaskSorter] = useState("Time");

  const getTasksData =async()=>{
      //Get initial tasks (or whenever the parameters change)
      try{
        const resTasks = await taskService.getUserTasks(viewMode);
        const completedTasks = await statisticsService.getCompletedTasks(resTasks.userTasks);
        if(resTasks && completedTasks){
          setCurrentViewModeTasks(resTasks.userTasks.length);
          setUserTasks(resTasks.userTasks);
          setCompletedTasks(completedTasks.length);
        } 
      } catch (error) {
        console.log(error);
      }
    }
  useEffect(()=>{
    getTasksData();

    handleSortTasksChange(taskSorter);
    //Create hello message
    createHelloMessage();

    //Listen to server for expired tasks update
    socket.on('tasks-updated',()=>{
      console.log("Server trigger receive: Refreshing task list...");
      getTasksData();
    });
    //Clean up
    return ()=>{
      socket.off('tasks-updated');
    }

  },[viewMode]);

  //Get a datetime string: dd/mm/yyyy, hh:mm:ss 
  //Returns a datetime string: yyyy-mm-ddThh:mm:ss
  const changeDateTimeStringFormat = (aDateTime)=>{
    const [Day,Month,Year] = aDateTime.split(", ")[0].split("/");
    const [Hour,Minute,Second] = aDateTime.split(", ")[1].split(":");
    return `${Year}-${Month}-${Day}T${Hour}:${Minute}:${Second}`;
  }

  //Handle sort Tasks change
  const handleSortTasksChange = (sorter)=>{
    setTaskSorter(sorter);
    setUserTasks((prevTasks)=>{
      const tasksCopy = [...prevTasks];
      if(sorter==="Time"){
        return tasksCopy.sort((a,b)=>{
          const bDateString = changeDateTimeStringFormat(b.DateTime);
          const aDateString = changeDateTimeStringFormat(a.DateTime);
          return (new Date(bDateString)-new Date(aDateString));
        });
      }else{
        return tasksCopy.sort((a,b)=>{return (b.State-a.State)});
      }
    });
  }

  //Handle checked Tasks
  const handleCheckTaskChange= async(taskID,statusNumber)=>{
    try {
      //Set task completed
      const result = await taskService.updateTaskStateByID(taskID);
      if(result.success){
        //Update counter
        setCompletedTasks(completedTasks+statusNumber);
        //Get the updated data
        getTasksData();
      }else{
        console.log(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Create hello message
  const createHelloMessage = ()=>{
    const currentHour = new Date().getHours();
    let greeting = "Hello";

    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      greeting = "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 22) {
      greeting = "Good Evening";
    } else {
      greeting = "Good Night";
    }
    setGreetingMessage(greeting);
  }

  return (
    <>
        <MainHeader helloMessage={greetingMessage} userName={name} sendTaskSorter={handleSortTasksChange} currentViewMode={viewMode}/>
        <hr/>
        <AddTaskMenu totalTasks={currentViewModeTasks} viewMode={viewMode}/>
        <div className='flex-1 min-h-0 overflow-y-auto'>
          {
            userTasks && userTasks.length>0 ? (
              userTasks?.map((task,index)=>(
                <CheckTask key={index} userTask={task} onCheckTaskChange={handleCheckTaskChange} dailyTasks={viewMode==="day"?true:false} completedTasks={viewMode=="completed"?true:false}/>
              )
            )
          ) : (
            <p className="text-gray-500 text-sm">You don't have any tasks yet!</p>
          )
          }
        </div>
        <CompletedTaskMenu handleChangeViewMode={handleChangeViewMode} tasksCount={currentViewModeTasks} completedTaskCount={completedTasks}/>
    </>
  );
}

export default MainPage;