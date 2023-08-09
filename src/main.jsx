import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./Context/AuthProvider.jsx";
import JobsProvider from "./Context/JobsProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <JobsProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </JobsProvider>
    </AuthProvider>
  </QueryClientProvider>
);
