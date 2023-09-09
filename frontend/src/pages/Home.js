import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
	const { workouts, dispatch } = useWorkoutsContext();
	const { user } = useAuthContext();

	useEffect(() => {
		const fetchWorkouts = async () => {
			const response = await fetch("/api/workouts", {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			const json = await response.json();

			if (response.ok) {
				dispatch({ type: "SET_WORKOUTS", payload: json });
			}
		};

		if (user) {
			fetchWorkouts();
		}

		return;
	}, [dispatch, user]);

	let bicepsAndShoulders;
	let chest;

	if (workouts) {
		chest = workouts.filter((eachWorkout, index) => {
			return eachWorkout.workoutTitle === "chest";
		})

		bicepsAndShoulders = workouts.filter((eachWorkout, index) => {
			return eachWorkout.workoutTitle === "biceps-and-shoulders";
		})

	}



	return (
		<div className="home">
			<div className="chest">
			<h4 className="capitalize">Chest</h4>
				
				{chest &&
					chest.map((workout) => (
						<WorkoutDetails key={workout._id} workout={workout} />
					))}
			</div>
			
			<div className="biceps">
			<h4 className="capitalize">Biceps and Shoulders</h4>
				{bicepsAndShoulders &&
					bicepsAndShoulders.map((workout) => (
						<WorkoutDetails key={workout._id} workout={workout} />
					))}
			</div>
			<WorkoutForm />
		</div>
	);
};

export default Home;
