import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

{/**Task JSON Form:
    id:,
    state:in Progress/Completed/Expired,
    name:"",
    description:"",
    date:(today's date),
    time:"hh:mm",
    reminder: 0,
    category: "Work"/"..."/"Other" 

  **Notes:
    1. The data that plays an active role is: Tasks's Name, Time and Category
    2. The Reminder saves a number for the minutes (example, 1 hour -> 60)
    3. Excluding active role data, the rest is store with default values 
    4. In future updates, the form will be fully functional
    5. All tasks are saved in localstorage as a list with key "tasks"
    6. To pass a task ID property, a Count (keyname:'count') that is saved in localstorage is used
    7. The count increased with task creation by 1. So represents all tasks created in the usage app history
*/}

function AddTaskForm(){
    
    //Hide error messages hooks
    const [taskNameError, setTaskNameError] = useState('hidden');
    const [taskCategoryError, setTaskCategoryError] = useState('hidden');
    const [taskTimeError, setTaskTimeError] = useState('hidden');
    //Imported data hooks
    const [taskName,setTaskName] = useState('');
    const [taskCategory,setTaskCategory] = useState('');
    const [taskTime, setTaskTime] = useState('');
    const [taskReminder, setTaskReminder] = useState(0);//Not availiable in current version
    //Change Category Button hook
    const [activeButtonId, setActiveButtonId] = useState(-1);//if user doesn't select a category
    
    //Navigate
    const navigate = useNavigate();

    //Handle Category choice
    //Handle create task
    const createNewTask = ()=>{
        //Controll imported data
        
        //Refresh form's warning messages
        let conditions = 0;
        setTaskNameError('hidden');
        setTaskTimeError('hidden');
        setTaskCategoryError('hidden');

        //Evaluate imported data
        //1.Task Name
        taskName.length>0?conditions+=1:setTaskNameError('');
        //2. Task Time
        taskTime.length>0?conditions+=1:setTaskTimeError('');
        //3. Task Category
        activeButtonId!==-1?conditions+=1:setTaskCategoryError('');

        //Get the today's date
        const newDate = new Date();
        const todayDate = newDate.toLocaleDateString();

        //Accept or Reject new Task creation
        if(conditions===3){
            //Get the localstorage count
            const currentCount = localStorage.getItem("count") 
                ? JSON.parse(localStorage.getItem("count")) 
                : 0;
            //Create new Task object
            const newTask ={
                id:currentCount,
                state:"in Progress",
                name:taskName,
                description: "",
                date:todayDate,
                time:taskTime,
                reminder:0,
                category:taskCategory
            }
            //console.log(newTask);

            //Import tasks list from localstorage
            const existedTasks = localStorage.getItem('tasks')? JSON.parse(localStorage.getItem('tasks')): [];
            //Push new task
            existedTasks.push(newTask);
            //Save tasks and count in localstorage
            localStorage.setItem("tasks",JSON.stringify(existedTasks));
            localStorage.setItem("count", JSON.stringify(currentCount + 1));
            //console.log("New task are saved");
            //Navigate to home page
            navigate("/home");
        }else{
            console.log("Unvalid Data / Create new Task fail");
        }
    }

    return(
        <div className="h-[80vh] md:h-96 overflow-y-auto flex flex-col px-5">
        <hr/>
        {/*Task Information (Name* & Description) Area*/}
        <div className="flex flex-col py-2">
            <label className="text-lg md:text-xl font-semibold">Task Information</label>
            <label className="text-base md:text-lg">Task Name <span className="text-red-700 text-xs md:text-sm font-bold">* <span className={taskNameError}>Add a Task Name</span></span></label>
            <input type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-[1.5%] py-[1.7%] shadow-xs placeholder:text-body" 
            placeholder="Enter task name..." required value={taskName} onChange={(name)=>setTaskName(name.target.value)}/>
            <label className="text-base md:text-lg">Description</label>
            <textarea rows="4" className="min-h-24 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" placeholder="Write additional details..."></textarea>
        </div>
        <hr/>
        {/*Task Schedule (Date, Time, Reminder) Area*/}
        <label className="text-lg md:text-xl font-semibold">Schedule</label>
        <div id="scheduleForm" className="flex flex-row flex-wrap gap-4 py-2">
            <div id="dateArea" className="w-1/3 flex flex-col">
                <label className="text-base md:text-lg ">Due Date</label>
                <input type="date"/>
            </div>
            <div id="timeArea" className="w-1/3 flex flex-col">
                <label className="text-base md:text-lg ">Time <span className="text-red-700 text-xs md:text-sm font-bold">* <span className={taskTimeError}>Add a Task Time</span></span></label>
                <input type="time" value={taskTime} onChange={(time)=> setTaskTime(time.target.value)}/>
            </div>
            <div id="reminderArea" className="w-1/3 flex flex-col">
                <label className="text-base md:text-lg ">Reminder</label>
                <div>
                    <select value={taskReminder} onChange={(rem)=>setTaskReminder(rem.target.value)}>
                        <option value={0} disabled>Reminder</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={90}>1.5 hour</option>
                    </select>
                </div>
            </div>
        </div>
        <hr/>
        {/*Category Area*/}
            <label className="text-lg md:text-xl font-semibold">Organization</label>
            <label className="text-base md:text-lg">Category<span className="font-bold text-xs md:text-sm text-red-700"> *<span className={`${taskCategoryError}`}>Select a Task Category</span></span></label>
            {/*Work Category Button */}
            <div className="flex flex-row flex-wrap justify-between py-2 gap-1">
                <button type="button" id={0} className={`flex ${activeButtonId===0? 'bg-blue-400':'bg-transparent'} hover:bg-blue-400 hover:bg-opacity-30 text-blue-700 py-1 px-2 border border-blue-500 hover:border-blue-700 rounded-2xl`}
                 onClick={(e)=>{setActiveButtonId(0); setTaskCategory("Work");}}>
                    <svg className="w-4 h-6 mr-1 shrink-0 fill-current stroke-current" 
                        viewBox="0 0 24 24">
                        <path d="M3 10.5L12 3l9 7.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10 5z M10 21v-4a2 2 0 0 1 4 0v4" fill="currentColor" />
                    </svg>
                <span>Work</span>
            </button>
            {/*Personal Category Button */}
            <button type="button" id={1} className={`flex ${activeButtonId===1?'bg-purple-400':'bg-transparent'} hover:bg-purple-400 hover:bg-opacity-30 text-purple-700 py-1 px-2 border border-purple-500 hover:border-purple-700 rounded-2xl`}
             onClick={(e)=>{setActiveButtonId(1); setTaskCategory("Personal");}}>
                <svg className="w-4 h-6 mr-1 shrink-0 fill-current stroke-current" 
                    viewBox="0 0 24 24">
                    <path d="M3 10.5L12 3l9 7.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10 5z M10 21v-4a2 2 0 0 1 4 0v4" fill="currentColor" />
                </svg>
            <span>Personal</span>
            </button>
            {/*Health Category Button */}
            <button type="button" id={2} className={`flex ${activeButtonId===2?'bg-green-400':'bg-transparent'} hover:bg-green-400 hover:bg-opacity-30 text-green-700 py-1 px-2 border border-green-500 hover:border-green-700 rounded-2xl`}
             onClick={(e)=>{setActiveButtonId(2); setTaskCategory("Health");}}>
                <svg className="w-4 h-6 mr-1 shrink-0 fill-current stroke-current" 
                    viewBox="0 0 24 24">
                    <path d="M3 10.5L12 3l9 7.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10 5z M10 21v-4a2 2 0 0 1 4 0v4" fill="currentColor" />
                </svg>
            <span>Health</span>
            </button>
            {/*Study Category Button */}
            <button type="button" id={3} className={`flex ${activeButtonId===3?'bg-orange-400':'bg-transparent'} hover:bg-orange-400 hover:bg-opacity-30 text-orange-700 py-1 px-2 border border-orange-500 hover:border-orange-700 rounded-2xl`}
             onClick={(e)=>{setActiveButtonId(3); setTaskCategory("Study");}}>
                <svg className="w-4 h-6 mr-1 shrink-0 fill-current stroke-current" 
                    viewBox="0 0 24 24">
                    <path d="M3 10.5L12 3l9 7.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10 5z M10 21v-4a2 2 0 0 1 4 0v4" fill="currentColor" />
                </svg>
            <span>Study</span>
            </button>
            {/*Other Category Button */}
            <button type="button" id={4} className={`flex ${activeButtonId===4?'bg-gray-400':'bg-transparent'} hover:bg-gray-400 hover:bg-opacity-30 text-gray-700 py-1 px-2 border border-gray-500 hover:border-gray-700 rounded-2xl`}
             onClick={(e)=>{setActiveButtonId(4); setTaskCategory("Other");}}>
                <svg className="w-4 h-6 mr-1 shrink-0 fill-current stroke-current" 
                    viewBox="0 0 24 24">
                    <path d="M3 10.5L12 3l9 7.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10 5z M10 21v-4a2 2 0 0 1 4 0v4" fill="currentColor" />
                </svg>
            <span>Other</span>
            </button>
            </div>
        {/*Submit or Quit Area*/}
        <hr/>
            <div className="flex justify-end p-2 gap-4">
                <Link to={"/home"}>
                <button type="button" className="bg-transparent hover:bg-gray-400 hover:bg-opacity-30 text-gray-700 py-1 px-2 border border-gray-500 hover:border-gray-700 rounded">
                    Cancel
                </button>
                </Link>
                <button className="bg-blue-500 hover:bg-blue-700 text-sm text-white px-2 py-2 rounded"
                onClick={createNewTask}>
                    + Create Task
                </button>
            </div>
    </div>

    );
}

export default AddTaskForm;