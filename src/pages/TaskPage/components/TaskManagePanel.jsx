import { useNavigate, Link, useOutletContext } from "react-router-dom";
import taskService from "../../../services/taskService";
import PopUpMessagesList from "../../../services/PopUpMessagesList";
import { useEffect, useState } from "react";

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
                 <div className={`overflow-y-auto min-h-0 w-4/5 h-4/5 flex flex-col items-center bg-white rounded-lg shadow-lg gap-4 px-4 pb-4`}>
                    <section className="w-full h-fit flex flex-col gap-2">
                       <label className="font-semibold text-lg md:text-xl">Task Information</label>
                        <label className="text-base md:text-lg">Name</label>
                        <input type="text" value={taskName} className="bg-neutral-secondary-medium text-gray-700 border border-default-medium text-heading text-sm md:text-sm rounded-base block w-full px-[1.5%] py-[1.7%] shadow-xs"
                         onChange={(e)=>setTaskName(e.target.value)} />
                        <label className="text-base md:text-lg">Description</label>
                        <textarea rows="4" className="h-16 text-gray-700 bg-neutral-secondary-medium border border-default-medium text-heading text-xs md:text-sm rounded-base"
                         onChange={(e)=>setTaskDescription(e.target.value)}  value={taskDescription}/>
                        <div className="w-full flex flex-row gap-5">
                            <div className="w-1/3 flex flex-col">
                                <label className="text-base md:text-lg">Category</label>
                                <button className="w-full bg-transparent border text-gray-700 border-gray-500 py-1 px-2 rounded-2xl" disabled>{aTask.CatName}</button>
                            </div>
                            <div className="w-1/3 flex flex-col">
                                <label className="text-base md:text-lg">Priority</label>
                                <button className="w-full bg-transparent border text-gray-700 border-gray-500 py-1 px-2 rounded-2xl" disabled>{aTask.PrName}</button>
                            </div>
                        </div>
                        <label className="text-base md:text-lg">Schedule</label>
                        <div className="flex justify-between gap-2">
                            <input type="date" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                             defaultValue={currentTaskDate} value={taskDate} onChange={(e)=>setTaskDate(e.target.value)}/>
                            <input type="time" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                             value={taskTime} onChange={(e)=>setTaskTime(e.target.value)}/>
                        </div>
                    </section>
                    <section className="w-full h-fit flex justify-end gap-2">
                        <button className="py-1 px-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800"
                         onClick={()=>console.log("Update Task")}>
                            Update
                        </button>
                        <button className="bg-transparent hover:bg-gray-400 hover:bg-opacity-30 text-gray-700 py-1 px-2 border border-gray-500 hover:border-gray-700 rounded-lg"
                         onClick={()=>setUpdateFormView(false)}>
                            Close
                        </button>
                    </section>
                </div>
             </div>
        </div>
    );
}

export default TaskManagePanel;