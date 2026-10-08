import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import userService from "../../../services/userService";
import authService from "../../../services/authService";
import PopUpMessagesList from "../../../services/PopUpMessagesList";

function UpdatedForm({userName,userEmail,setUserName,informAvatar}){
    const {triggerPopUpMessage} = useOutletContext();
    const [emailError,setNewEmailError] = useState('hidden');
    const [newPasswordError,setNewPasswordError] = useState('hidden');
    const [currentPasswordError,setCurrentPasswordError] = useState('hidden');
    const [fullNameError, setNewFullNameError] = useState('hidden');
    const [userNewEmail, setUserNewEmail] = useState('');
    const [userNewPassword, setUserNewPassword]= useState('');
    const [userCurrentPassword, setUserCurrentPassword] = useState('');
    const [userNewFullName, setUserNewFullName] = useState('');

    const [viewDeletePopUp, setViewDeletePopUp] = useState(false);
    const navigate = useNavigate();

    const updateReloadAvatar = ()=>{
        informAvatar((prev)=>prev+1);
    }
    const updateUserData = async()=>{
        setNewFullNameError('hidden');
        setNewEmailError('hidden');
        setCurrentPasswordError('hidden');
        setNewPasswordError('hidden');

        //check imported data
        //1->change fullname
        //2->change email
        //4->change password
        //3-> change fullname & email
        //5->change fullname & password
        //6-> change email & password
        //7->change all
        let count = 0;
        let callUpdateService = true;

        //Full Name
        if(userNewFullName.length>0){
            count+=1;
        }else if(userNewFullName.length<0){
            setNewFullNameError('');
        }
        
        //Email
        if(userNewEmail.length>10 && userNewEmail.endsWith("@gmail.com")){
            count+=2;
        }else if(userNewEmail.length>0 && userNewEmail.length<10 && !userNewEmail.endsWith("@gmail.com")){
            setNewEmailError('');
        }

        //New And Current Password
        if(userNewPassword.length>=8 && userCurrentPassword.length>=8){
            setUserName(userNewFullName);//Visual User Avatar Updating 
            count+=4;
        }else if(userNewPassword.length>0 && userNewPassword.length<8 && userCurrentPassword.length>0 && userCurrentPassword.length<8){
            setNewPasswordError('');
            setCurrentPasswordError('');
        }else if(userNewPassword.length>=8 && userCurrentPassword.length<8){
            setCurrentPasswordError('');
        }else if(userNewPassword.length<8 && userCurrentPassword.length>=8){
            setNewPasswordError('');
        }

        const userNewData ={
            fullName:userNewFullName,
            email:userNewEmail,
            password:userNewPassword,
            curPassword:userCurrentPassword,
            curFullName: userName,
            curEmail: userEmail
        }
        
        if(count>0 && callUpdateService){
            try {
                const results = await userService.updateUserData(userNewData,count);
                if(results){
                    let matchedError =  PopUpMessagesList.find((err)=>err.status===201);
                    //If email doesnt change
                    if(count===1 || count===4 || count===5){
                        matchedError = PopUpMessagesList.find((err)=>err.status===200);
                    }
                    triggerPopUpMessage(matchedError);
                    updateReloadAvatar();//To reload user Avatar
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
        }else if(count===0){
            //All fields are empty
            const matchedError =  PopUpMessagesList.find((err)=>err.status==="empty-update-user");
            triggerPopUpMessage(matchedError);
        }
    }

    const deactivateUserAccount = async()=>{
        try {
            const userData = {
                userFullName:userName,
                userEmail:userEmail
            }
            const results = await userService.deactivateUserAccount(userData);
            console.log("Deactivate success");
            const logOut  = await authService.logOutService();
            console.log("Clear cookie success");
            if(results){
                const matchedError =  PopUpMessagesList.find((err)=>err.status===200);
                triggerPopUpMessage(matchedError);
                if(logOut){
                    navigate("/",{ replace: true });
                }
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return(
        <>
            <section>
                <h3 className="font-bold text-lg md:text-xl mt-0">Profile information</h3>
                <p className="text-xs md:text-sm mt-0">Update your basic profile details.</p>
            </section>
            <section className="w-[90%]">
                <label className="text-md">Full Name <span className={`text-sm text-red-700 ${fullNameError}`}>*Unvalid full name</span></label>
                <input type="text" id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
                    placeholder="Import new username" required value={userNewFullName} onChange={(fn)=>setUserNewFullName(fn.target.value)}/>
                <label className="text-md">Email Address <span className={`text-sm text-red-700 ${emailError}`}>*Unvalid email</span></label>
                <input type="text" id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
                    placeholder="Import new email" required value={userNewEmail} onChange={(em)=>setUserNewEmail(em.target.value)}/>
                <label className="text-md"> Current Password <span className={`text-sm text-red-700 ${currentPasswordError}`}>*Unvalid password</span></label>
                <input type="password" id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
                    placeholder="Import Current password" required value={userCurrentPassword} onChange={(pass)=>setUserCurrentPassword(pass.target.value)}/>
                <label className="text-md">New Password <span className={`text-sm text-red-700 ${newPasswordError}`}>*Wrong current password</span></label>
                <input type="password" id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
                    placeholder="Import new password" required value={userNewPassword} onChange={(pass)=>setUserNewPassword(pass.target.value)}/>      
            </section>
            <section className="w-[90%] flex">
                <button className="w-1/3 mt-2 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800"
                onClick={()=>updateUserData()}>
                    Update
                </button>
                <button className="w-1/3 mt-2 py-2 bg-red-700 text-white rounded-lg shadow-md hover:bg-red-800"
                onClick={()=>setViewDeletePopUp(true)}>
                    Delete User
                </button>
            </section>
            <div className={`${viewDeletePopUp?'':'hidden'} fixed inset-0 flex items-center justify-center bg-black/50 z-50`}>
                <div className="flex flex-col items-center w-[90%] md:w-[50%] bg-white rounded-lg shadow-lg p-6 gap-2">
                    <svg className={`w-16 h-16 md:w-24 md:h-24 mr-2 shrink-0 fill-current text-red-800 transition-colors`} 
                        viewBox="0 0 24 24">
                        <path d={"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"} 
                        fill="currentColor" />
                    </svg>
                    <div className="text-center">
                        <h2 className="font-semibold text-md md:text-lg">Delete User Account</h2>
                        <p className="font-light text-md md:text-lg">Are you sure that you want to delete your account? This action cannot be undone.</p>
                    </div>
                    <button onClick={()=> setViewDeletePopUp(false)} className="w-full h-8 md:h-12 bg-blue-700 hover:bg-blue-800 text-xs md:text-sm text-white px-2 py-1 rounded">
                        Cancel 
                    </button>
                    <button onClick={()=> deactivateUserAccount()} className="w-full h-8 md:h-12 bg-red-700 hover:bg-red-800 text-xs md:text-sm text-white px-2 py-1 rounded">
                        Delete 
                    </button>
                </div>
            </div>
        </>
    )
}

export default UpdatedForm;