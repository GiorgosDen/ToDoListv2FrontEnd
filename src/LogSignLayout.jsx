//Log In & Sign Up pages Layout
//Contains the left split - screen (brand, message and svg image)

import { Outlet } from "react-router-dom";

function LogSignLayout(){
    return(
        <>
           <div className="w-full h-full border-2 rounded-lg shadow-sm flex flex-col md:flex-row md:col-start-1 md:col-end-3">
                {/*Stable Log In & Sing Up pages site*/}
                <div id="imageArea" className="hidden md:flex md:flex-col md:z-0 md:bg-[rgb(240,244,255)] md:rounded-l-lg md:px-14 md:w-1/2">
                    <div className="md:group md:w-full md:h-10 md:inline-flex md:items-center md:justify-start md:text-gray-600 md:py-[10%]">
                        <svg className="w-6 h-6 mr-2 shrink-0 fill-current" 
                        viewBox="0 0 24 24">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M9 12l2 2 4-4 M9 18h6" />
                        </svg>
                        <span className="text-black font-bold text-xl">ToDoList v1</span>
                    </div>
                    <div className="md:w-2/4 md:flex md:flex-col">
                        <label className="font-bold text-xl">Stay Organized, reach the success!!</label>
                        <label className="font-semibold text-md">Plan your day, set goals - all in one place</label>
                    </div>
                    <div className=" w-96 h-64 px-5">
                        <svg viewBox="90 20 100 75" className="w-full h-full">
                            <image href="./splitImg.svg" width="220" height="95"/>
                        </svg>
                    </div>
                </div>
                {/*Form split-screen (outlet) */}
                <div id="loginFormArea" className="overflow-y-auto z-10 w-full h-full bg-[rgba(235, 240, 250)] md:bg-[rgb(255,255,255)] rounded-lg md:rounded-r-lg flex flex-col  px-14 py-3 gap-4">
                    <Outlet/>
                    {/*Image that shows at bottom area when a phone device is used*/}
                    <div className="w-full h-full py-5 md:hidden">
                        <img src="./splitImg.svg" className="w-full h-auto object-contain"/>
                    </div>
                </div>
           </div>
        </>
    );
}

export default LogSignLayout;