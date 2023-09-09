import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
	const { dispatch } = useWorkoutsContext();
	const { user } = useAuthContext();

	const [workoutTitle, setWorkoutTitle] = useState("chest");
	const [title, setTitle] = useState("");
	const [load, setLoad] = useState("");
	const [reps, setReps] = useState("");
	const [error, setError] = useState(null);
	const [emptyFields, setEmptyFields] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user) {
			setError("You must be logged in.");
			return;
		}

		console.log(workoutTitle);

		const workout = { workoutTitle, title, load, reps };

		const response = await fetch("/api/workouts", {
			method: "POST",
			body: JSON.stringify(workout),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
		});
		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
			setEmptyFields(json.emptyFields);
		}
		if (response.ok) {
			setTitle("");
			setLoad("");
			setReps("");
			setWorkoutTitle("chest")
			setError(null);
			setEmptyFields([]);
			console.log("new workout added", json);
			dispatch({ type: "CREATE_WORKOUT", payload: json });
		}
	};

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a New Workout</h3>

			<label htmlFor="workout-options">Select a mooscles group:</label>
			<select
				name="Workout Plans"
				id="workout-options"
				onChange={(e) => setWorkoutTitle(e.target.value)}
				className={`workout-options`}
				value={workoutTitle}
			>
				<option value="chest">Chest</option>
				<option value="biceps-and-shoulders">Biceps & Shoulders</option>
				<option value="leg">Leg</option>
				<option value="cardio">Cardio</option>
			</select>

			<label>Exercise Title:</label>
			<input
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				className={emptyFields.includes("title") ? "error" : ""}
			/>

			<label>Load (in kg):</label>
			<input
				type="number"
				onChange={(e) => setLoad(e.target.value)}
				value={load}
				className={emptyFields.includes("load") ? "error" : ""}
			/>

			<label>Reps:</label>
			<input
				type="number"
				onChange={(e) => setReps(e.target.value)}
				value={reps}
				className={emptyFields.includes("reps") ? "error" : ""}
			/>

			<button>Add Workout</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default WorkoutForm;
