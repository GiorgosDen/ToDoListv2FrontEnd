
function MainHeader({userName}){
    return( 
        <div className="flex flex-row justify-between items-end px-[2%] pb-[5%] pt-[3%]">
            <section>
                <h2 className="font-bold text-lg md:text-xl mt-0">Good Morning, {userName}!!! <span>&#128075;</span></h2>
                <p className="text-xs md:text-sm mt-0">Here your tasks for today.</p>
            </section>
            <section>
                <div className="group w-full inline-flex items-center justify-start text-gray-600">
                    <p className="text-xs md:text-sm mt-0 m-0">Monday, 3/8/26</p>
                    <svg className="stroke-current fill-none stroke-2 w-4 h-4 ml-1 shrink-0" 
                    viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </div>
            </section>
        </div>
    );
}

export default MainHeader;