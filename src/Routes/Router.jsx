import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Authentication/SignInRoute";
import SignUp from "./Authentication/SignUpRoute";
import Verification from "./Authentication/Verification";
import Posts from "./Posts/PostsRoute";
import Layout from "./Layout/Layout";

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
                </Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;