function CompletedTaskMenu({handleChangeViewMode,tasksCount, completedTaskCount}){
    const setViewMode = ()=>{
        handleChangeViewMode("completed");
    }
    return(
        <div className="w-full pt-1 px-3 flex flex-row justify-between items-center py-2 md:py-5">
          <p className="text-xs md:text-sm lg:text-md text-gray-400 cursor-pointer">{completedTaskCount} of {tasksCount} tasks is completed</p>
          <a onClick={setViewMode} className='text-sm md:text-sm lg:text-md text-blue-800 cursor-pointer'>View Completed &gt;</a>
        </div>
    );
}

export default CompletedTaskMenu;