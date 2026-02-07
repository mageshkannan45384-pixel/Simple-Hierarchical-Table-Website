// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import AppRoutes from "./routes/AppRoutes";
// import ErrorBoundary from "./components/ErrorBoundary";
// import { logout } from "./features/auth/authSlice";
// import { isTokenExpired } from "./utils/jwt";
import ReactExercise from "./components/ReactExercise";

const App = () => {
  // const dispatch = useDispatch();

  // 🔐 Auto logout if JWT expired
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token && isTokenExpired(token)) {
  //     dispatch(logout());
  //   }
  // }, [dispatch]);

  return (
    // <ErrorBoundary>
      // <AppRoutes />
      <ReactExercise />
    // </ErrorBoundary>
  );
};

export default App; // ✅ THIS LINE FIXES THE ERROR
