import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white">
			<h3 className="font-bold">Lesson</h3>

			<ul>
				<Link to="/" className="mr-2">
					Home
				</Link>
				<Link to="/favorite">Favorite</Link>
			</ul>
		</nav>
	);
};

export default Navigation;
