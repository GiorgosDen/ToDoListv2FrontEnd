import { useEffect, useState } from "react";
import { RgbStringColorPicker } from "react-colorful";

function TaskCategoryInfo({taskCategory,sendActionData}){
    //Import Data Hooks
    const [categoryName, setCategoryName] = useState(taskCategory.Name);
    const [categoryDescription, setCategoryDescription] = useState(taskCategory.Description);
    const [categoryColor,setCategoryColor] = useState(taskCategory.ColorRGB);
    //Enable update button hook
    const [enableUpdateButton, setEnableUpdateButton] = useState(false);
    //Create button clicks counter (resterts every time that selected category changes)
    const [createButtonClicks, setcreateButtonClicks] = useState(0);

    useEffect(()=>{
        setCategoryName(taskCategory.Name);
        setCategoryDescription(taskCategory.Description);
        setCategoryColor(taskCategory.ColorRGB);
        setEnableUpdateButton(false);
        setcreateButtonClicks(false);
    },[taskCategory]);

    const handleCreateButtonClickCounter = (aBoolean)=>{
        aBoolean?setcreateButtonClicks(pr=>pr+=1):setcreateButtonClicks(0);
    }
    const handleUpdateButtonEnable = (aBoolean)=>{
        //If it is a user's category 
        if(taskCategory.creatorID){
            setEnableUpdateButton(aBoolean);
        }
    }

    const handleTaskCategoryCUD=(code)=>{
        //Input: code, an integer (1:create,2:update,3:delete)
        //Output: {actionCode,formData}
        if(taskCategory.creatorID || createButtonClicks>0){
            const updatedData={
                Name:categoryName,
                Description:categoryDescription,
                ColorRGB:categoryColor
            }

            sendActionData({
                actionCode:code,
                catID: taskCategory.id,
                catData:updatedData
            });
        }
    }    

    return(
        <div className="w-full h-full px-2">
            <div className="w-full md:grid md:grid-cols-2 md:gap-20">
                <div className="flex md:gap-5 flex-col">
                    <section className="w-full flex flex-col gap-2">
                        <label>Category Name:</label>
                        <input type="text" value={categoryName}
                         onChange={(name)=>{setCategoryName(name.target.value); handleUpdateButtonEnable(true);}} 
                         className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"/>
                    </section>
                    <section className="w-full  flex flex-col gap-2">
                        <label>Category Description:</label>
                        <textarea rows={3} value={categoryDescription}
                         onChange={(des)=>{setCategoryDescription(des.target.value); handleUpdateButtonEnable(true);}}
                         className="min-h-24 max-h-24 md:min-h-32 md:max-h-32 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"/>
                    </section>
                </div>
                <section className="w-full flex flex-col gap-2">
                    <label>Task Category RGB Color:</label>
                    <input type="text" value={categoryColor}
                     onChange={(color)=>{setCategoryColor(color.target.value);}}
                     className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                     readOnly/>
                    <RgbStringColorPicker
                        color={categoryColor}
                        onChange={(e)=>{setCategoryColor(e); handleUpdateButtonEnable(true);}}
                    />
                </section>
            </div>

            <div className="flex w-full justify-end gap-2 pt-5 pb-10 md:pr-20">
                <button className={`font-semibold text-white ${createButtonClicks>0?'bg-blue-700':'bg-gray-700'} py-1 px-3 rounded-lg ${createButtonClicks>0?'hover:bg-blue-800':'hover:bg-gray-800'} shadow-sm`}
                 onClick={()=>createButtonClicks>0?handleTaskCategoryCUD(1):setcreateButtonClicks(true)}>Create
                </button>
                <button className={`font-semibold text-white ${enableUpdateButton?'bg-blue-300':'bg-gray-300'} py-1 px-3 rounded-lg hover:${enableUpdateButton?'bg-blue-400':'bg-gray-400'} shadow-sm`}
                 onClick={()=>{if(enableUpdateButton)handleTaskCategoryCUD(2);}} disabled={!enableUpdateButton}
                >
                 Update</button>
                <button className="font-semibold text-white bg-red-700 py-1 px-3 rounded-lg hover:bg-red-800 shadow-sm"
                 onClick={()=>handleTaskCategoryCUD(3)}>
                 Delete</button>
            </div>
        </div>
    )
}
export default TaskCategoryInfo;