import { Route, Routes } from 'react-router-dom';
import AuthLayout from './components/auth/layout';
import SignIn from './pages/auth/signIn';
import SignUp from './pages/auth/signUp';
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminFeatures from './pages/admin-view/features';
import AdminProducts from './pages/admin-view/products';
import AdminOrders from './pages/admin-view/orders';
import ShoppingLayout from './components/shopping-view/layout';
import NotFound from './pages/not-found';
import ShopingHome from './pages/shopping-view/home';
import ShopingListing from './pages/shopping-view/listing';
import ShopingCheckout from './pages/shopping-view/checkout';
import ShopingAccount from './pages/shopping-view/account';
import CheckAuth from './components/common/check-auth';
import Unauthorized from './pages/unauthorized';

function App() {

  const isAuthenticated = true;
  const user = {
    name: "hasnain",
    role: "user"
  };

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        {/* Authentication Routes */}
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
        </Route>

        {/* Admin Routes */}
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='features' element={<AdminFeatures />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrders />} />
        </Route>

        {/* Shopping Routes */}
        <Route path='/shopping' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        } >
          <Route path='home' element={<ShopingHome />} />
          <Route path='listing' element={<ShopingListing />} />
          <Route path='checkout' element={<ShopingCheckout />} />
          <Route path='account' element={<ShopingAccount />} />
        </Route>

        {/* Not Found Page */}
        <Route path='*' element={<NotFound />} />
        <Route path='/unauthorize' element={<Unauthorized />} />
      </Routes>
    </div>
  );
}

export default App;
