
function TaskInfoHeader(){
    return(
        <div className="flex flex-col gap-1">
            <label className="font-bold text-xl md:text-2xl">Task Info</label>
            <label className="text-xs md:text-md text-gray-600">View and Manage Task</label>
            <hr/>
        </div>
    );
}

export default TaskInfoHeader;