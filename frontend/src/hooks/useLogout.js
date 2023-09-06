import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
	const { dispach } = useAuthContext();
	const { dispach: workoutsDispach } = useWorkoutsContext();

	const logout = async () => {
		// remove user from local storage
		localStorage.removeItem("user");

		// dispach logout action
		dispach({ type: "LOGOUT" });
		workoutsDispach({ type: "SET_WORKOUTS", payload: null });
	};

	return { logout };
};
