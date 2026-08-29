function CompletedTaskMenu({tasksCount, completedTaskCount}){
    return(
        <div className='w-full pt-1 px-3 flex flex-row justify-between items-center text-xs text-gray-400'>
          <p>{completedTaskCount} of {tasksCount} tasks is completed</p>
          <a className='text-sm text-blue-800'>View Completed &gt;</a>
        </div>
    );
}

export default CompletedTaskMenu;