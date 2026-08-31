import { useNavigate, Link } from "react-router-dom";
import taskService from "../../../services/taskService";

//Panel to Update (in future versions) and Delete task
function TaskManagePanel({taskID}){
    const navigate = useNavigate();
    const deleteTask = async()=>{
        const deleteStat = await taskService.deleteTaskByID(taskID);
        if(deleteStat==200){
            navigate("/home");
        }
    }

    return(
        <div className="flex justify-end gap-2 pt-2">
            <Link to={"/home"}>
                <button type="button" className="bg-transparent hover:bg-gray-400 hover:bg-opacity-30 text-gray-700 py-1 px-2 border border-gray-500 hover:border-gray-700 rounded">
                    Return
                </button>
            </Link>
            <button className="font-semibold text-white bg-red-700 py-1 px-3 rounded-lg hover:bg-red-800 shadow-sm"
             onClick={deleteTask}>Delete</button>
        </div>
    );
}

export default TaskManagePanel;