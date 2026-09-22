/**TaskCategoryHeader
 * Task Catgegories page Header
 *  
 */
import TaskCategoriesCarousel from "../../../components/TaskCategoriesCarousel";

const customCarouselData = [
    {name:"Work",description:".....",colorRGB:"rgb(125,125,125)",creatorID:4},
    {name:"Study",description:".....",colorRGB:"rgb(125,125,125)",creatorID:4},
    {name:"Personal",description:".....",colorRGB:"rgb(125,125,125)",creatorID:4},
    {name:"Healthy",description:".....",colorRGB:"rgb(125,125,125)",creatorID:4},
    {name:"Super Market",description:".....",colorRGB:"rgb(125,125,125)",creatorID:4},
    {name:"Car Service",description:".....",colorRGB:"rgb(125,125,125)",creatorID:4},
    {name:"Other",description:".....",colorRGB:"rgb(125,125,125)",creatorID:4},
]

function TaskCategoryHeader({taskCategories,splitSize,sendTheSelectedCategory}){
    const splitArray = (array,split)=>{
        let newSplit = [];
        for(let i=0; i<array.length; i+=split){
            newSplit.push(array.slice(i,i+split));
        }
        return newSplit;
    };
    const splitedCategories = splitArray(customCarouselData,splitSize);

    const handleChangeCategory=(aCat)=>{
        sendTheSelectedCategory(aCat);
    }
    return(
        <div className="w-full flex flex-col justify-between items-start px-[2%] pb-[2%] pt-[3%]">
            <h2 className="font-bold text-lg md:text-xl mt-0">Task Categories</h2>
            <p className="text-xs md:text-sm mt-0">View and manage your task categories.</p>
            <TaskCategoriesCarousel taskCategories={taskCategories} splitSize={splitSize} getTheSelectedCategory={handleChangeCategory}/>
        </div>
    );
}

export default TaskCategoryHeader;