import { useState } from 'react';
import motionWhite from '../../assets/images/logo_white.png';
import { useNavigate } from 'react-router-dom';
import { api } from '../../API/api';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }
    const handleSignUp = () => {
        navigate('/signup');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = api.post("/auth/password-reset/", {email})
            console.log(res);
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

                <form className='mt-40' onSubmit={handleSubmit}>  
                    <div className='flex flex-col items-center'>     
                        <h1 className='text-5xl'>Forgot Password?</h1>  
                        <input className='mt-10 p-2 border-b-2' type="email" placeholder="Email" name="email" value={email} onChange={handleEmail} required />  
                        <button className='text-white mt-16 border-2 py-4 px-20 rounded-full bg-gradient-to-br from-fuchsia-600 to-indigo-500 opacity-75' type="submit">Send Code</button>   
                    </div>   
                </form> 
            </div>
        </div>
    );
};

export default ForgotPassword;
