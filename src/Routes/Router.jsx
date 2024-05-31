import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Authentication/SignInRoute";
import SignUp from "./Authentication/SignUpRoute";
import Verification from "./Authentication/Verification";

const Router = () => {
    return (
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />}  />
                <Route path="/verification" element={<Verification />} />
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;