import { useParams } from 'react-router-dom';
import TaskInfoHeader from './components/TaskInfoHeader';
import TaskInfoPanel from './components/TaskInfoPanel';
import TaskManagePanel from './components/TaskManagePanel';
import { useEffect, useState } from 'react';

import taskService from '../../services/taskService';

function TaskPage(){
    const {taskId} = useParams();
    const [taskByID,setTaskByID] = useState({id:0,Name:"",Description:"",DateTime:"0000/00/00, 00:00:00",Category:1,State:1,Priority:1,Reminder:0,Repeat:0,UserID:0,CatName:"Work",PrName:"Low"});
    useEffect(()=>{
        //Get task id from url
        const getTaskByID = async()=>{
            try {
                //console.log(`TaskID:${taskId}`);
                const aTask = await taskService.getUserTaskByID(Number(taskId));
                const taskID = aTask?aTask.userTask[0]:0;
                //console.log(taskID);
                setTaskByID(taskID);   
            } catch (error) {
                console.log(error);
            }
        }
        getTaskByID();
    },[taskId]);

    return(
        <div className='p-4'>
            <TaskInfoHeader/>
            <TaskInfoPanel aTask={taskByID}/>
            <TaskManagePanel taskID={taskByID.id} taskState={taskByID.State}/>
        </div>
    );
}

export default TaskPage;