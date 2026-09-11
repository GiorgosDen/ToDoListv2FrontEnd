{/*Contains the Login page's split-screen form */}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//service
import authService from "../../services/authService";

function LoginPage(){
    //Navigate state
    const navigate = useNavigate();
    //Error states (usage as a tailwind class hidden for form labels)
    const [emailError,setEmailError] = useState('hidden');
    const [passwordError,setPasswordError] = useState('hidden');
    //entry data states
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword]= useState('');

    //Handle click function
    const handleLogin= async (e)=>{
        if (e) e.preventDefault();
    console.log("Login button was clicked!");
        //Valid conditions counter
        let validConditions = 0;
        //hid the error messages
        setEmailError('hidden');
        setPasswordError('hidden');
        //Evaluate imported data
        //1. Email
        if(userEmail.length>0 && userEmail.endsWith("@gmail.com")){
            //valid email
            validConditions+=1;
        }else{
            //Unvalid email
            setEmailError('');
        }

        //2. Password
        if(userPassword.length>=8){
            //valid password
            validConditions+=1;
        }else{
            //unvalid password
            setPasswordError('');
        }

        //2 main conditons must be met
        if(validConditions===2){
            try {
                //Create request JSON
                const importedData = {
                    "importedEmail":userEmail,
                    "importedPassword":userPassword
                } 
                //Get server response.data 
                const resData = await authService.logInService(importedData);
                //if server finds user (sends their name)
                if(resData.success){
                    const firstName = resData.data.name.trim().split(" ")[0];
                    //Navigate and pass the user name (the first name in case that user has firstand last name)
                    navigate("/home", {state:{username:firstName}});
                }     
            } catch (error) {
                console.log(error);
            }
        }

    };

    return(
        <>
        {/*User link to Sing Up page, if doesn't have an account */}
        <div id="signUpHeader" className="flex justify-end gap-2 pt-5">
            <label className="text-sm">Don't have an account?</label>
            <Link to={"/signUp"}  className="text-sm font-semibold text-blue-700">
                Sign Up
            </Link>
        </div>
        <hr/>
        {/*The welcome text upper the login form */}
        <div id="welcomeHeader" className="flex flex-col justify-start py-5">
            <label className="font-bold text-2xl">Welcome Back</label>
            <label className="text-sm">Login to your ToDoList account</label>
        </div>
        {/*The Log In form */}
        <div id="logFormArea" className="flex flex-col justify-start gap-2">
            <label className="text-md">Email Address <span className={`text-sm text-red-700 ${emailError}`}>*Unvalid email</span></label>
            <input type="text" id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
            placeholder="user.example@gmail.com" required value={userEmail} onChange={(em)=>setUserEmail(em.target.value)}/>
            <label className="text-md">Password <span className={`text-sm text-red-700 ${passwordError}`}>*Unvalid password</span></label>
            <input type="password" id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
            placeholder="Enter your Password" required value={userPassword} onChange={(pass)=>setUserPassword(pass.target.value)}/>

                <button className="w-full mt-2 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800"
                onClick={handleLogin}>
                    Log In
                </button>
        </div>
        </>
    );
}


export default LoginPage;