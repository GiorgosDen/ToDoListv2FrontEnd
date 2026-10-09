import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import authService from "../../services/authService";

function ResetPassword(){
    const {token} = useParams();
    const navigate = useNavigate();
    //Form error states
    const [passwordError,setPasswordError] = useState('hidden');
    const [verPasswordError,setVerPasswordError] = useState('hidden');

    //Form data states
    const [userPassword, setUserPassword]= useState('');
    const [userVerPassword, setUserVerPassword]= useState('');

    const handleResetPassword = async()=>{
        setPasswordError('hidden');
        setVerPasswordError('hidden');
        if(userPassword.length>=8 && userVerPassword===userPassword){
            //valid new password
            const passwordObject= {
                password:userPassword
            }
            const result = await authService.resetPasswordByEmail(passwordObject,token);
            if(result.success){
                navigate("/?status=signup-email");
            }else{
                navigate('/');
            }
        }else{
            userPassword.length<8?setPasswordError(''):setPasswordError('hidden');
            userVerPassword!==userPassword?setVerPasswordError(''):setVerPasswordError('hidden');
        }
    }
    return(
        <>
         {/*The welcome text upper the Sing Up form */}
        <div className="flex flex-col justify-start">
            <label className="font-bold text-xl md:text-2xl">Reset your Password</label>
            <label className="text-xs md:text-sm">Let's reset your password in your ToDoList account.</label>
        </div>
        {/*Sign Up form */}
        <div id="resetPasswordArea" className="flex flex-col justify-start gap-1">
            <label className="text-sm md:text-md">Password <span className={`text-sm text-red-700 ${passwordError}`}>* Unvalid Password</span></label>
            <input type="password" id="inputPass" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
            placeholder="Create your password" required value={userPassword} onChange={(pass)=>setUserPassword(pass.target.value)}/>
            <p id="helperPassword" className="text-gray-600 text-xs">Must be at least 8 characters</p>
            
            <label className="text-sm md:text-md">Confirm Password <span className={`text-sm text-red-700 ${verPasswordError}`}>* The password must be the same</span></label>
            <input type="password" id="verifyPass" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
            placeholder="Confirm your password" required value={userVerPassword} onChange={(verPass)=>setUserVerPassword(verPass.target.value)}/>
            
            <button className="mt-2 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800"
             onClick={handleResetPassword}>Reset Password</button>
        </div>
        </>
    )
}

export default ResetPassword;