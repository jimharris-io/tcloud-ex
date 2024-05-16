import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Chart from "./components/Chart";
import Feed from "./components/Feed";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Feed/>
      <Chart />
    </QueryClientProvider>
  );
}

export default App;
