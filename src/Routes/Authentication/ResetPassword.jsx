import { useState } from 'react';
import motionWhite from '../../../public/assets/images/logo_white.png';
import { useNavigate } from 'react-router-dom';
import { api } from '../../API/api';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        code: "",
        email: "",
        password: "",
        password_repeat: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSignUp = () => {
        navigate('/signup')
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const {code, email, password, password_repeat} = formData;
        try {
            api.patch("/auth/password-reset/validation/", {code,email,password,password_repeat});
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="flex h-screen">
            {/* Left side with background and logo */}
            <div className="relative flex flex-col w-2/5 bg-auth-bgImage bg-cover">
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-700 to-indigo-500 opacity-60"></div>
                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className='flex flex-col items-center'>
                        <img src={motionWhite} alt="motion logo" className="w-16" />
                        <h1 className='font-bold text-white text-3xl'>Motion</h1>
                    </div>
                </div>
            </div>
            {/* Right side with content */}
            <div className="flex flex-col w-3/5 mt-4 justify-start">
                <div className='flex self-end mr-10 items-center'>
                <p className='mr-10'>Don`t have an account?</p>
                <button className='pr-7 pl-7 pt-2 pb-2 border-2 rounded-full' onClick={handleSignUp}>Sign Up</button>
                </div>

                <form className='mt-[12%]' onSubmit={handleSubmit}>  
                    <div className='flex flex-col items-center'>     
                        <h1 className='text-5xl'>Reset Password</h1>
                        <input className='mt-10 p-2 border-b-2 w-[25%]' type="text" placeholder="Code" name="code" value={formData.code} onChange={handleInputChange} required />  
                        <input className='mt-10 p-2 border-b-2 w-[25%]' type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required />  
                        <input className='mt-10 p-2 border-b-2 w-[25%]' type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} required />  
                        <input className='mt-10 p-2 border-b-2 w-[25%]' type="password" placeholder="Password Repeat" name="password_repeat" value={formData.password_repeat} onChange={handleInputChange} required />    
                        <button className='text-white mt-16 border-2 py-4 px-12 rounded-full bg-gradient-to-br from-fuchsia-600 to-indigo-500 opacity-75' type="submit">Confirm new password</button>   
                    </div>   
                </form> 
            </div>
        </div>
    );
};

export default ResetPassword;
