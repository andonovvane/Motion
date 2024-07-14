import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Authentication/SignInRoute";
import SignUp from "./Authentication/SignUpRoute";
import Verification from "./Authentication/Verification";
import Posts from "./Posts/PostsRoute";
import Layout from "./Layout/Layout";
import FindFriends from "./FindFriends/FindFriendsRoute";
import UserProfile from "./Profile/ProfileRoute";
import EditUserProfile from "./Profile/EditUserRoute";

const Router = () => {
    return (
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />}  />
                <Route path="/verification" element={<Verification />} />
                <Route element={<Layout />}>
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/findfriends" element={<FindFriends /> } />
                    <Route path="/userprofile" element={<UserProfile />} />
                    <Route path="/editprofile" element={<EditUserProfile />} />
                </Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;