import { useState } from "react";
import { RgbStringColorPicker } from "react-colorful";

function TaskCategoryInfo({taskCategory}){
    const [categoryColor,setCategoryColor] = useState(taskCategory.ColorRGB);
    return(
        <div className="w-full h-full flex-1 md:flex md:flex-wrap">
            <div className="w-full md:w-1/2">
                <div className="w-full flex flex-col">
                    <label>Category Name:</label>
                    <input type="text" value={taskCategory.Name} readOnly/>
                </div>
                <div className="w-full flex flex-col">
                    <label>Category Description:</label>
                    <textarea rows={3} value={taskCategory.Description} readOnly/>
                </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col">    
                <label>Task Category RGB Color:</label>
                <input type="text" value={categoryColor} readOnly/>
                <RgbStringColorPicker
                    color={categoryColor}
                    onChange={setCategoryColor}
                />
            </div>

            <div className="flex w-full justify-end">
                <button>Create</button>
                <button>Update</button>
                <button>Delete</button>
            </div>
        </div>
    )
}
export default TaskCategoryInfo;