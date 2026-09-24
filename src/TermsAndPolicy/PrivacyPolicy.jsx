{/**Terms of Service Page
    Indicative policy write with Gemini*/}

function PrivacyPolicy({hidePage}){

    return(
        <div className=" flex flex-col h-full w-full px-2 gap-5">  
            <div className="w-full sticky top-0 z-50 bg-white md:pt-4">
                <h2 className="font-bold text-lg md:text-xl lg:text-2xl">Privacy Policy</h2>
                <p className="text-md md:text-lg lg:text-xl">Effective Date: September 7, 2026</p>
            </div>          
            <div id="scroll-area" className="bg-white">
                <section>
                    <h2 className="font-bold text-md md:text-lg lg:text-xl">1. Information We collect</h2>
                    <p className="text-sm md:text-md lg:text-lg">When you register and use ToDoListApp, we collect:</p>
                    <ul className="list-disc list-inside text-sm md:text-md space-y-1 mt-2">
                        <li><strong>Account Information:</strong> Your email address and a securely hashed password used for authentication.</li>
                        <li><strong>User Content:</strong> The tasks you create, update, and manage (Daily, Weekly, Monthly, and All Tasks).</li>
                        <li><strong>Usage Data:</strong> Basic technical data like timestamps when interacting with our servers.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-bold text-md md:text-lg lg:text-xl">2. How We Use Your Information</h2>
                    <p className="text-sm md:text-md lg:text-lg">We use your data strictly to provide and improve the service:</p>
                    <ul className="list-disc list-inside text-sm md:text-md space-y-1 mt-2">
                        <li>To create and maintain your account and authenticate your logins.</li>
                        <li>To store and display your daily, weekly, and monthly tasks.</li>
                        <li>To generate your personal task statistics.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-bold text-md md:text-lg lg:text-xl">3. Data Storage and Security</h2>
                    <p className="text-sm md:text-md lg:text-lg">Your data is stored securely in our MySQL database. We use industry-standard security practices, including password hashing (bcrypt) and HTTPS encryption.</p>
                </section>

                <section>
                    <h2 className="font-bold text-md md:text-lg lg:text-xl">4. Your Rights</h2>
                    <p className="text-sm md:text-md lg:text-lg">You have the right to access, update, or delete your user information and tasks via your account settings at any time.</p>
                </section>

                <section>
                    <h2 className="font-bold text-md md:text-lg lg:text-xl">5. Contact Us</h2>
                    <p className="text-sm md:text-md lg:text-lg">If you have any questions, contact us at: todolistapp.team@gmail.com</p>
                </section>
            </div>
            <section className="pb-4">
                <button className="bg-transparent hover:bg-gray-400 hover:bg-opacity-30 text-gray-700 py-1 px-2 border border-gray-500 hover:border-gray-700 rounded"
                 onClick={()=>{hidePage();}}>
                    Return
                </button>
            </section>
        </div>
    )

}

export default PrivacyPolicy;