import { useEffect, useState } from "react";
import userService from "../../services/userService";
import UpdatedForm from "./components/UpdatedForm";
import UserAvatar from "./components/UserAvatar";
import UserHeader from "./components/UserHeader";


function UserPage(){
    const [userFullName, setUserFullName] = useState('A user name');
    const [userEmail, setUserEmail] = useState('A user email');

    useEffect(()=>{
        const getUserData = async()=>{
            try {
                const resData = await userService.getUserData();
                if(resData){
                    setUserFullName(resData.fullName);
                    setUserEmail(resData.email);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUserData();
    },[]);

    return(
        <div className="flex flex-col justify-between items-start px-[2%] pb-[5%] pt-[3%] gap-4 md:gap-1">
            <UserHeader/>
            <hr/>
            <UserAvatar userName={userFullName} userEmail={userEmail}/>
            <hr/>
            <UpdatedForm/>
        </div>
    )
}

export default UserPage;