{/*Contains the Sign Up page's form*/}
import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

import authService from "../../services/authService";
import PrivacyPolicy from "../../TermsAndPolicy/PrivacyPolicy";
import TermsOfService from "../../TermsAndPolicy/TermsOfService";

function SignUp(){
    //Navigate state
    const navigate = useNavigate();
    //Error states (usage as a tailwind class hidden for form labels)
    const [nameError,setNameError] = useState('hidden');
    const [emailError,setEmailError] = useState('hidden');
    const [passwordError,setPasswordError] = useState('hidden');
    const [verPasswordError,setVerPasswordError] = useState('hidden');
    const [agreeTermsError,setAgreeTermsError] = useState('hidden');
    const [resendEmailError,setResendEmailError] = useState('hidden');
    //entry data states
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword]= useState('');
    const [userVerPassword, setUserVerPassword]= useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [resendEmail, setResendEmail] = useState('');
    //Policy & Terms view state (boolean)
    const [viewTermsPolicy, setViewTermsPolicy] = useState(false);
    //Policy & Terms map state (string)
    const [mapTermsPolicy, setMapTermsPolicy] = useState("terms");
    //View resend verification popup (boolean)
    const [viewResendVerificationPopUp, setViewResendVerificationPopUp] = useState(false);
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
                navigate("/?status=signup-email");
            }
        }

    };

    const handleResendVerification= async()=>{
        setResendEmailError('hidden');
        if(userEmail.length===0 || !userEmail.endsWith("@gmail.com")){
            //valid email
            const emailObject= {
                email:resendEmail
            }
            console.log(emailObject);
            const result = await authService.resendVerificationService(emailObject);
            if(result.success){
                setViewResendVerificationPopUp(false);
                navigate("/?status=signup-email");
            }
        }else{
            //Unvalid email
            setResendEmailError('');
        }
    }

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
            <input type="text" id="inputName" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
            placeholder="Enter your full name" required value={userName} onChange={(name)=>setUserName(name.target.value)}/>
            <label className="text-sm md:text-md">Email Address <span className={`text-sm text-red-700 ${emailError}`}>* Unvalid Email</span></label>
            <input type="text" id="inputEmail" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
            placeholder="user.example@gmail.com" required value={userEmail} onChange={(em)=>setUserEmail(em.target.value)}/>
            <label className="text-sm md:text-md">Password <span className={`text-sm text-red-700 ${passwordError}`}>* Unvalid Password</span></label>
            <input type="password" id="inputPass" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
            placeholder="Create your password" required value={userPassword} onChange={(pass)=>setUserPassword(pass.target.value)}/>
            <p id="helperPassword" className="text-gray-600 text-xs">Must be at least 8 characters</p>
            <label className="text-sm md:text-md">Confirm Password <span className={`text-sm text-red-700 ${verPasswordError}`}>* The password must be the same</span></label>
            <input type="password" id="verifyPass" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
            placeholder="Confirm your password" required value={userVerPassword} onChange={(verPass)=>setUserVerPassword(verPass.target.value)}/>
            {/*Agree Terms & Policy checkbox  */}
            <div id="agreedPanel"> 
                <input type="checkbox" checked={agreeTerms} onChange={(ch)=>setAgreeTerms(ch.target.checked)}/>
                <label className="text-gray-600 text-sm">I agree to the <span onClick={()=>{setViewTermsPolicy(true); setMapTermsPolicy("terms");}} className="text-blue-400 hover:underline hover:text-blue-700">Terms of Service</span> & <span onClick={()=>{setViewTermsPolicy(true); setMapTermsPolicy("policy");}} className="text-blue-400 hover:underline hover:text-blue-700">Privacy Policy</span></label>
                <span className={`text-sm text-red-700 ${agreeTermsError}`}> *Must be agreed with Terms and Policy</span>
            </div>
            {/*Resend Verification Email*/}
            <div id="resendVeriFicationPanel"> 
                <label className="text-sm font-semibold text-blue-500 hover:text-blue-800"
                 onClick={()=>setViewResendVerificationPopUp(true)}>Already registered but didn't verify? [Resend verification email]
                 </label>
            </div>
            <button className="mt-2 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800"
             onClick={handleSignUp}>Create Account</button>
        </div>
        {/*Terms & Policy PopUp */}
        <div className={`${viewTermsPolicy?'':'hidden'} fixed inset-0 flex items-center justify-center bg-black/50 z-50`}>
            <div className={`overflow-y-auto customScrollStyle min-h-0 w-4/5 h-4/5 flex items-center bg-white rounded-lg shadow-lg gap-2 px-4 pb-4`}>
                {
                    TermsPolicyMap[mapTermsPolicy]
                }
            </div>
        </div>
        {/*Import Email for resend Verification PopUp */}
        <div className={`${viewResendVerificationPopUp?'':'hidden'} fixed inset-0 flex items-center justify-center bg-black/50 z-50`}>
                <div className="flex flex-col items-center w-[90%] md:w-[50%] bg-white rounded-lg shadow-lg p-6 gap-2">
                    <label className="font-semibold text-md md:text-lg">Email Address <span className={`text-sm text-red-700 ${resendEmailError}`}>* Unvalid Email</span></label>
                    <input type="text" id="inputResendEmail" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full px-3 py-2.5 shadow-md placeholder:text-body" 
                        placeholder="user.example@gmail.com" value={resendEmail} onChange={(em)=>setResendEmail(em.target.value)}/>
                    <button className="w-full mt-2 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800"
                        onClick={handleResendVerification}>Resend Verification</button>
                    <button className="w-full mt-2 py-2 bg-transparent hover:bg-gray-400 hover:bg-opacity-30 shadow-md text-gray-700 border border-gray-500 hover:border-gray-700 rounded-lg"
                        onClick={()=>setViewResendVerificationPopUp(false)}>Cancel</button>
                </div>
        </div>
        </>
    );
}

export default SignUp;