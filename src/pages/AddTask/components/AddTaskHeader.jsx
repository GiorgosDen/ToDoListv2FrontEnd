import { Link } from "react-router-dom";

function AddTaskHeader(){
    return(
    <div className="pb-2 px-5">
        <Link to={"/home"} className="text-sm pr-2 font-semibold text-blue-800 hover:text-blue-950 hover:border-b">
             Back
        </Link>
        <p className="text-xl md:text-2xl font-bold">Add New Task</p>
        <p className="text-xs md:text-sm text-gray-300">Create a new task and organize your schedule.</p>
    </div>
    );
}

export default AddTaskHeader;