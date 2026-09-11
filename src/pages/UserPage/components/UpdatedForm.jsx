import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import userService from "../../../services/userService";
import PopUpMessagesList from "../../../services/PopUpMessagesList";

function UpdatedForm(){
    const {triggerPopUpMessage} = useOutletContext();
    const [emailError,setNewEmailError] = useState('hidden');
    const [passwordError,setNewPasswordError] = useState('hidden');
    const [fullNameError, setNewFullNameError] = useState('hidden');
    const [userNewEmail, setUserNewEmail] = useState('');
    const [userNewPassword, setUserNewPassword]= useState('');
    const [userNewFullName, setUserNewFullName] = useState('');

    const updateUserData = async()=>{
        setNewFullNameError('hidden');
        setNewEmailError('hidden');
        setNewPasswordError('hidden');

        //check imported data
        let count = 0;
        userNewFullName==='' || userNewFullName.length>2?count+=1:setNewFullNameError('');
        userNewEmail==='' || userNewEmail.endsWith("@gmail.com")?count+=1:setNewEmailError('');
        userNewPassword==='' || userNewPassword.length>=8?count+=1: setNewPasswordError('');

        if(userNewFullName==='' && userNewEmail==='' && userNewPassword==='') count=0;

        const userNewData ={
            fullName:userNewFullName,
            email:userNewEmail,
            password:userNewPassword
        }

        if(count===3){
            try {
                const results = await userService.updateUserData(userNewData);
                if(results){
                    const matchedError =  PopUpMessagesList.find((err)=>err.status===201);
                    triggerPopUpMessage(matchedError);
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
                <label className="text-md">Password <span className={`text-sm text-red-700 ${passwordError}`}>*Unvalid password</span></label>
                <input type="password" id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
                    placeholder="Import new password" required value={userNewPassword} onChange={(pass)=>setUserNewPassword(pass.target.value)}/>
            </section>
            <section className="w-[90%] flex">
                <button className="w-full mt-2 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800"
                onClick={()=>updateUserData()}>
                    Update
                </button>
            </section>
        </>
    )
}

export default UpdatedForm;