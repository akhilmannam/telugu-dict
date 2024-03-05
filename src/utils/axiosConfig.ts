// Write base URL configuration for axios here
import axios from "axios";

const instance = axios.create({
	baseURL: import.meta.env.VITE_EXPRESS_URL,
});

export default instance;
