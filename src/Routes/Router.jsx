import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Authentication/SignInRoute";
import SignUp from "./Authentication/SignUpRoute";

const Router = () => {
    return (
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />}  />
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;