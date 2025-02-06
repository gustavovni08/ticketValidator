import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/homePage/HomePage";
import ListEvents from './pages/ListEvents/ListEvents';
import ListSweeptakes from './pages/ListSweeptakes/ListSweeptakes';
import ListTickets from './pages/ListTickets/ListTickets';
import ListRaffles from './pages/ListRaffles/ListRaffles';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import FacialUploadPage from './pages/SignUpPage/FacialUploadPage';
import FacialCapturePage from './pages/SignUpPage/FacialCapturePage';
import CheckOutPage from './pages/CheckoutPage/CheckoutPage';
import PaymentPage from './pages/CheckoutPage/PaymentPage';
import SelectValidationOptions from './pages/ValidateTicket/SelectValidateOptions';
import ValidateTicket from './pages/ValidateTicket/ValidateTicket';
import { ActiveButtonProvider } from './components/global/footer/context/ActiveButtonContext';
import { SignUpContextProvider } from './contexts/SignInContext';
import { CheckOutContextProvider } from './pages/CheckoutPage/context/CheckoutContext';


export default function App() {
  return (
    <SignUpContextProvider>
          <ActiveButtonProvider>
            <CheckOutContextProvider>
              <Router>
                  <Routes>   
                      <Route path="/" element={<SignInPage/>}/>        
                      <Route path="/Settings" element={<SelectValidationOptions/>}/>
                      <Route path="/ValidateTicket" element={<ValidateTicket/>}/>
                    </Routes>
              </Router>
            </CheckOutContextProvider>
          </ActiveButtonProvider>
    </SignUpContextProvider>
  )
}
