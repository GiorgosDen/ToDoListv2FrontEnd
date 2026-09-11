import { Link } from "react-router-dom";

function UserHeader(){
    return(
        <>
            <section>
                <Link to={"/home"} className="text-sm pr-2 font-semibold text-blue-800 hover:text-blue-950 hover:border-b">
                    &#60; Back
                </Link>
                <hr/>
            </section>
            <section>
                <h2 className="font-bold text-lg md:text-xl mt-0">User Data</h2>
                <p className="text-xs md:text-sm mt-0">Manage your account information, email and password.</p>
            </section>
       </> 
    )
}

export default UserHeader;