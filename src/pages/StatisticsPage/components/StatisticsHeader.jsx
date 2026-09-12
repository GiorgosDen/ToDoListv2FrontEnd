import { Link } from "react-router-dom";
function StatisticsHeader({completedTasks,totalTasks}){
    return(
        <div className="w-full flex flex-col px-5">
         <section>
                <Link to={"/home"} className="text-sm pr-2 font-semibold text-blue-800 hover:text-blue-950 hover:border-b">
                    &#60; Back
                </Link>
                <hr/>
            </section>
            <section>
                <h2 className="font-bold text-lg md:text-xl mt-0">Statistics</h2>
                <p className="text-xs md:text-sm mt-0">Track your priority and stay on top of your goals.</p>
            </section>
            <br/>
            <section id="headerStatistics" className="flex gap-2">
                <div className="flex flex-col md:gap-3 w-1/3 h-full border hover:border-blue-600 hover:shadow-blue-600 rounded-md shadow-md py-2 px-5 cursor-pointer">
                    <svg className="w-4 h-4 mr-2 shrink-0 fill-current stroke-current text-blue-600 md:w-8 md:h-8 md:p-1 md:border-2 md:border-blue-600 md:rounded-full" 
                        viewBox="0 0 24 24">
                        <path d={"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}
                        fill="currentColor" />
                    </svg>
                    <div>
                        <p className="text-xs md:text-sm">Completed Tasks:</p>
                        <label className="font-bold text-md md:text-lg">{completedTasks}</label>
                    </div>
                </div>
                <div className="flex flex-col w-1/3 h-full border hover:border-purple-600 hover:shadow-purple-600 md:gap-3 rounded-md shadow-md py-2 px-5 cursor-pointer">
                    <svg className="w-4 h-4 mr-2 shrink-0 fill-current stroke-current text-purple-600 md:w-8 md:h-8 md:p-1 md:border-2 md:border-purple-600 md:rounded-full" 
                        viewBox="0 0 24 24">
                        <path d={"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"} 
                        fill="currentColor" />
                    </svg>
                    <div>
                        <p className="text-xs md:text-sm">Total Tasks:</p>
                        <label className="font-bold text-md md:text-lg">{totalTasks}</label>
                    </div>
                </div>
                <div className="flex flex-col md:gap-3 w-1/3 h-full border hover:border-green-600 hover:shadow-green-600 rounded-md shadow-md py-2 px-5 cursor-pointer">
                    <svg className="w-4 h-4 mr-2 shrink-0 fill-current stroke-current text-green-600 md:w-8 md:h-8 md:p-1 md:border-2 md:border-green-600 md:rounded-full" 
                        viewBox="0 0 24 24">
                        <path d={"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 19V5h14v14H5zm4-2h2v-4H9v4zm4 0h2V7h-2v10zm4 0h2v-7h-2v7z"} 
                        fill="currentColor" />
                    </svg>
                    <div>
                        <p className="text-xs md:text-sm">Completion Rate:</p>
                        <label className="font-bold text-md md:text-lg">{`${Math.floor(completedTasks/totalTasks*100)}%`}</label>
                    </div>
                </div>
            </section>
            <br/>
        </div>
    );
}

export default StatisticsHeader;