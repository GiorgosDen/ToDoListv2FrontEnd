
function UserAvatar({userName,userEmail}){
    return(
        <>
            <section className="w-[90%] md:w-[30%] md:py-2 flex justify-start md:justify-center align-middle rounded-lg shadow-md border border-gray-400">
                <svg className="w-14 h-14 md:h-22 md:w-22 mr-2 shrink-0 fill-current stroke-current text-gray-600" 
                    viewBox="0 0 24 24">
                    <path d={"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"} fill="currentColor"/>
                </svg>
                <div className="flex flex-col justify-center">
                    <p className="font-medium text-md md:text-lg mt-0">{userName}</p>
                    <p className="font-medium text-md md:text-lg mt-0">{userEmail}</p>
                </div>
            </section>
        </>
    )
}

export default UserAvatar;