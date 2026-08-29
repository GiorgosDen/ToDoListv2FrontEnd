
function NavSection({sectionName, iconPath}){
    return(
    <div className=" group w-[95%] pl-[2%] h-[10%] inline-flex items-center justify-start text-gray-600 rounded-sm hover:bg-blue-200 hover:text-purple-800">
            <svg className="w-4 h-4 mr-2 shrink-0 fill-current stroke-current text-gray-600 group-hover:text-purple-800 transition-colors" 
            viewBox="0 0 24 24">
                <path d={iconPath} fill="currentColor" />
            </svg>
            <p className="whitespace-nowrap md:text-lg sm:text-base">{sectionName}</p>        
    </div>
    )
}

export default NavSection;