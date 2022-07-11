import React from "react";
import ReactDOM from "react-dom/client";
import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Sidebar from "./component/Sidebar";
import Legenda from "./component/Legenda";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="/" element={<App />}>
						<Route index element={<Home />} />
						<Route path="nav" element={<Sidebar />} />
						<Route path="legend" element={<Legenda />} />
					</Route>
				</Routes>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>,
);

reportWebVitals(sendToVercelAnalytics);
