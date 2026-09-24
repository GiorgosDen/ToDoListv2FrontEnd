{/**Terms of Service Page
    Indicative terms write with Gemini*/}

function TermsOfService({hidePage}){

    return(
        <div className=" flex flex-col h-full w-full px-2 gap-5">
            <div className="w-full sticky top-0 z-50 bg-white md:pt-4">
                <h2 className="font-bold text-lg md:text-xl lg:text-2xl">Terms of Service</h2>
                <p className="text-md md:text-lg lg:text-xl">Effective Date: September 7, 2026</p>
            </div>
            <div id="scroll-area" className="bg-white">
                <section>
                    <h2 className="font-bold text-md md:text-lg lg:text-xl">1. Use of the Application</h2>
                    <p className="text-sm md:text-md lg:text-lg">You must be at least 13 years old to use ToDoListApp. You are responsible for keeping your login credentials secure and for all actions taken under your account.</p>
                </section>

                <section>
                    <h2 className="font-bold text-md md:text-lg lg:text-xl">2. User Content</h2>
                    <p className="text-sm md:text-md lg:text-lg">You retain full ownership of the tasks and data you input. By using the app, you grant us permission to store and process your task data solely to provide you with the service.</p>
                </section>

                <section>
                    <h2 className="font-bold text-md md:text-lg lg:text-xl">3. Service Availability</h2>
                    <p className="text-sm md:text-md lg:text-lg">We strive to keep ToDoListApp running smoothly, but we do not guarantee uninterrupted access. We may modify or discontinue the app at any time.</p>
                </section>

                <section>
                    <h2 className="font-bold text-md md:text-lg lg:text-xl">4. Limitation of Liability</h2>
                    <p className="text-sm md:text-md lg:text-lg">ToDoListApp is provided on an "AS IS" basis. We are not liable for any data loss, damages, or business interruptions resulting from your use of the app.</p>
                </section>

                <section>
                    <h2 className="font-bold text-md md:text-lg lg:text-xl">5. Contact Us</h2>
                    <p className="text-sm md:text-md lg:text-lg">If you have questions about these Terms, contact us at: todolistapp.team@gmail.com</p>
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

export default TermsOfService;