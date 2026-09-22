import { useEffect, useState } from "react";
import { RgbStringColorPicker } from "react-colorful";

function TaskCategoryInfo({taskCategory,sendActionData}){
    //Import Data Hooks
    const [categoryName, setCategoryName] = useState(taskCategory.Name);
    const [categoryDescription, setCategoryDescription] = useState(taskCategory.Description);
    const [categoryColor,setCategoryColor] = useState(taskCategory.ColorRGB);
    //Enable update button hook
    const [enableUpdateButton, setEnableUpdateButton] = useState(false);

    useEffect(()=>{
        setCategoryName(taskCategory.Name);
        setCategoryDescription(taskCategory.Description);
        setCategoryColor(taskCategory.ColorRGB);
        setEnableUpdateButton(false);
    },[taskCategory]);

    const handleUpdateButtonEnable = (aBoolean)=>{
        //If it is a user's category 
        if(taskCategory.creatorID){
            setEnableUpdateButton(aBoolean);
        }
    }

    const handleTaskCategoryCUD=(code)=>{
        //Input: code, an integer (1:create,2:update,3:delete)
        //Output: {actionCode,formData}
        if(taskCategory.creatorID){
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
        <div className="w-full h-full">
            <div className="w-full md:grid md:grid-cols-2 md:gap-20">
                <div>
                    <section className="w-full">
                        <label>Category Name:</label>
                        <input type="text" value={categoryName}
                         onChange={(name)=>{setCategoryName(name.target.value); handleUpdateButtonEnable(true);}} 
                         className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body"/>
                    </section>
                    <section className="w-full">
                        <label>Category Description:</label>
                        <textarea rows={3} value={categoryDescription}
                         onChange={(des)=>{setCategoryDescription(des.target.value); handleUpdateButtonEnable(true);}}
                         className="min-h-24 max-h-24 md:min-h-32 md:max-h-32 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body"/>
                    </section>
                </div>
                <section className="w-full flex flex-col gap-4">
                    <label>Task Category RGB Color:</label>
                    <input type="text" value={categoryColor}
                     onChange={(color)=>{setCategoryColor(color.target.value);}}
                     className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body"
                     readOnly/>
                    <RgbStringColorPicker
                        color={categoryColor}
                        onChange={(e)=>{setCategoryColor(e); handleUpdateButtonEnable(true);}}
                    />
                </section>
            </div>

            <div className="flex w-full justify-end gap-2 pt-5 pb-10 md:pr-20">
                <button className="font-semibold text-white bg-blue-700 py-1 px-3 rounded-lg hover:bg-blue-800 shadow-sm"
                 onClick={()=>handleTaskCategoryCUD(1)}>Create
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