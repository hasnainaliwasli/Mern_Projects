import { Route, Routes } from 'react-router-dom';
import AuthLayout from './components/auth/layout';
import SignIn from './pages/auth/signIn';
import SignUp from './pages/auth/signUp';
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminFeatures from './pages/admin-view/features';
import AdminProducts from './pages/admin-view/products';
import AdminOrders from './pages/admin-view/orders';

function App() {
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      {/* Common components */}
      <h1>Header Components</h1>
      <Routes>
        {/* Authentication Routes */}
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
        </Route>

        {/* Admin Routes */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='features' element={<AdminFeatures />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrders />} />

        </Route>

      </Routes>
    </div>
  );
}

export default App;
