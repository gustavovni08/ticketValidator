import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/homePage/HomePage";
import ListEvents from './pages/ListEvents/ListEvents';
import ListSweeptakes from './pages/ListSweeptakes/ListSweeptakes';
import ListTickets from './pages/ListTickets/ListTickets';
import ListRaffles from './pages/ListRaffles/ListRaffles';
import { ActiveButtonProvider } from './components/global/footer/context/ActiveButtonContext';
import DetailsPage from './pages/DetailsPage/DetailsPage';

export default function App() {
  return (
    <ActiveButtonProvider>
      <Router>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/Events" element={<ListEvents/>}/>
            <Route path="/Sweeptakes" element={<ListSweeptakes/>}/>
            <Route path="/Tickets" element={<ListTickets/>}/>
            <Route path="/Raffles" element={<ListRaffles/>}/>        
            <Route path="/Details" element={<DetailsPage/>}/>        
        </Routes>
    </Router>
    </ActiveButtonProvider>

  )
}
