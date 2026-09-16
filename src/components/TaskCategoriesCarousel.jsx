/**TaskCategoryHeader
 * Task Catgegories page Header
 *  
 */
import { useState } from "react";


function TaskCategoriesCarousel({taskCategories,splitSize,getTheSelectedCategory}){
    //Change Category Button hook
    const [activeButtonId, setActiveButtonId] = useState(-1);//if user doesn't select a category
    const splitArray = (array,split)=>{
        let newSplit = [];
        for(let i=0; i<array.length; i+=split){
            newSplit.push(array.slice(i,i+split));
        }
        return newSplit;
    };
    const splitedCategories = splitArray(taskCategories,splitSize);

    //Function to make a RGB color more darken
    const changeRGBDarken = (rgbCode,percentage)=>{
        //Extract the rgb codes (0-255) as strings
        let individualStrNumbers = rgbCode.match(/\d+,\s*\d+,\s*\d+/);
        //If returns null set the returned color as black
        if(!individualStrNumbers)return "rgb(0,0,0)";
        //Extract the colors as numbers
        let [red,green,blue] = individualStrNumbers[0].split(",").map(Number);

        const factor = 1 - percentage/100;
        //calculate new color code (current color-percen% with 0 floor )
        red = Math.max(0,Math.floor(red*factor));
        green = Math.max(0,Math.floor(green*factor));
        blue = Math.max(0,Math.floor(blue*factor));

        //console.log(`${rgbCode} => rgb(${red},${green},${blue})`);
        return `rgb(${red},${green},${blue})`;
    }
    const handleChangeCategory = (aCat)=>{
        getTheSelectedCategory(aCat);
    }
    return(
        <div className="w-full flex rounded-xl gap-2 overflow-x-auto">
            {
                splitedCategories.map((team, indexTeam)=>(
                    <section key={indexTeam} className="w-full md:w-1/4 flex flex-col gap-1 border">{
                        team.map((cat)=> 
                            <button type="button" key={cat.id} id={cat.id} 
                                    style={{
                                        backgroundColor: activeButtonId === cat.id ? cat.ColorRGB : 'transparent',
                                        color: changeRGBDarken(cat.ColorRGB, 50),
                                        borderColor: activeButtonId === cat.id 
                                            ? changeRGBDarken(cat.ColorRGB, 50) 
                                            : changeRGBDarken(cat.ColorRGB, 20)
                                    }}
                                className="flex hover:bg-opacity-30 py-1 px-2 border rounded-2xl transition-colors"
                                onClick={(e) => { setActiveButtonId(cat.id); handleChangeCategory(cat);}}
                                >
                                <svg className="w-4 h-6 mr-1 shrink-0 fill-current stroke-current" viewBox="0 0 24 24">
                                    <path d="M3 10.5L12 3l9 7.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10 5z M10 21v-4a2 2 0 0 1 4 0v4" fill="currentColor" />
                                </svg>
                                <span>{cat.Name}</span>
                            </button>
                        )
                    }
                    </section>
                ))
            }
        </div>
    );
}

export default TaskCategoriesCarousel;