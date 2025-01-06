import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerLogin from './Components/Customer/CustomerLogin';
import MainLogin from './Components/MainLogin';
import CustomerSignup from './Components/Customer/CustomerSignup';
import AdminSignup from './Components/Admin/AdminSignup';
import RenterLogin from './Components/Renter/RenterLogin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import RenterSignup from './Components/Renter/RenterSignup';
import Dashboard from './Components/Customer/Dashboard';
import AdminLogin from './Components/Admin/AdminLogin';
import Customers from './Components/Admin/Customers';
import Renters from './Components/Admin/Renters';
import RenterDashboard from './Components/Renter/RenterDashboard';
function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<MainLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/customer-signup" element={<CustomerSignup />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/renter-login" element={<RenterLogin />} />
        <Route path="/renter-signup" element={<RenterSignup />} />
        <Route path="/customerDashboard" element={<Dashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/renterDashboard" element={<RenterDashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/renters" element={<Renters/>} />
      </Routes>
    </Router>
  );
}

export default App;
