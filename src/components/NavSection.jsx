
function NavSection({onClickSection,sectionName, iconPath}){
    return(
    <div className=" group w-[95%] pl-[2%] h-[10%] md:h-[7%] lg:h-[9%] xl:h-[10%] inline-flex items-center justify-start text-gray-600 rounded-sm hover:bg-blue-200 hover:text-purple-800 cursor-pointer"
     onClick={onClickSection}>
            <svg className="w-4 h-4 2xl:w-6 2xl:h-6 mr-2 shrink-0 fill-current stroke-current text-gray-600 group-hover:text-purple-800 transition-colors" 
            viewBox="0 0 24 24">
                <path d={iconPath} fill="currentColor" />
            </svg>
            <p className="whitespace-nowrap sm:text-base md:text-lg lg:text-xl 2xl:text-3xl">{sectionName}</p>        
    </div>
    )
}

export default NavSection;