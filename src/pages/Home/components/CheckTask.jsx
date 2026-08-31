import { useEffect, useState } from 'react';
import './checktask.css'
import { Link } from 'react-router-dom';

//userTask: Task object data, 
//onCheckTaskChange: function that pass 1/-1 to parent 
//dailyTasks: Boolean value that declars if are showing daily tasks
function CheckTask({userTask, onCheckTaskChange, dailyTasks}){
  const [taskStatusMessage, setTaskStatusMessage] = useState("");//Message if task is not In progress
  const [expComplCardClass, setExpComplCardClass] = useState("");// 

  useEffect(()=>{
    if(userTask.state=="In Progress"){
      setTaskStatusMessage("");
      setExpComplCardClass("");
    }else if(userTask.state=="Expired"){
      setTaskStatusMessage("!Expired");
      setExpComplCardClass("blocked-");
    }else if(userTask.state=="Completed"){
      setTaskStatusMessage("!Completed");
      setExpComplCardClass("blocked-");
    }
  },[userTask.state]);

  const handleChange = (e) =>{
    //Call parents function and pass 1 if is checked (true) or -1 if is diselected
      onCheckTaskChange(userTask.id,e.target.checked?1:-1);
  }

  return(
    <label className={`${expComplCardClass}task-card`}>
      <div className="flex items-center gap-3">
        <input 
          type="checkbox" 
          className="task-checkbox" 
          onChange={handleChange}
        />

        <div className="flex flex-col">
          <span className="task-title">{userTask.Name} <span className="font-semibold text-red-700">{taskStatusMessage}</span></span>
          <span className="text-xs text-gray-500">{userTask.Category?userTask.CatName:'Not availiable'}</span>
        </div>
      </div>
      <div className='flex justify-between gap-2'>
        <span className="text-xs md:text-md text-gray-400 whitespace-nowrap">
          {/**If dailyTasks is true HH:mm else mm-dd HH:mm */}
          {dailyTasks?userTask.DateTime.slice(11,16):`${userTask.DateTime.split("T")[0].slice(5,10)} ${userTask.DateTime.split("T")[1].slice(0,5)}`}
        </span>
        <Link to={`taskPage/${userTask.id}`} className="text-xs md:text-sm py-1 px-2 text-white bg-blue-400 hover:bg-blue-700 rounded-2xl">
          !
        </Link>
      </div>
    </label>
    );
}

export default CheckTask;