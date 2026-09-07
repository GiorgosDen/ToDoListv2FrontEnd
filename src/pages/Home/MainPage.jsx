import { useState, useEffect } from 'react';
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

function MainPage(){

  //Get viewMode from outlet context
  const {viewMode,handleChangeViewMode} = useOutletContext();
  //Get the username
  const location = useLocation();
  const name = location.state?.username;
  /**Hooks UseStates**/
  //user tasks that extract from database 
  const [userTasks, setUserTasks] = useState(null);
  //Set tasks counter (change with view mode)
  const [currentViewModeTasks,setCurrentViewModeTasks] = useState(0);
  //Set completed Tasks counter based on updated userTasks
  const [completedTasks, setCompletedTaks] = useState(0);


  useEffect(()=>{
    const getTasks =async()=>{
      try{
        const resTasks = await taskService.getUserTasks(viewMode);
        //console.log(resTasks.userTasks.length);
        if(resTasks){
          setCurrentViewModeTasks(resTasks.userTasks.length);
          setUserTasks(resTasks.userTasks);
          console.log(resTasks.userTasks);
        } 
      } catch (error) {
        console.log(error);
      }
    }
    getTasks();
  },[viewMode]);

  //interval to check expired tasks
  useEffect(()=>{
    const interval = setInterval(()=>{
      console.log(userTasks);
    },60000);//checks every minute
    return () => clearInterval(interval);
  },[]);

  //Handle checked Tasks
  const handleCheckTaskChange= (taskID,statusNumber)=>{
      //Update counter
      setCompletedTaks(completedTasks+statusNumber);
      //Update task state
      setUserTasks((curTasks)=>{
        const updTasks = curTasks.map((task)=>{
          //If the task clicked
          if(task.id===taskID){
            return({...task, state:statusNumber==1?"Completed":"In progress"});
          }
          return task;
        });
        //Update the state
        return updTasks;
      });     
  }

  return (
    <>
        <MainHeader userName={name}/>
        <hr/>
        <AddTaskMenu totalTasks={currentViewModeTasks} viewMode={viewMode}/>
        <div className='tasksScrollMenu'>
          {
            userTasks && userTasks.length>0 ? (
              userTasks?.map((task,index)=>(
                <CheckTask key={index} userTask={task} onCheckTaskChange={handleCheckTaskChange} dailyTasks={viewMode==="day"?true:false}/>
              )
            )
          ) : (
            <p className="text-gray-500 text-sm">You don't have any tasks yet!</p>
          )
          }
        </div>
        <CompletedTaskMenu tasksCount={currentViewModeTasks} completedTaskCount={completedTasks}/>
    </>
  );
}

export default MainPage;