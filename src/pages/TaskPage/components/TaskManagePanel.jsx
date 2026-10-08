import { useNavigate, Link, useOutletContext } from "react-router-dom";
import taskService from "../../../services/taskService";
import PopUpMessagesList from "../../../services/PopUpMessagesList";
import { useEffect, useState } from "react";
import AddTaskForm from "../../AddTask/components/AddTaskForm";

//Panel to Update (in future versions) and Delete task
function TaskManagePanel({aTask,taskState}){
    //outlet context
    const {triggerPopUpMessage} = useOutletContext();
    const yyyyMMDD = aTask.DateTime.slice(0,10);
    const hhMM = aTask.DateTime.slice(12,17);
    const currentTaskDate = new Date(aTask.DateTime);
    //Show/Hide update form state (boolean)
    const [updateFormView, setUpdateFormView] = useState(false);
    //Task Data states
    const [taskName,setTaskName] = useState(aTask.Name);
    const [taskDescription, setTaskDescription] = useState(aTask.Description);
    const [taskCategory,setTaskCategory] = useState(aTask.Category);
    const [taskTime, setTaskTime] = useState(hhMM);
    const [taskDate, setTaskDate] = useState(yyyyMMDD);
    const [taskReminder, setTaskReminder] = useState(aTask.Reminder);
    const [taskPriority, setTaskPriority] = useState(aTask.Priority);
    const navigate = useNavigate();

    useEffect(()=>{
        const setTaskDataStates = ()=>{
            setTaskName(aTask.Name);
            setTaskDescription(aTask.Description);
            setTaskCategory(aTask.Category);
            setTaskTime(aTask.hhMM);
            setTaskDate(aTask.yyyyMMDD);
            setTaskReminder(aTask.Reminder);
            setTaskPriority(aTask.Priority);
        }
        setTaskDataStates();
    },[]);
    const deleteTask = async()=>{
        //If the task is not completed
        if(taskState!==3){
            const deleteStat = await taskService.deleteTaskByID(aTask.ID);
            if(deleteStat==200){
                navigate("/home");
            }
        }else{
            //Completed tasks cannot be deleted
            const matchedError = PopUpMessagesList.find(err => err.status === 'delete-completed');
            triggerPopUpMessage(matchedError);
        }
    }
    const changePopUpVisibility = (aBoolean)=>{
        setUpdateFormView(aBoolean)
    }

    return(
        
        <div className="flex justify-end gap-2 pt-2">
            <Link to={"/home"}>
                <button type="button" className="bg-transparent hover:bg-gray-400 hover:bg-opacity-30 text-gray-700 py-1 px-2 border border-gray-500 hover:border-gray-700 rounded-lg">
                    Return
                </button>
            </Link>
            <button className="py-1 px-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800"
             onClick={()=>setUpdateFormView(true)}>
                Update
            </button>
            <button className="font-semibold text-white bg-red-700 py-1 px-3 rounded-lg hover:bg-red-800 shadow-sm"
             onClick={deleteTask}>Delete</button>

             <div id="updateFormPopUp" className={`${updateFormView?'':'hidden'} fixed inset-0 flex items-center justify-center bg-black/50 z-50`}>
                 <AddTaskForm action={"update"} aTask={aTask} navigatePath={``} hidePopUpForm={changePopUpVisibility}/>
             </div>
        </div>
    );
}

export default TaskManagePanel;