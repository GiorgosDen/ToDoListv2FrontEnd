import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import taskCatService from "../../../services/taskCatService";
import taskService from "../../../services/taskService";

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
    //Get the today's date
    const newDate = new Date();
    const todayDate = newDate.toLocaleDateString('en-CA');
    const todayTime = newDate.toLocaleTimeString('en-GB',{ 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    });
    //console.log(`${todayDate} ${todayTime}`);
    //Task Categories hook
    const [taskCategories, setTaskCategories] = useState([]);
    //Hide error messages hooks
    const [taskNameError, setTaskNameError] = useState('hidden');
    const [taskCategoryError, setTaskCategoryError] = useState('hidden');
    const [taskTimeError, setTaskTimeError] = useState('hidden');
    const [taskDateError, setTaskDateError] = useState('hidden');
    const [taskReminderError, setTaskReminderError] = useState('hidden');
    //Imported data hooks
    const [taskName,setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskCategory,setTaskCategory] = useState('');
    const [taskTime, setTaskTime] = useState(todayTime);
    const [taskDate, setTaskDate] = useState(todayDate);
    const [taskReminder, setTaskReminder] = useState(0);
    //Change Category Button hook
    const [activeButtonId, setActiveButtonId] = useState(-1);//if user doesn't select a category
    
    //Navigate
    const navigate = useNavigate();

    //Handle Category choice
    //Handle create task
    const createNewTask =async ()=>{
        //Controll imported data
        
        //Refresh form's warning messages
        let conditions = 0;
        setTaskNameError('hidden');
        setTaskTimeError('hidden');
        setTaskCategoryError('hidden');
        setTaskDateError('hidden');
        setTaskReminderError('hidden');

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
            const newTask ={
                "name":taskName,
                "taksDescription": taskDescription,
                "DateTime":`${todayDate}T${todayTime}`,
                "category":taskCategory,
                "state":1,
                "priority":1,
                "reminder":taskReminder,
                "repeat": 0
            }
            console.log(newTask);
            //Create the new task
            const result = await taskService.createNewTask(newTask);
            //console.log(result);
            //If everything is ok, return a message
            if(result.message) navigate("/home");
        }else{
            console.log("Unvalid Data / Create new Task fail");
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

    //Function to make a RGB color more darken
    const changeRGBDarken = (rgbCode,percentage)=>{
        //Extract the rgb codes (0-255) as strings
        let individualStrNumbers = rgbCode.match(/\d+,\s*\d+,\s*\d+/);
        //If returns null set the returned color as black
        if(!individualStrNumbers)return "rgb(0,0,0)";
        //Extract the colors as numbers
        let [red,green,blue] = individualStrNumbers[0].split(",").map(Number);

        const factor = 1 - percentage/100;
        //calculate new color code (current color-percen% with 0 floor )
        red = Math.max(0,Math.floor(red*factor));
        green = Math.max(0,Math.floor(green*factor));
        blue = Math.max(0,Math.floor(blue*factor));

        //console.log(`${rgbCode} => rgb(${red},${green},${blue})`);
        return `rgb(${red},${green},${blue})`;
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
            <textarea rows="4" className="min-h-24 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" placeholder="Write additional details..."
             value={taskDescription} onChange={(des)=>setTaskDescription(des.target.value)}></textarea>
        </div>
        <hr/>
        {/*Task Schedule (Date, Time, Reminder) Area*/}
        <label className="text-lg md:text-xl font-semibold">Schedule</label>
        <div id="scheduleForm" className="flex flex-row flex-wrap gap-4 py-2">
            <div id="dateArea" className="w-1/3 flex flex-col">
                <label className="text-base md:text-lg ">Due Date <span className="text-red-700 text-xs md:text-sm font-bold">* <span className={taskDateError}>Select a valid Date</span></span></label>
                <input type="date" min={todayDate} value={taskDate} onChange={(date)=>setTaskDate(date.target.value)}/>
            </div>
            <div id="timeArea" className="w-1/3 flex flex-col">
                <label className="text-base md:text-lg ">Time <span className="text-red-700 text-xs md:text-sm font-bold">* <span className={taskTimeError}>Add a Task Time</span></span></label>
                <input type="time" value={taskTime} onChange={(time)=> setTaskTime(time.target.value)}/>
            </div>
            <div id="reminderArea" className="w-1/3 flex flex-col">
                <label className="text-base md:text-lg ">Reminder <span className="text-red-700 text-xs md:text-sm font-bold">* <span className={taskReminderError}>Add a Task Time</span></span></label>
                <div>
                    <select value={taskReminder} onChange={(rem)=>setTaskReminder(Number(rem.target.value))}>
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
            <div className="flex flex-row flex-wrap justify-between py-2 gap-1">
                {
                    //Create Category buttons dynamicaly
                    taskCategories.map(cat=> 
                        <button type="button" key={cat.id} id={cat.id} 
                                style={{
                                    backgroundColor: activeButtonId === cat.id ? cat.ColorRGB : 'transparent',
                                    color: changeRGBDarken(cat.ColorRGB, 50),
                                    borderColor: activeButtonId === cat.id 
                                        ? changeRGBDarken(cat.ColorRGB, 50) 
                                        : changeRGBDarken(cat.ColorRGB, 20)
                                }}
                            className="flex hover:bg-opacity-30 py-1 px-2 border rounded-2xl transition-colors"
                            onClick={(e) => { setActiveButtonId(cat.id); setTaskCategory(cat.id); }}
                            >
                            <svg className="w-4 h-6 mr-1 shrink-0 fill-current stroke-current" viewBox="0 0 24 24">
                                <path d="M3 10.5L12 3l9 7.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10 5z M10 21v-4a2 2 0 0 1 4 0v4" fill="currentColor" />
                            </svg>
                            <span>{cat.Name}</span>
                        </button>
                    )
                }
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