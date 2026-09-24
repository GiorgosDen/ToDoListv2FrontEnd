{/*Contains the Sign Up page's form*/}
import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

import authService from "../../services/authService";
import PrivacyPolicy from "../../TermsAndPolicy/PrivacyPolicy";
import TermsOfService from "../../TermsAndPolicy/TermsOfService";

function SignUp(){
    const errorData = {
        title:"Sign Up",
        description:"Error during Sign Up",
        iconPath:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
        iconColor:'text-blue-500',
        buttonMessage:"Close"
    }
    //Navigate state
    const navigate = useNavigate();
    //Error states (usage as a tailwind class hidden for form labels)
    const [nameError,setNameError] = useState('hidden');
    const [emailError,setEmailError] = useState('hidden');
    const [passwordError,setPasswordError] = useState('hidden');
    const [verPasswordError,setVerPasswordError] = useState('hidden');
    const [agreeTermsError,setAgreeTermsError] = useState('hidden');
    //entry data states
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword]= useState('');
    const [userVerPassword, setUserVerPassword]= useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    //Policy & Terms view state (boolean)
    const [viewTermsPolicy, setViewTermsPolicy] = useState(false);
    //Policy & Terms map state (string)
    const [mapTermsPolicy, setMapTermsPolicy] = useState("terms");
    //Component (Terms or Policy) map
    const TermsPolicyMap = {
        "policy":<PrivacyPolicy hidePage={()=>{hideTermsPolicy();}}/>,
        "terms":<TermsOfService hidePage={()=>{hideTermsPolicy();}}/>
    }

    //Handle close Terms/Policy
    const hideTermsPolicy = ()=>{
        setViewTermsPolicy(false);
    }

    //Handle click function
    const handleSignUp= async()=>{
        //Valid conditions counter
        let validConditions = 0;
        //hid the error messages
        setNameError('hidden');
        setEmailError('hidden');
        setPasswordError('hidden');
        setVerPasswordError('hidden');
        setAgreeTermsError('hidden');
        //Evaluate imported data

        //1. Full Name
        if(userName.length>0){
            //It has the form: First Name (space) Last Name
            validConditions+=1;
        }else{
            setNameError('');
        }
        //2. Email
        if(userEmail.length>0 && userEmail.endsWith("@gmail.com")){
            //valid email
            validConditions+=1;
        }else{
            //Unvalid email
            setEmailError('');
        }

        //3. Password
        if(userPassword.length>=8){
            //valid password
            validConditions+=1;
        }else{
            //unvalid password
            setPasswordError('');
        }

        //4. Verify Password
        if(userVerPassword===userPassword){
            validConditions+=1;
        }else{
            setVerPasswordError('');
        }

        //5.Agreed with Terms & Policy
        if(agreeTerms){
            //If user agrees/the checkbox selected the agreeTerms===true
            validConditions+=1;
        }else{
            setAgreeTermsError('');
        }
        //Complete Sign Up or continue
        //5 main conditons must be met
        if(validConditions===5){
            const signUpData = {
                fullName: userName,
                email: userEmail,
                password: userPassword
            }
            const result = await authService.signUpService(signUpData);
            if(result.success){
                navigate("/");
            }
        }

    };

    return(
        <>
        {/*User links to Log In page, if has a account */}
        <div id="logInHeader" className="flex align-bottom justify-end gap-1 pt-2">
            <label className="text-sm">Already have an account?</label>
            <Link to={"/"} className="text-sm font-semibold text-blue-700"> Log in </Link>
        </div>
        {/*The welcome text upper the Sing Up form */}
        <div className="flex flex-col justify-start">
            <label className="font-bold text-xl md:text-2xl">Create your Account</label>
            <label className="text-xs md:text-sm">Let's get you started with ToDoList.</label>
        </div>
        {/*Sign Up form */}
        <div id="signFormArea" className="flex flex-col justify-start gap-1">
            <label className="text-sm md:text-md">Full Name <span className={`text-sm text-red-700 ${nameError}`}>* Unvalid Full Name</span></label>
            <input type="text" id="inputName" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
            placeholder="Enter your full name" required value={userName} onChange={(name)=>setUserName(name.target.value)}/>
            <label className="text-sm md:text-md">Email Address <span className={`text-sm text-red-700 ${emailError}`}>* Unvalid Email</span></label>
            <input type="text" id="inputEmail" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
            placeholder="user.example@gmail.com" required value={userEmail} onChange={(em)=>setUserEmail(em.target.value)}/>
            <label className="text-sm md:text-md">Password <span className={`text-sm text-red-700 ${passwordError}`}>* Unvalid Password</span></label>
            <input type="password" id="inputPass" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
            placeholder="Create your password" required value={userPassword} onChange={(pass)=>setUserPassword(pass.target.value)}/>
            <p id="helperPassword" className="text-gray-600 text-xs">Must be at least 8 characters</p>
            <label className="text-sm md:text-md">Confirm Password <span className={`text-sm text-red-700 ${verPasswordError}`}>* The password must be the same</span></label>
            <input type="password" id="verifyPass" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
            placeholder="Confirm your password" required value={userVerPassword} onChange={(verPass)=>setUserVerPassword(verPass.target.value)}/>
            {/*Agree Terms & Policy checkbox  */}
            <div id="agreedPanel"> 
                <input type="checkbox" checked={agreeTerms} onChange={(ch)=>setAgreeTerms(ch.target.checked)}/>
                <label className="text-gray-600 text-sm">I agree to the <span onClick={()=>{setViewTermsPolicy(true); setMapTermsPolicy("terms");}} className="text-blue-400 hover:underline hover:text-blue-700">Terms of Service</span> & <span onClick={()=>{setViewTermsPolicy(true); setMapTermsPolicy("policy");}} className="text-blue-400 hover:underline hover:text-blue-700">Privacy Policy</span></label>
                <span className={`text-sm text-red-700 ${agreeTermsError}`}> *Must be agreed with Terms and Policy</span>
            </div>
            <button className="mt-2 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800"
             onClick={handleSignUp}>Create Account</button>
        </div>
        {/*Terms & Policy PopUp */}
        <div className={`${viewTermsPolicy?'':'hidden'} fixed inset-0 flex items-center justify-center bg-black/50 z-50`}>
            <div className={`overflow-y-auto min-h-0 w-4/5 h-4/5 flex items-center bg-white rounded-lg shadow-lg gap-2 px-4 pb-4`}>
                {
                    TermsPolicyMap[mapTermsPolicy]
                }
            </div>
        </div>
        </>
    );
}

export default SignUp;