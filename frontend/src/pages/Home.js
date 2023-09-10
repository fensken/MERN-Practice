import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
	let bicepsAndShoulders = null;
	let chest = null;
	let leg = null;
	let cardio = null;

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

	if (workouts) {
		chest = workouts.filter((eachWorkout, index) => {
			return eachWorkout.workoutTitle === "chest";
		});

		bicepsAndShoulders = workouts.filter((eachWorkout, index) => {
			return eachWorkout.workoutTitle === "biceps-and-shoulders";
		});

		leg = workouts.filter((eachWorkout, index) => {
			return eachWorkout.workoutTitle === "leg";
		});

		cardio = workouts.filter((eachWorkout, index) => {
			return eachWorkout.workoutTitle === "cardio";
		});
	}

	return (
		<div className="home">
			<div className="workouts">
				{chest && chest.length > 0 && (
					<div className="chest">
						<h4 className="capitalize">Chest</h4>

						{chest.map((workout) => (
							<WorkoutDetails key={workout._id} workout={workout} />
						))}
					</div>
				)}

				{bicepsAndShoulders && bicepsAndShoulders.length > 0 && (
					<div className="biceps">
						<h4 className="capitalize">Biceps and Shoulders</h4>
						{bicepsAndShoulders.map((workout) => (
							<WorkoutDetails key={workout._id} workout={workout} />
						))}
					</div>
				)}

				{leg && leg.length > 0 && (
					<div className="leg">
						<h4 className="capitalize">Legs</h4>
						{leg.map((workout) => (
							<WorkoutDetails key={workout._id} workout={workout} />
						))}
					</div>
				)}

				{cardio && cardio.length > 0 && (
					<div className="cardio">
						<h4 className="capitalize">Cardio</h4>
						{cardio.map((workout) => (
							<WorkoutDetails key={workout._id} workout={workout} />
						))}
					</div>
				)}
			</div>
			<WorkoutForm />
		</div>
	);
};

export default Home;
