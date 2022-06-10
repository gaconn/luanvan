const RegisterComponent = () => {
    return (
        <div >
            <div className=" h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex justify-center items-center w-full">
                <form className="wow zoomIn" >
                    <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
                        <div className="space-y-4">
                            <h1 className="text-center text-2xl font-semibold text-gray-600">
                                Register
                            </h1>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-1 text-gray-600 font-semibold"
                                >
                                    Username
                                </label>
                                <input
                          
                                    type="text"
                                    className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-1 text-gray-600 font-semibold"
                                >
                                    Email
                                </label>
                                <input
                                    type="text"
                                    className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-1 text-gray-600 font-semibold"
                                >
                                    Password
                                </label>
                                <input
                                    type="text"
                                    className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                />
                            </div>
                        </div>
                        <button className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default RegisterComponent;