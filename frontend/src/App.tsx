import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/public/LandingPage'
import { RegistrationPage } from './pages/public/RegistrationPage'
import { FarmerRegistration } from './pages/public/FarmerRegistration'
import { ShopRegistration } from './pages/public/ShopRegistration'
import { LoginPage } from './pages/public/LoginPage'
import { PublicLayout } from './components/layout/PublicLayout'


import FarmerLayout from './components/farmer/FarmerLayout';
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import FarmerProfile from './pages/farmer/FarmerProfile';
import FarmerCrops from './pages/farmer/FarmerCrops';
import FarmerProducts from './pages/farmer/FarmerProducts';
import FarmerOrders from './pages/farmer/FarmerOrders';
import FarmerAIInsights from './pages/farmer/FarmerAIInsights';

import ShopOwnerDashboard from './pages/shopowner/ShopOwnerDashboard';
import ShopOwnerProfile from './pages/shopowner/ShopOwnerProfile';

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
          <Route path="/farmer/dashboard" element={<FarmerLayout><FarmerDashboard /></FarmerLayout>}/>
          <Route path="/farmer/profile" element={<FarmerLayout><FarmerProfile /></FarmerLayout>}/>
          <Route path="/farmer/crops" element={<FarmerLayout><FarmerCrops /></FarmerLayout>}/>
          <Route path="/farmer/products" element={<FarmerLayout><FarmerProducts /></FarmerLayout>}/>
          <Route path="/farmer/orders" element={<FarmerLayout><FarmerOrders /></FarmerLayout>}/>
          <Route path="/farmer/ai-insights" element={<FarmerLayout><FarmerAIInsights /></FarmerLayout>}/>
          <Route path="/shop/dashboard" element={<ShopOwnerDashboard />} />
          <Route path="/shop/profile" element={<ShopOwnerProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
