import { BrowserRouter,Routes,Route } from 'react-router-dom';
import logo from './logo.svg';
import Register from '../src/components/pages/Register';
import GymDetails from '../src/components/pages/GymDetails';
import OperatingDetails from '../src/components/pages/OperatingDetails';
import LocationDetails from '../src/components/pages/LocationDetails';
import MediaMembershipDetails from '../src/components/pages/MediaMembership';
import OwnerLogin from "../src/components/pages/OwnerLogin";
import OwnerDashboard from './components/pages/OwnerDashboard';
import UserLogin from './components/pages/UserLogin';
import UserDashboard from './components/pages/UserDashboard';

function App() {

  return (
   <BrowserRouter> 
    <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/gym/details" element={<GymDetails/>}></Route>
      <Route path='/Operating/details' element={<OperatingDetails/>}></Route>
      <Route path='/location/details' element={<LocationDetails/>}></Route>
      <Route path='/media/membership' element={<MediaMembershipDetails/>}></Route>
      <Route path='/' element={<OwnerLogin/>}></Route>
      <Route path='/owner/dashboard' element={<OwnerDashboard/>}></Route>
      <Route path='/user/login' element={<UserLogin/>}></Route>
      <Route path='/user/dashboard' element={<UserDashboard/>}></Route>
    </Routes>
   
   </BrowserRouter>
  );
}

export default App;
