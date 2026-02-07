import { useSelector } from "react-redux";

const useAuth = () => {
    // const { user, token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);

    return {
        // isAuthenticated: Boolean(token),
        // user,
        // role: user?.role,
        isAdmin: user?.role === "admin",
        isViewer: user?.role === "viewer",
    };
};

export default useAuth;
