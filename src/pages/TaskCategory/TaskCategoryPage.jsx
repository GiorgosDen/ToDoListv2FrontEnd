import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import taskCatService from "../../services/taskCatService";
import PopUpMessagesList from "../../services/PopUpMessagesList";
import TaskCategoryHeader from "./Components/TaskCategoryHeader";
import TaskCategoryInfo from "./Components/TaskCategoryInfo";
{/**
    header
    categories roulet
    category info
    category add form(popup?) */}

function TaskCategoryPage(){
    const {triggerPopUpMessage} = useOutletContext();
    //Categories carousel Split size (mobile:3, laptop: 2)
    const [splitSize,setSplitSize] = useState(3); 
    //Task Categories hook
    const [taskCategories, setTaskCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({
        id:0,Name:"Selected",Description:"Selected Task Category",ColorRGB:"rgb(125,125,255)",creatorID:null
    });
    //Trigger useEffect state
    const [trigger,setTrigger] = useState(0);

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

        //Handle screen resize
        const handleResize = () => {
        if (window.innerWidth < 768) {
            setSplitSize(3);
        } else {
            setSplitSize(2);
        }
        };

        handleResize();

        // Add event listener for future resizes
        window.addEventListener('resize', handleResize);
        // Cleanup the listener when the component unmounts
        return () => window.removeEventListener('resize', handleResize);
    },[trigger]);

    const handleChangeCategory = (aCategory)=>{
        setSelectedCategory(aCategory);
    }

    const handleActionOnCategory = async(paramsObject)=>{
        try {
            const {actionCode,catID,catData} = paramsObject;
            console.log(catData);
            let results = [];
            if(actionCode===1){
                results = await taskCatService.createTaskCategory(catData);
            }else if(actionCode===2){
                results = await taskCatService.updateTaskCategory(catID,catData);
            }else{
                results = await taskCatService.deleteTaskCategory(catID);
            }
            
            if(results.message){
                //Shows a popup (the response message is equals to a status message)
                const matchedError = PopUpMessagesList.find(mess => mess.status === results.message);
                triggerPopUpMessage(matchedError);
                setTrigger(tr=>tr+=1);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return(
        <div className="w-full h-screen px-5 flex flex-col overflow-hidden">
            <div className="w-full shrink-0 sticky top-0 z-10">
                <TaskCategoryHeader taskCategories={taskCategories} splitSize={splitSize} sendTheSelectedCategory={handleChangeCategory}/>
            </div>
            <div className="w-full flex-1 overflow-y-auto min-h-0">
                <TaskCategoryInfo taskCategory={selectedCategory} sendActionData={handleActionOnCategory}/>
            </div>
        </div>
    );
}

export default TaskCategoryPage;