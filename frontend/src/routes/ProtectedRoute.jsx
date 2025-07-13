import Loader from "@/components/common/Loader";
import useAuth from "@/features/auth/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	const { isLoading, isLoggedIn } = useAuth();

	if (isLoading) return <Loader />;

	return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
