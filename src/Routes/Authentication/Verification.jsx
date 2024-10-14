import { useState } from 'react';
import motionWhite from '../../../public/assets/images/logo_white.png';
import { useNavigate } from 'react-router-dom';
import { api } from '../../API/api';


const Verification = () => {
    // const [validationCode, setValidationCode] = useState("");
    // const [email, setEmail] = useState("");
    // const [firstName, setFirstName] = useState("");
    // const [password, setPassword] = useState("");
    // const [username, setUsername] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [passwordRepeat, setPasswordRepeat] = useState("");
    const [formData, setFormData] = useState({
        validationCode:"",
        email:"",
        firstName:"",
        password:"",
        username:"",
        lastName:"",
        passwordRepeat:""
    });
    const navigate = useNavigate();

    // const handleValidationCode = (e) => {
    //     setValidationCode(e.target.value);
    // }
    // const handleEmail = (e) => {
    //     setEmail(e.target.value);
    // }
    // const handleFirstName = (e) => {
    //     setFirstName(e.target.value);
    // }
    // const handlePassword = (e) => {
    //     setPassword(e.target.value);
    // }
    // const handleUserName = (e) => {
    //     setUsername(e.target.value);
    // }
    // const handleLastName = (e) => {
    //     setLastName(e.target.value);
    // }
    // const handlePasswordRepeat = (e) => {
    //     setPasswordRepeat(e.target.value);
    // }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const { email, username, validationCode, password, passwordRepeat, firstName, lastName } = formData;
        try {
            const res = api.patch("/auth/registration/validation/", {email, username, validationCode, password, passwordRepeat, firstName, lastName});
            console.log(res);
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="flex h-screen">
            <div className="relative flex flex-col w-2/5 bg-auth-bgImage bg-cover">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-700 to-indigo-500 opacity-60"></div>
                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className='flex flex-col items-center'>
                        <img src={motionWhite} alt="motion logo" className="w-16" />
                        <h1 className='font-bold text-white text-3xl'>Motion</h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-3/5 mt-4 justify-start">

                <form className='mt-20' onSubmit={handleSubmit} >  
                    <div className='flex flex-col items-center'>     
                        <h1 className='text-5xl'>Verification</h1>
                        <input className='mt-10 p-2 border-b-2' type="text" placeholder="Validation Code" name="validationcode" value={formData.validationCode} onChange={handleInputChange} required />
                        <div className='grid grid-rows-3 grid-flow-col gap-6'>
                            <input className='mt-10 p-2 border-b-2' type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required />
                            <input className='mt-10 p-2 border-b-2' type="text" placeholder="First Name" name="firstname" value={formData.firstName} onChange={handleInputChange} required />
                            <input className='mt-10 p-2 border-b-2' type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} required />
                            <input className='mt-10 p-2 border-b-2' type="text" placeholder="Username" name="username" value={formData.username} onChange={handleInputChange} required />
                            <input className='mt-10 p-2 border-b-2' type="text" placeholder="Last Name" name="lastname" value={formData.lastName} onChange={handleInputChange} required />
                            <input className='mt-10 p-2 border-b-2' type="password" placeholder="Password Repeat" name="passwordrepeat" value={formData.passwordRepeat} onChange={handleInputChange} required />
                        </div>
                        <button className='text-white mt-16 border-2 py-4 px-20 rounded-full bg-gradient-to-br from-fuchsia-600 to-indigo-500 opacity-75' type="submit">Complete</button>   
                    </div>   
                </form> 
            </div>
        </div>
    );

}

export default Verification;