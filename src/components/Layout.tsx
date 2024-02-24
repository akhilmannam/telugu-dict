import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { INavBar } from "../types";

export const Layout: React.FC<INavBar> = (props) => {
	return (
		<>
			<NavBar {...props} />
			<Outlet />
		</>
	);
};