import Loader from "@/components/common/Loader";
import { login } from "@/features/auth/authSlice";
import { useLoginVerify } from "@/features/auth/hooks";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const {
		mutateAsync: checkIsLoggedIn,
		isPending,
		isError,
		data,
	} = useLoginVerify();

	useEffect(() => {
		const verifyLogin = async () => {
			try {
				const res = await checkIsLoggedIn();
				const { user } = res?.data;
				dispatch(login(user));
			} catch (err) {
				// Optional: toast.error("Session expired. Please log in again.");
			}
		};

		if (!isLoggedIn) {
			verifyLogin();
		}
	}, [isLoggedIn]);

	if (isPending) return <Loader />;

	if (!isLoggedIn && isError) return <Navigate to="/login" replace />;

	return isLoggedIn ? <Outlet /> : <Loader />;
};

export default ProtectedRoute;
