import React, { createContext, useState, ReactNode } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "../utils/axiosConfig";
import { AuthContextType, IUser } from "../types";
import { toast } from "react-toastify";
import { DEFAULT_OPTIONS } from "../utils/toast";
import { redirect } from "react-router-dom";

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	const login = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			const userInfo = await axios.get(
				"https://www.googleapis.com/oauth2/v3/userinfo",
				{
					headers: {
						Authorization: `Bearer ${tokenResponse.access_token}`,
					},
				}
			);
			localStorage.setItem("token", tokenResponse.access_token);
			setUser(userInfo.data);
			// Send user info to backend to store in database
			await axios
				.post("/users", userInfo.data)
				.then(() => {
					setIsLoggedIn(true);
					toast.success("Successfully logged in", DEFAULT_OPTIONS);
          redirect("/")
				})
				.catch(() => {
					toast.error("Error logging in", DEFAULT_OPTIONS);
				});
		},
		onError: () => {
			toast.error("Error logging in", DEFAULT_OPTIONS);
		},
	});

	const logout = () => {
		googleLogout();
		setUser(null);
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
			{children}
		</AuthContext.Provider>
	);
};
