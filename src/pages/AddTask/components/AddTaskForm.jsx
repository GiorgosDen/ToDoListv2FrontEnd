import { useEffect, useState } from "react";
import { useOutletContext, useLocation, useNavigate } from "react-router-dom";
import taskCatService from "../../../services/taskCatService";
import taskService from "../../../services/taskService";
import TaskCategoriesCarousel from "../../../components/TaskCategoriesCarousel";
import PopUpMessagesList from "../../../services/PopUpMessagesList";

{/**Task JSON Form:
    id: integer -> MySQL: int auto increament,
    state: in Progress/Completed/Expired -> MySQL: (1/2/3),
    name: String -> MySQL: varchar,
    description: String -> MySQL: varchar,
    date & time: String & String -[]->MySQL: timestamp ,
    reminder: None, 30 minutes, 1 hour, 1.5 hour -> MySQL: 0,30,60,90 
    category: "Work"/"..."/"Other"/user's categories -> MySQL: int/category id 

  **Notes:
    1. The Reminder saves a number for the minutes (example, 1 hour -> 60)
    2. A user can create their custom categories
    3. The Reminder hasn't got functional proposal in this version

  **Params:
    1. Action (String): "create"/"update"
    2. aTask (user's Task): null / JSON object {id, Name, ...}
*/}

function AddTaskForm({action,aTask,navigatePath,hidePopUpForm}){
    const {triggerPopUpMessage} = useOutletContext();
    //set Form Action
    const FormActionCreate = action==="create"?true:false;
    
    // Get today's date & time for fallbacks
    const newDate = new Date();
    const todayDate = newDate.toLocaleDateString('en-CA');
    const todayTime = newDate.toLocaleTimeString('en-GB',{ 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    });

    //Task Categories hook
    const [taskCategories, setTaskCategories] = useState([]);
    //Hide error messages hooks
    const [taskNameError, setTaskNameError] = useState('hidden');
    const [taskCategoryError, setTaskCategoryError] = useState('hidden');
    const [taskTimeError, setTaskTimeError] = useState('hidden');
    const [taskDateError, setTaskDateError] = useState('hidden');
    const [taskReminderError, setTaskReminderError] = useState('hidden');
    const [taskPriorityError, setTaskPriorityError] = useState('hidden');
    //Imported data hooks
    const [taskName,setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskCategory,setTaskCategory] = useState('');
    const [taskTime, setTaskTime] = useState(todayTime);
    const [taskDate, setTaskDate] = useState(todayTime);
    const [taskReminder, setTaskReminder] = useState(0);
    const [taskPriority, setTaskPriority] = useState(1);
    //Change Category Button hook
    const [activeButtonId, setActiveButtonId] = useState(-1);//if user doesn't select a category
    
    useEffect(() => {
        console.log("Loaded aTask:", aTask?.DateTime);
        
        if (!FormActionCreate && aTask) {
            setTaskName(aTask.Name || '');
            setTaskDescription(aTask.Description || '');
            setTaskCategory(aTask.Category || '');
            setActiveButtonId(aTask.Category || -1);
            setTaskReminder(aTask.Reminder || 0);
            setTaskPriority(aTask.Priority || 1);

            // Parse formatted date string "DD/MM/YYYY, HH:mm:ss"
            if (aTask.DateTime) {
                const parts = String(aTask.DateTime).match(/(\d+)/g);
                if (parts && parts.length >= 3) {
                    const [day, month, year] = parts;
                    setTaskDate(`${year}-${month}-${day}`);
                }
                if (parts && parts.length >= 5) {
                    const [, , , hours, minutes, seconds = '00'] = parts;
                    setTaskTime(`${hours}:${minutes}:${seconds}`);
                }
            }
        }
    }, [aTask, FormActionCreate]);

    //Navigate & Location
    const navigate = useNavigate();
    const location = useLocation();
    //Handle Category choice
    //Handle create task
    const createUpdateTask =async ()=>{
        //Controll imported data
        
        //Refresh form's warning messages
        let conditions = 0;
        setTaskNameError('hidden');
        setTaskTimeError('hidden');
        setTaskCategoryError('hidden');
        setTaskDateError('hidden');
        setTaskReminderError('hidden');
        setTaskPriorityError('hidden');

        //Evaluate imported data
        //1.Task Name
        taskName.length>0?conditions+=1:setTaskNameError('');
        //2. Date Time (for today's tasks the time must be after the current time)
        (taskDate!=todayDate) || (taskDate==todayDate && taskTime>todayTime)?conditions+=1:setTaskTimeError('');
        //3. Task Category
        activeButtonId!==-1?conditions+=1:setTaskCategoryError('');

        //Accept or Reject new Task creation
        if(conditions===3){
            //Create new Task JSON object
            const ISODate = `${taskDate}T${taskTime}`;
            const timestampMS = new Date(ISODate).getTime();
            const timestampSC = Math.floor(timestampMS / 1000); 
            const newTask ={
                "name":taskName,
                "taskDescription": taskDescription,
                "DateTime":timestampSC,
                "category":taskCategory,
                "state":1,
                "priority":taskPriority,
                "reminder":taskReminder,
                "repeat": 0
            }
            console.log(newTask);
            if(aTask.State===3){
                const matchedError = PopUpMessagesList.find(mess => mess.status === 'update-completed');
                triggerPopUpMessage(matchedError);
            }else{
                //Create the new task or update an existing one
                if(FormActionCreate){
                    const cResult = await taskService.createNewTask(newTask);
                    //If everything is ok, return a message
                    if(cResult.message){
                        const matchedError = PopUpMessagesList.find(mess => mess.status === 'create-task');
                        triggerPopUpMessage(matchedError);
                        navigate("/home");
                    }
                }else{
                    const uResult = await taskService.updateTaskByID(aTask.id,newTask);
                    if(uResult.message) window.location.reload();
                }
            }
        }else{
            console.log("Unvalid Data / Create new or Delete old Task fail");
        }
    }

    //Function to trigger close update popup form (when a user want to update a task)
    const closeUpdatePopUp = ()=>{
        hidePopUpForm(false);
    }

    //Refresh to current page if Action="update"
    const handleFormExit = ()=>{
        if(FormActionCreate){
            navigate(navigatePath);
        }else{
            closeUpdatePopUp();
        }
    }

     //useEffect: Load categories
    useEffect(()=>{
        const taskCategoriesDB = async ()=>{
            try{
                const resCategories = await taskCatService.getTaskCategories();
                //console.log(resCategories);
                if(resCategories){
                    setTaskCategories(resCategories);
                }
            } catch (error) {
                console.log(error);
            }
            };
        taskCategoriesDB();
    },[]);

    const handleCategoryChange = (aCat)=>{
        setActiveButtonId(aCat.id); 
        setTaskCategory(aCat.id);
    }
    return(
        <div className="h-[80vh] md:h-full overflow-y-auto customScrollStyle flex flex-col px-5 bg-white">
        <hr/>
        {/*Task Information (Name* & Description) Area*/}
        <div className="flex flex-col py-2">
            <label className="text-lg md:text-xl font-semibold">Task Information</label>
            <label className="text-base md:text-lg">Task Name <span className="text-red-700 text-xs md:text-sm font-bold">* <span className={taskNameError}>Add a Task Name</span></span></label>
            <input type="text" 
             className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
             placeholder="Enter task name..."
             required 
             value={taskName} 
             onChange={(name)=>setTaskName(name.target.value)}/>
            <label className="text-base md:text-lg">Description</label>
            <textarea rows="4" 
             className="min-h-24 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y" placeholder="Write additional details..."
             value={taskDescription} 
             onChange={(des)=>setTaskDescription(des.target.value)}></textarea>
        </div>
        <hr/>
        {/*Task Schedule (Date, Time, Reminder) Area*/}
        <label className="text-lg md:text-xl font-semibold">Schedule</label>
        <div id="scheduleForm" className="flex flex-row flex-wrap gap-4 py-2">
            <div id="dateArea" className="w-1/3 flex flex-col">
                <label className="text-base md:text-lg ">Due Date <span className="text-red-700 text-xs md:text-sm font-bold">* <span className={taskDateError}>Select a valid Date</span></span></label>
                <input type="date" 
                min={todayDate} 
                value={taskDate} 
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                onChange={(date)=>setTaskDate(date.target.value)}/>
            </div>
            <div id="timeArea" className="w-1/3 flex flex-col">
                <label className="text-base md:text-lg ">Time <span className="text-red-700 text-xs md:text-sm font-bold">* <span className={taskTimeError}>Add a Task Time</span></span></label>
                <input type="time" 
                 value={taskTime} 
                 className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                 onChange={(time)=> setTaskTime(time.target.value)}/>
            </div>
            <div id="reminder-priorityArea" className="w-full flex flex-row flex-wrap gap-8 md:gap-5 py-2">
                <div id="reminderArea" className="w-1/3 flex flex-col gap-1">
                    <label className="text-base md:text-lg ">Reminder <span className="text-red-700 text-xs md:text-sm font-bold">* <span className={taskReminderError}>Add a Task Time</span></span></label>
                    <div>
                        <select 
                        value={taskReminder} 
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                        onChange={(rem)=>setTaskReminder(Number(rem.target.value))}>
                            <option value={0} disabled>Reminder</option>
                            <option value={0}>None</option>
                            <option value={30}>30 minutes</option>
                            <option value={60}>1 hour</option>
                            <option value={90}>1.5 hour</option>
                        </select>
                    </div>
                </div>
                <div id="priorityArea" className="w-1/3 flex flex-col gap-1">
                    <label className="text-base md:text-lg ">Priority <span className="text-red-700 text-xs md:text-sm font-bold">* <span className={taskPriorityError}>Add a Task Time</span></span></label>
                    <div>
                        <select 
                        value={taskPriority} 
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                        onChange={(rem)=>setTaskPriority(Number(rem.target.value))}>
                            <option value={1}>Low</option>
                            <option value={2}>Medium</option>
                            <option value={3}>High</option>
                        </select>
                    </div>
                </div>
            </div>
            
        </div>
        <hr/>
        {/*Category Area*/}
            <label className="text-lg md:text-xl font-semibold">Organization</label>
            <label className="text-base md:text-lg">Category<span className="font-bold text-xs md:text-sm text-red-700"> *<span className={`${taskCategoryError}`}>Select a Task Category</span></span></label>
            <div className="flex flex-row flex-wrap justify-between py-2 gap-1">
                {/*Custom Category Carousel Component */}
                <TaskCategoriesCarousel taskCategories={taskCategories} splitSize={3} getTheSelectedCategory={handleCategoryChange}/>
            </div>
        {/*Submit or Quit Area*/}
        <hr/>
            <div className="flex justify-end p-2 gap-4">
                <button type="button" className="bg-transparent hover:bg-gray-400 hover:bg-opacity-30 text-gray-700 py-1 px-2 border border-gray-500 hover:border-gray-700 rounded"
                 onClick={handleFormExit}>
                    Cancel
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-sm text-white px-2 py-2 rounded"
                 onClick={createUpdateTask}>
                    {FormActionCreate?'+ Create Task':'Update'}
                </button>
            </div>
    </div>

    );
}

export default AddTaskForm;