import { useEffect, useState } from "react";

function ErrorMessagePopUp({title,description,iconPath,iconColor,buttonMessage,seePopUp,onClose}){
    return(
        <div className={`${seePopUp ? '' : 'hidden'} fixed inset-0 flex items-center justify-center bg-black/50 z-50`}>
            <div className="flex flex-col items-center w-[90%] md:w-[50%] bg-white rounded-lg shadow-lg p-6 gap-2">
            <svg className={`w-16 h-16 md:w-24 md:h-24 mr-2 shrink-0 fill-current ${iconColor} transition-colors`} 
                viewBox="0 0 24 24">
                <path d={iconPath} fill="currentColor" />
            </svg>
            <div className="text-center">
            <h2 className="font-semibold text-md md:text-lg">{title}</h2>
            <p className="font-light text-md md:text-lg">{description}</p>
            </div>
            <button onClick={onClose} className="w-full h-8 md:h-12 bg-blue-700 hover:bg-blue-800 text-xs md:text-sm text-white px-2 py-1 rounded">
                {buttonMessage}
            </button>
            </div>
        </div>
    );
}

export default ErrorMessagePopUp;