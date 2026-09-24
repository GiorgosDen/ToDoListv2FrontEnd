import { useEffect, useState } from "react";
import taskPriorityService from "../../services/taskPriorityService";

function PrioritiesPage(){
    const [taskPriorities,setTaskPriorities] = useState([]);

    useEffect(()=>{
        const getTaskPriorities = async()=>{
            try {
                const results = await taskPriorityService.getTaskPriorities();
                if(results){
                    setTaskPriorities(results);
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        getTaskPriorities();
    },[]);

    return(
        <div className="w-full h-full flex flex-col gap-4 py-5 px-5">
            <section>
                <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Task Priorities</h1>
                <p className="text-xs md:text-sm lg:text-md">See tasks priorities.</p>
                <hr/>
            </section>
            <div className="w-full flex flex-col gap-4 pb-5">
                {
                    taskPriorities.map((priority,index)=>{
                        return (<section key={index} className="w-full flex flex-col gap-2">
                            <div className="w-full flex">
                                <svg className="w-6 h-6 md:h-12 md:w-12 lg:w-16 lg:h-16 mr-2 shrink-0 fill-current stroke-current text-blue-600" 
                                    viewBox="0 0 24 24">
                                    <path d={"M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z"} fill="currentColor"/>
                                </svg>
                                <h2 className="font-semibold text-md md:text-lg lg:text-xl">{priority.Name}</h2>
                            </div>
                            <p className="text-md md:text-lg lg:text-xl py-2 px-5 border">{priority.Description}</p>
                        </section>);
                    })
                }
            </div>
        </div>
    );
}

export default PrioritiesPage;