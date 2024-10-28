import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import Verification from "./Authentication/Verification";
import Congratulations from "./Authentication/Congratulations";
import ForgotPassword from "./Authentication/ForgotPassword";
import CodeSent from "./Authentication/CodeSent";
import ResetPassword from "./Authentication/ResetPassword";
import Posts from "./Posts/Posts";
import Layout from "./Layout/Layout";
import FindFriends from "./Friends/FindFriends";
import Profile from "./Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/verification" element={<Verification />} />
                    <Route path="/congratulations" element={<Congratulations />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/codesent" element={<CodeSent />} />
                    <Route path="/resetpassword" element={<ResetPassword />} />
                    <Route element={<ProtectedRoute />}>
                        <Route element={<Layout />}>
                            <Route path="/posts" element={<Posts />} />
                            <Route path="/findfriends" element={<FindFriends />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )

}

export default Router;