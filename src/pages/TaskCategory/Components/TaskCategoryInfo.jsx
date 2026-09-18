import { useState } from "react";
import { RgbStringColorPicker } from "react-colorful";

function TaskCategoryInfo({taskCategory}){
    const [categoryColor,setCategoryColor] = useState(taskCategory.ColorRGB);
    return(
        <div className="w-full h-full">
            <div className="w-full h-[70vh] overflow-y-auto">
                <section className="w-full flex-1">
                    <label>Category Name:</label>
                    <input type="text" value={taskCategory.Name} 
                     className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body"/>
                </section>
                <section>
                    <label>Category Description:</label>
                    <textarea rows={3} value={taskCategory.Description} 
                     className="min-h-24 max-h-24 md:min-h-32 md:max-h-32 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body"/>
                </section>
                <section>
                    <label>Task Category RGB Color:</label>
                    <input type="text" value={categoryColor} 
                     className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body"
                     readOnly/>
                    <RgbStringColorPicker
                        color={categoryColor}
                        onChange={setCategoryColor}
                    />
                </section>
            </div>
            <div className="flex w-full justify-end gap-2">
                <button>Create</button>
                <button>Update</button>
                <button>Delete</button>
            </div>
        </div>
    )
}
export default TaskCategoryInfo;