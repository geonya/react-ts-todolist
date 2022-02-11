import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

function Router() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Routes>
				<Route path="/" element={<App />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
