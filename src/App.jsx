import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./styles/GlobalStyles";
import AuthLayout from "./UI/AuthLayout";
import AppLayout from "./UI/AppLayout";
import ProtectedRoutes from "./UI/ProtectedRoutes";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Account from "./pages/Account";
import Leaves from "./pages/Leaves";
import Students from "./pages/Students";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoutes allowedRoles={["student"]}>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/:studentRef/leaves" element={<Leaves />} />
          </Route>

          <Route
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Navigate to="students"></Navigate>}></Route>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="/leaves" element={<Leaves />} />
            <Route path="students" element={<Students />} />
            <Route path="/:studentRef/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            color: "var(--color-gray-7)",
            backgroundColor: "var(--color-gray)",
            padding: "1rem 1.5rem",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
