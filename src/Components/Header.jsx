import logoIcon from '../../public/assets/images/logo.png'
import postsLogo from '../../public/assets/svgs/posts_logo.svg'
import friendsLogo from '../../public/assets/svgs/icon-friends.svg'
// import notificationsBell from '../../public/assets/svgs/notification_bell.svg'
import profPic from '../../public/assets/svgs/avatar.svg'
import menu from '../../public/assets/svgs/menu.svg'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../Store/Slices/userSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen]= useState(false);
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const userAvatar = userDetails ? userDetails.avatar : profPic;


    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userDetails");
        localStorage.removeItem("username");
        navigate('/');
    }
    const handlePostsClick = () => {
        navigate("/posts/");
    }
    const handleFindFiendsClick = () => {
        navigate("/findfriends/");
    }
    const handleProfileClick = () => {
        navigate("/profile");
    }

    return (
        <div className="flex flex-row justify-between w-screen bg-gradient-to-b from-slate-200 to-slate-50 content-center box-border" >
            <div className="flex flex-row gap-10 w-1/2 px-10">
                <div className='flex flex-row gap-2 py-4 items-center'><img src={logoIcon} alt="" />Motion</div>
                <div className='flex flex-row gap-2  items-center ml-28 hover:border-b-2 border-indigo-600 hover:cursor-pointer' onClick={handlePostsClick}><img src={postsLogo} alt="" />Posts</div>
                <div className='flex flex-row gap-2  items-center hover:border-b-2 border-indigo-600 hover:cursor-pointer' onClick={handleFindFiendsClick}><img src={friendsLogo} alt="" />Find Friends</div>
            </div>
            <div className="w-1/2 flex gap-6 items-center justify-end mr-8">
                {/* <div className='hover: cursor-pointer py-4 px-2 hover:border-b-2 hover:border-indigo-600'><img src={notificationsBell} alt="" /></div> */}
                <div className='hover: cursor-pointer py-3 px-2  my-0 hover:border-b-2 hover:border-indigo-600 w-10 rounded-full' onClick={handleProfileClick}><img src={userAvatar} alt=""/></div>
                <div className='hover: cursor-pointer py-4 px-2 hover:border-b-2 hover:border-indigo-600' onClick={handleMenuClick}><img src={menu} alt=""/></div>
                {isMenuOpen && (
                    <div className='absolute z-10 top-14 bg-slate-200'>
                        <div className='py-1 px-6 hover: cursor-pointer hover:border-b-2 border-indigo-600' onClick={handleProfileClick}>Profile</div>
                        <div className='pb-1 px-6 hover: cursor-pointer hover:border-b-2 border-indigo-600' onClick={handleLogout}>Logout</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header;