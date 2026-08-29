
//Parameter aTask: task JSON object 
function TaskInfoPanel({aTask}){
    return(
        <div className="flex flex-col  justify-start gap-2">
            <label className="font-semibold text-lg md:text-xl">Task Information</label>
            <label className="text-base md:text-lg">Name</label>
            <input type="text" value={aTask.name} className="bg-neutral-secondary-medium text-gray-700 border border-default-medium text-heading text-sm md:text-sm rounded-base block w-full px-[1.5%] py-[1.7%] shadow-xs" 
             disabled readOnly/>
            <label className="text-base md:text-lg">Description</label>
            <textarea rows="4" className="h-16 text-gray-700 bg-neutral-secondary-medium border border-default-medium text-heading text-xs md:text-sm rounded-base" defaultValue={"This version doesn't support task description..."} disabled readOnly/>
            <label className="text-base md:text-lg">Category</label>
            <button className="w-1/3 bg-transparent border text-gray-700 border-gray-500 py-1 px-2 rounded-2xl" disabled>{aTask.category}</button>
            <label className="text-base md:text-lg">Schedule</label>
            <div className="flex justify-between gap-2">
                <input type="text" value={aTask.date} className="bg-neutral-secondary-medium text-gray-700 border border-default-medium text-heading text-xs md:text-sm rounded-base block w-full px-[1.5%] py-[1.7%] shadow-xs" disabled readOnly/>
                <input type="text" value={aTask.time} className="bg-neutral-secondary-medium text-gray-700 border border-default-medium text-heading text-xs md:text-sm rounded-base block w-full px-[1.5%] py-[1.7%] shadow-xs" disabled readOnly/>
            </div>
        </div>
    );

}

export default TaskInfoPanel;