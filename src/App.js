import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StaffDashboard from "./pages/dashboards/staffDashboard";
import HodDashboard from "./pages/dashboards/HodDashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { Toaster } from "react-hot-toast";
import UpdatePassword from "./pages/forgetPassword/UpdatePassword";
import SetEmail from "./pages/forgetPassword/SetEmail";
import VerificationCode from "./pages/forgetPassword/VerificationCode";
import { AuthProvider } from "./AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <SnackbarProvider autoHideDuration={4000}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Router>
              <div>
                <Routes>
                  <Route path="/" exact element={<Login />} />
                  <Route path="/register" exact element={<Register />} />
                  <Route path="/updatepassword" element={<UpdatePassword />} />
                  <Route path="/reset-password" element={<SetEmail />} />
                  <Route
                    path="/verification-code"
                    element={<VerificationCode />}
                  />
                  <Route path="/*" element={<StaffDashboard />} />
                  <Route path="/portal/*" element={<HodDashboard />} />
                </Routes>
              </div>
            </Router>
          </AuthProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
