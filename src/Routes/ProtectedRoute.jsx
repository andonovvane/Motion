import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("accessToken")));

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(Boolean(localStorage.getItem("accessToken")));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        console.log("Is Logged In:", isLoggedIn);
        console.log("Current Location:", location.pathname);
    }, [isLoggedIn, location]);

    if (!isLoggedIn) {
        return <Navigate to="/" state={{ origin: location.pathname }} replace />;
    }

    return <Outlet />;
}
