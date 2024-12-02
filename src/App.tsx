import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/homePage/HomePage";
import ListEvents from './pages/ListEvents/ListEvents';
import ListSweeptakes from './pages/ListSweeptakes/ListSweeptakes';
import ListTickets from './pages/ListTickets/ListTickets';
import ListRaffles from './pages/ListRaffles/ListRaffles';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Events" element={<ListEvents/>}/>
        <Route path="/Sweeptakes" element={<ListSweeptakes/>}/>
        <Route path="/Tickets" element={<ListTickets/>}/>
        <Route path="/Raffles" element={<ListRaffles/>}/>
      </Routes>
    </Router>
  )
}
