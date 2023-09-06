import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
	const { logout } = useLogout();
	const { user } = useAuthContext();

	const handleLogout = () => {
		logout();
	};

	return (
		<header>
			<div className="container">
				<Link to="/">
					<h1>Workouts Tracker</h1>
				</Link>

				<nav>
					{user && (
						<div>
							<span>{user.email}</span>
							<button type="button" onClick={handleLogout}>
								Logout
							</button>
						</div>
					)}
					{!user && (
						<div>
							<Link to={"/login"}>Login</Link>
							<Link to={"/signup"}>Sign Up</Link>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
