import { useParams } from 'react-router-dom';
import TaskInfoHeader from './components/TaskInfoHeader';
import TaskInfoPanel from './components/TaskInfoPanel';
import TaskManagePanel from './components/TaskManagePanel';

function TaskPage(){
    //Get task id from url
    const {taskId} = useParams();
    //Receive Task
    const userTasks = localStorage.getItem('tasks')? JSON.parse(localStorage.getItem('tasks')):[];
    const taskTarget = userTasks.filter((task)=>task.id==taskId); //A list with 1 item
    return(
        <div className='p-4'>
            <TaskInfoHeader/>
            <TaskInfoPanel aTask={taskTarget[0]}/>
            <TaskManagePanel taskID={taskId}/>
        </div>
    );
}

export default TaskPage;