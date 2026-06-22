import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import HeroSection from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import LoginForm from "./components/Users/Login";
import RegistrationForm from "./components/Users/Register";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import TransactionForm from "./components/Transactions/TransactionForm";
import Dashboard from "./components/Users/Dashboard";
import History from "./components/Users/History";
import UserProfile from "./components/Users/UserProfile";
import AuthRoute from "./components/Auth/AuthRoute";

function App() {
    const user = useSelector((state) => state?.auth?.user);
    return (
        <BrowserRouter>
            {user ? <PrivateNavbar /> : <PublicNavbar />}
            <Routes>
                <Route path="/" element={<HeroSection />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/add-transaction" element={<AuthRoute><TransactionForm/></AuthRoute>} />
                <Route path="/dashboard" element={<AuthRoute><Dashboard/></AuthRoute>} />
                <Route path="/history" element={<AuthRoute><History/></AuthRoute>} />
                <Route path="/profile" element={<AuthRoute><UserProfile/></AuthRoute>} />    
            </Routes>
        </BrowserRouter>
    )
}

export default App;