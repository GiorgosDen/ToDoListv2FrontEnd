import { Link } from "react-router-dom";
{/**Terms of Service Page
    Indicative policy write with Gemini*/}

function PrivacyPolicy(){

    return(
        <div className="fixed inset-0 h-screen w-screen flex flex-col items-center justify-center bg-[rgb(255,255,255)] p-10 md:p-16 md:col-start-1 md:col-end-3 gap-y-4">            
            <h2 className="font-bold text-lg md:text-xl">Privacy Policy</h2>
            <p className="text-md md:text-lg">Effective Date: September 7, 2026</p>
            <div id="scroll-area" className="w-full h-[85vh] overflow-auto bg-[rgb(235,240,250)] p-4">
                <section>
                    <h2 className="font-bold text-md md:text-lg">1. Information We collect</h2>
                    <p className="text-sm md:text-md">When you register and use ToDoListApp, we collect:</p>
                    <ul className="list-disc list-inside text-sm md:text-md space-y-1 mt-2">
                        <li><strong>Account Information:</strong> Your email address and a securely hashed password used for authentication.</li>
                        <li><strong>User Content:</strong> The tasks you create, update, and manage (Daily, Weekly, Monthly, and All Tasks).</li>
                        <li><strong>Usage Data:</strong> Basic technical data like timestamps when interacting with our servers.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-bold text-md md:text-lg">2. How We Use Your Information</h2>
                    <p className="text-sm md:text-md">We use your data strictly to provide and improve the service:</p>
                    <ul className="list-disc list-inside text-sm md:text-md space-y-1 mt-2">
                        <li>To create and maintain your account and authenticate your logins.</li>
                        <li>To store and display your daily, weekly, and monthly tasks.</li>
                        <li>To generate your personal task statistics.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-bold text-md md:text-lg">3. Data Storage and Security</h2>
                    <p className="text-sm md:text-md">Your data is stored securely in our MySQL database. We use industry-standard security practices, including password hashing (bcrypt) and HTTPS encryption.</p>
                </section>

                <section>
                    <h2 className="font-bold text-md md:text-lg">4. Your Rights</h2>
                    <p className="text-sm md:text-md">You have the right to access, update, or delete your user information and tasks via your account settings at any time.</p>
                </section>

                <section>
                    <h2 className="font-bold text-md md:text-lg">5. Contact Us</h2>
                    <p className="text-sm md:text-md">If you have any questions, contact us at: todolistapp.team@gmail.com</p>
                </section>
            </div>
            <section>
                <Link to={'/signUp'}>
                    <button className="bg-transparent hover:bg-gray-400 hover:bg-opacity-30 text-gray-700 py-1 px-2 border border-gray-500 hover:border-gray-700 rounded">
                        Return
                    </button>
                </Link>
            </section>
        </div>
    )

}

export default PrivacyPolicy;