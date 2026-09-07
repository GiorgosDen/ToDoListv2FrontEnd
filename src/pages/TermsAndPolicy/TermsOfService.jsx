import { Link } from "react-router-dom";
{/**Terms of Service Page
    Indicative terms write with Gemini*/}

function TermsOfService(){

    return(
        <div className="fixed inset-0 h-screen w-screen flex flex-col items-center justify-center bg-[rgb(255,255,255)] p-10 md:p-16 md:col-start-1 md:col-end-3 gap-y-4">
            <h2 className="font-bold text-lg md:text-xl">Terms of Service</h2>
            <p className="text-md md:text-lg">Effective Date: September 7, 2026</p>
            <div id="scroll-area" className="w-full h-[85vh] overflow-auto bg-[rgb(235,240,250)] p-4">
                <section>
                    <h2 className="font-bold text-md md:text-lg">1. Use of the Application</h2>
                    <p className="text-sm md:text-md">You must be at least 13 years old to use ToDoListApp. You are responsible for keeping your login credentials secure and for all actions taken under your account.</p>
                </section>

                <section>
                    <h2 className="font-bold text-md md:text-lg">2. User Content</h2>
                    <p className="text-sm md:text-md">You retain full ownership of the tasks and data you input. By using the app, you grant us permission to store and process your task data solely to provide you with the service.</p>
                </section>

                <section>
                    <h2 className="font-bold text-md md:text-lg">3. Service Availability</h2>
                    <p className="text-sm md:text-md">We strive to keep ToDoListApp running smoothly, but we do not guarantee uninterrupted access. We may modify or discontinue the app at any time.</p>
                </section>

                <section>
                    <h2 className="font-bold text-md md:text-lg">4. Limitation of Liability</h2>
                    <p className="text-sm md:text-md">ToDoListApp is provided on an "AS IS" basis. We are not liable for any data loss, damages, or business interruptions resulting from your use of the app.</p>
                </section>

                <section>
                    <h2 className="font-bold text-md md:text-lg">5. Contact Us</h2>
                    <p className="text-sm md:text-md">If you have questions about these Terms, contact us at: todolistapp.team@gmail.com</p>
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

export default TermsOfService;