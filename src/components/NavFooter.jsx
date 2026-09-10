import { Link } from "react-router-dom";

function NavFooter({userName}){
    return(
        <div className="group w-[95%] ml-[2.5%] h-[10%] inline-flex items-center justify-start border rounded-sm cursor-pointer">
            <label>{userName}</label>
            <Link to={"/"}>
                <div>
                    <svg className="w-4 h-4 mr-2 shrink-0 fill-red-700"
                     viewBox="0 0 24 24">
                        <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                    </svg>
                </div>
            </Link>
        </div>
    );
}

export default NavFooter;