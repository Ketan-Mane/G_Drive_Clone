import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
const App = () => {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Toaster />
				<Outlet />
			</QueryClientProvider>
		</>
	);
};

export default App;
