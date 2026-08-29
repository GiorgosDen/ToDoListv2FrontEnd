

function PhonePageHeader({iconPath,handleChangeNavVisibility}){
    const showNavMenu = ()=>{
        console.log('Show navigation');
        handleChangeNavVisibility(true);
    }
    return(
        <section className="group w-full h-10 inline-flex items-center justify-start text-gray-600 md:hidden">
            <svg className="w-6 h-6 mr-2 shrink-0 fill-current" 
                viewBox="0 0 24 24" onClick={showNavMenu}>
                <path d={iconPath} />
            </svg>
            <span className="text-black font-bold text-xl sm:text-base">ToDoList v1</span>
        </section>
    );
}

export default PhonePageHeader;