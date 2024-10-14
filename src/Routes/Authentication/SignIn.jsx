import { useState } from 'react';
// import { useEffect } from 'react';
import motionWhite from '../../assets/images/logo_white.png';
import { useNavigate } from 'react-router-dom';
import { api } from '../../API/api';
import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import { login } from '../../Store/Slices/userSlice';
// import { selectDetails } from '../../Store/Slices/userSlice';

const Login = () => {
    const [email, setEmailValue] = useState('');
    const [password, setPasswordValue] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const userDetails = useSelector(selectDetails);

    const handleSignUp = () => {
        navigate('/signup');
    };
    const handleEmail = (e) => {
        setEmailValue(e.target.value);
    };
    const handlePassword = (e) => {
        setPasswordValue(e.target.value);
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("auth/token/", { email, password });
            const accessToken = res.data.access;
            localStorage.setItem("accessToken", accessToken);

            const token = localStorage.getItem("accessToken");
            const userDetailsResponse = await api.get("/users/me/", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const userDetails = userDetailsResponse.data;
            localStorage.setItem("userDetails", JSON.stringify(userDetails));

            dispatch(login({ accessToken, details: userDetails }));

            // console.log('User details:', userDetails);
            navigate('/posts');
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     if (userDetails) {
    //         console.log('User details from redux store: ', userDetails);
    //     }
    // }, [userDetails]);

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

                <form className='mt-40' onSubmit={handleSignInSubmit}>  
                    <div className='flex flex-col items-center'>     
                        <h1 className='text-5xl'>Sign In</h1>
                        <input className='mt-10 p-2 border-b-2' type="email" placeholder="Email" name="email" value={email} onChange={handleEmail} required />  
                        <input className='mt-10 p-2 border-b-2' type="password" placeholder="Password" name="password" value={password} onChange={handlePassword} required />  
                        <a className='mt-8 text-xs text-gray' href='/forgotpassword'>Forgot password? </a>   
                        <button className='text-white mt-16 border-2 py-4 px-20 rounded-full bg-gradient-to-br from-fuchsia-600 to-indigo-500 opacity-75' type="submit">Sign In</button> 
                    </div>   
                </form> 
            </div>
        </div>
    );
};

export default Login;
