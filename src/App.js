import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

/* components */ 
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'
import Message from './components/layout/Message'

/* pages */
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'
import Profile from './components/pages/User/Profile'
import MyInstruments from './components/pages/Instrument/MyInstruments'
import AddInstrument from './components/pages/Instrument/AddInstrument'
import EditInstrument from './components/pages/Instrument/EditInstrument'
import InstrumentDetails from './components/pages/Instrument/InstrumentDetails'
import MyChanges from './components/pages/Instrument/MyChanges'

/* context */
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <Router>
      <UserProvider>
      <Navbar />
      <Message />
      <Container>
     <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/instrument/myinstruments" element={<MyInstruments />} />
      <Route path="/instrument/add" element={<AddInstrument />} />
      <Route path="/instrument/edit/:id" element={<EditInstrument />} />
      <Route path="/instrument/mychanges" element={<MyChanges />} />
      <Route path="/instrument/:id" element={<InstrumentDetails />} />
      <Route path="/" element={<Home />} />
     </Routes>
     </Container>
     <Footer />
     </UserProvider>
    </Router>
  )
}

export default App;
