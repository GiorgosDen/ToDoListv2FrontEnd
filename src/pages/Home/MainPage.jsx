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

  useEffect(()=>{
    const getTasks =async()=>{
      //Get initial tasks (or whenever the parameters change)
      try{
        const resTasks = await taskService.getUserTasks(viewMode);
        if(resTasks){
          setCurrentViewModeTasks(resTasks.userTasks.length);
          setUserTasks(resTasks.userTasks);
        } 
      } catch (error) {
        console.log(error);
      }
    }
    getTasks();

    handleSortTasksChange('Time');
    //Create hello message
    createHelloMessage();

    //Listen to server for expired tasks update
    socket.on('tasks-updated',()=>{
      console.log("Server trigger receive: Refreshing task list...");
      getTasks();
    });
    //Clean up
    return ()=>{
      socket.off('tasks-updated');
    }

  },[viewMode]);

  //Handle sort Tasks change
  const handleSortTasksChange = (sorter)=>{
    if(sorter==="Time"){
      setUserTasks([...userTasks].sort((a,b)=>{return (new Date(b.DateTime)-new Date(a.DateTime))}));  
    }else{
      setUserTasks([...userTasks].sort((a,b)=>{return (b.State-a.State)}));
    }
  }
  //Handle checked Tasks
  const handleCheckTaskChange= async(taskID,statusNumber)=>{
    try {
      //Set task completed
      const result = await taskService.updateTaskStateByID(taskID);
      if(result.success){
        //Update counter
        setCompletedTasks(completedTasks+statusNumber);
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
        <div className='tasksScrollMenu'>
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