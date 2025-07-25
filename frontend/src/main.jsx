import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";

createRoot(document.getElementById("root")).render(
	// <StrictMode>
	<Provider store={store}>
		<RouterProvider router={AppRouter} />
	</Provider>
	// </StrictMode>
);
