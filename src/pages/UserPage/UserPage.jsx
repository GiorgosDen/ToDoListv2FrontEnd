import { useState } from "react";
import UpdatedForm from "./components/UpdatedForm";
import UserAvatar from "./components/UserAvatar";
import UserHeader from "./components/UserHeader";


function UserPage(){
    return(
        <div className="flex flex-col justify-between items-start px-[2%] pb-[5%] pt-[3%] gap-4 md:gap-1">
            <UserHeader/>
            <hr/>
            <UserAvatar userName={"Dummy User"} userEmail={"dummy@gmail.com"}/>
            <hr/>
            <UpdatedForm/>
        </div>
    )
}

export default UserPage;