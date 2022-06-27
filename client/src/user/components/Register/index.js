import { useCallback, useState } from 'react'
import CustommerAPI from '../../services/API/CustomerAPI'
import isEmty from 'validator/lib/isEmpty'
import { useNavigate } from 'react-router-dom'
const RegisterComponent = () => {
    const navigate=useNavigate();

    const [account, setAccount] = useState({ HoTen: "", Email: "", MatKhau:""})
    const [validated,setValidated]=useState('')
    const handleAcountSubmit = async (event) => {
        const isvalidated=validatedAll() 
        if(!isvalidated) {
            event.preventDefault()
            return
        }

        const form = event.currentTarget;
         if (form.checkValidity() === false) {
             event.preventDefault()
             event.stopPropagation()
             return
         }
        event.preventDefault()
        const res= await CustommerAPI.register(account);
         console.log(res)
         navigate('../Home')
        
    }
    const onInputChange = useCallback((e) => {
        setAccount(account=>({ ...account, [e.target.name]: e.target.value }))
    }, [])
const validatedAll=()=>{
    const nsg={}
    if(isEmty(account.HoTen)){
        nsg.HoTen='Please input your username'
    }
    if(isEmty(account.Email)){
        nsg.Email='Please input your email'
    }
    if(isEmty(account.MatKhau)){
        nsg.MatKhau='Please input your password'
    }
    setValidated(nsg)
    if(Object.keys(nsg).length>0) {return false}
    return true
    
}
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
                                    Fullname
                                </label>
                                <input onChange={onInputChange}
                                    name='HoTen'
                                    type="text"
                                    placeholder='Full Name'
                                    className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                />
                            </div>
                                <p className='text-red-400 text-xs italic'>{validated.HoTen}</p>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-1 text-gray-600 font-semibold"
                                >
                                    Email
                                </label>
                                <input onChange={onInputChange}
                                    placeholder='Email'
                                    name='Email'
                                    type="text"
                                    className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                />
                            </div>
                            <p className='text-red-400 text-xs italic'>{validated.Email}</p>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-1 text-gray-600 font-semibold"
                                >
                                    Password
                                </label>
                                <input onChange={onInputChange}
                                    name='MatKhau'
                                    type="password"
                                    required
                                    placeholder='Password'
                                    className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                                />
                            </div>
                            <p className='text-red-400 text-xs italic'>{validated.MatKhau}</p>
                        </div>
                        <button onClick={handleAcountSubmit}  className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default RegisterComponent;