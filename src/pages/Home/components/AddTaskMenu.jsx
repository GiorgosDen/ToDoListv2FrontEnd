//Contains the area above the tasks scroller

import { Link} from 'react-router-dom'

function AddTaskMenu({totalTasks,viewMode}){
    const setTaskTeam = ()=>{
      switch(viewMode){
        case "day":return "Daily";
        case "week":return "Weekly";
        case "month":return "Monthly";
        case "completed":return "Completed"
      }
    }
    const taskTeam = setTaskTeam();
    return(
        <div className='px-[2%] h-[10%] flex flex-row justify-between items-center z-1'>
          <h1 className="text-black font-semibold text-base md:text-lg">{taskTeam} Tasks &nbsp;
            <span className="text-xs md:text-sm py-1 px-2 text-white bg-blue-400 rounded-2xl">{totalTasks}</span>
          </h1>
          <Link to="addNewTask">
            <button className="bg-blue-500 hover:bg-blue-700 text-xs md:text-sm text-white px-2 py-1 rounded">
              + Add Task
            </button>
          </Link>        
        </div>
    );
}

export default AddTaskMenu;