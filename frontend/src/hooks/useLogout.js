import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
	const { dispach } = useAuthContext();
	const { dispatch: workoutsDispatch } = useWorkoutsContext();

	const logout = async () => {
		// remove user from local storage
		localStorage.removeItem("user");

		// dispach logout action
		dispach({ type: "LOGOUT" });
		workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
	};

	return { logout };
};
