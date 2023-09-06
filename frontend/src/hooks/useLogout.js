import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
	const { dispach } = useAuthContext();

	const logout = async () => {
		// remove user from local storage
		localStorage.removeItem("user");

		// dispach logout action
		dispach({ type: "LOGOUT" });
	};

	return { logout };
};
