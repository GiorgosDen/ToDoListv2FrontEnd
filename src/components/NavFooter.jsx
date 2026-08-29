import { Link } from "react-router-dom";

function NavFooter({userName}){
    return(
        <div className="group w-[95%] ml-[2.5%] h-[10%] inline-flex items-center justify-start border rounded-sm">
            <label>{userName}</label>
            <Link to={"/"}>
                <div>
                    <svg className="w-4 h-4 mr-2 shrink-0 fill-red-700"
                     viewBox="0 0 24 24">
                        <path d="M3 6l9-3v15l-9 3V6z" />
                        <path d="M12 3l9 3v15l-9-3V3z" />
                    </svg>
                </div>
            </Link>
        </div>
    );
}

export default NavFooter;