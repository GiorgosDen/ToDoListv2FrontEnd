{/*Contains the Sign Up page's form*/}
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp(){
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

    //Handle click function
    const handleSignUp= ()=>{
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
            navigate("/home");
        }

    };

    return(
        <>
        {/*User links to Log In page, if has a account */}
        <div id="logInHeader" className="flex align-bottom justify-center md:justify-end gap-1 pt-2">
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
                <label className="text-gray-600 text-sm">I agree to the <span className="text-blue-400">Terms of Service</span> & <span className="text-blue-400">Privacy Policy</span></label>
                <span className={`text-sm text-red-700 ${agreeTermsError}`}> *Must be agreed with Terms and Policy</span>
            </div>
            <button className="mt-2 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800"
             onClick={handleSignUp}>Create Account</button>
        </div>
        </>
    );
}

export default SignUp;