import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/public/LandingPage'
import { RegistrationPage } from './pages/public/RegistrationPage'
import { FarmerRegistration } from './pages/public/FarmerRegistration'
import { ShopRegistration } from './pages/public/ShopRegistration'
import { LoginPage } from './pages/public/LoginPage'
import { PublicLayout } from './components/layout/PublicLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/register/farmer" element={<FarmerRegistration />}/>
          <Route path="/register/shop" element={<ShopRegistration />}/>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
