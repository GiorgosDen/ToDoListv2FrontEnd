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
import { useLocation } from 'react-router-dom';

function MainPage({changeNavVisibility}){

  //Get the username
  const location = useLocation();
  const name = location.state?.username;
  /**Hooks UseStates**/
  //extract user tasks (from localstorage)
  const [userTasks, setUserTasks] = useState(null);

  //Set completed Tasks counter based on updated userTasks
  const [completedTasks, setCompletedTaks] = useState(0);

  useEffect(()=>{
    const getTasks =async()=>{
      try{
        const resTasks = await taskService.getDailyTasks();
        //console.log(resTasks.userTasks.length);
        if(resTasks){
          setUserTasks(resTasks.userTasks);
        } 
      } catch (error) {
        console.log(error);
      }
    }
    getTasks();
  },[]);
  useEffect(()=>{
    console.log("Change Tasks number");
  },[userTasks]);

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
        <AddTaskMenu totalTasks={0}/>
        <div className='tasksScrollMenu'>
          {
            userTasks && userTasks.length>0 ? (
              userTasks?.map((task,index)=>(
                <CheckTask key={index} userTask={task} onCheckTaskChange={handleCheckTaskChange}/>
              )
            )
          ) : (
            <p className="text-gray-500 text-sm">You don't have any tasks yet!</p>
          )
          }
        </div>
        <CompletedTaskMenu tasksCount={0} completedTaskCount={completedTasks}/>
    </>
  );
}

export default MainPage;