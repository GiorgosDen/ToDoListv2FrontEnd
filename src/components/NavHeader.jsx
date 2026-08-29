
function NavHeader({handleChangeNavVisibility,iconPath}){
    //Sends false to layout.jsx to hide nav and show main
    const hideNavMenu = ()=>{
        handleChangeNavVisibility(false);
    }
    return(
        <div className="group w-full h-10 inline-flex items-center justify-start text-gray-600 py-[15%]">
            <svg className="w-6 h-6 mr-2 shrink-0 fill-current" 
            viewBox="0 0 24 24" onClick={hideNavMenu}>
                <path d={iconPath} />
            </svg>
            <span className="text-black font-bold text-xl sm:text-base">ToDoList v1</span>
        </div>
    );
}

export default NavHeader;