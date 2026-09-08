import { useState } from "react";

function MainHeader({helloMessage,userName}){
    const [showDropDown, setShowDropDown] = useState(false);
    const [sortBy, setSortBy] = useState('Time');
    return( 
        <div className="flex flex-row justify-between items-end px-[2%] pb-[5%] pt-[3%]">
            <section>
                <h2 className="font-bold text-lg md:text-xl mt-0">{helloMessage}, {userName}!!! <span>&#128075;</span></h2>
                <p className="text-xs md:text-sm mt-0">Here your tasks for today.</p>
            </section>
            <section>
                <div className="relative">
                <button onClick={()=>setShowDropDown(showDropDown?false:true)}className="inline-flex items-center justify-start text-gray-600 border-b border-transparent hover:border-b-gray-600 text-sm md:text-lg mr-5">
                    {`Sort by ${sortBy}`}
                    <svg className="stroke-current fill-none stroke-2 w-4 h-4 ml-1 shrink-0" 
                    viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </button>
                <div className={`${showDropDown?'block':'hidden'} absolute z-10 bg-white border border-default-medium rounded-base shadow-lg w-44`}>
                    <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton">
                        <li onClick={()=>{setShowDropDown(false); setSortBy('Time');}} className="py-1 px-2 rounded-md text-sm md:text-md text-gray-600 hover:text-white hover:bg-blue-600 cursor-pointer">Time</li>
                        <li onClick={()=>{setShowDropDown(false); setSortBy('State');}} className="py-1 px-2 rounded-md text-sm md:text-md text-gray-600 hover:text-white hover:bg-blue-600 cursor-pointer">State</li>
                    </ul>
                </div>
                </div>
            </section>
        </div>
    );
}

export default MainHeader;