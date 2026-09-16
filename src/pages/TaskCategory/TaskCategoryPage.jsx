import { useState, useEffect } from "react";
import taskCatService from "../../services/taskCatService";
import TaskCategoryHeader from "./Components/TaskCategoryHeader";
import TaskCategoryInfo from "./Components/TaskCategoryInfo";
{/**
    header
    categories roulet
    category info
    category add form(popup?) */}

function TaskCategoryPage(){
    //Categories carousel Split size (mobile:3, laptop: 2)
    const [splitSize,setSplitSize] = useState(3); 
    //Task Categories hook
    const [taskCategories, setTaskCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({
        id:0,Name:"Selected",Description:"Selected Task Category",ColorRGB:"rgb(125,125,255)",creatorID:null
    });
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
    },[]);

    const handleChangeCategory = (aCategory)=>{
        setSelectedCategory(aCategory);
    }

    return(
        <div className="w-full px-5 ">
            <TaskCategoryHeader taskCategories={taskCategories} splitSize={splitSize} sendTheSelectedCategory={handleChangeCategory}/>
            <div className="overflow-y-scroll">
                <TaskCategoryInfo taskCategory={selectedCategory}/>
            </div>
        </div>
    );
}

export default TaskCategoryPage;