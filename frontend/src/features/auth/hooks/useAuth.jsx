import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authAPI";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../authSlice";
import { setRootFolderId } from "@/features/files/fileSlice";

const useAuth = () => {
	const dispatch = useDispatch();
	const { data: user, isLoading } = useQuery({
		queryKey: ["auth"],
		queryFn: getCurrentUser,
		retry: false,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (user) {
			dispatch(login(user));
			dispatch(setRootFolderId(user?.rootFolder));
		}
	}, [user]);

	return { user, isLoggedIn: !!user, isLoading };
};

export default useAuth;
