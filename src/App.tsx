import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { useContext, lazy, Suspense } from 'react';
import UserContext from './context/UserContext';
const LazyLoadedLogin = lazy(() => import('./components/Login/Login'));
const LazyLoadedDashboard = lazy(() => import('./components/Dashboard/Dashboard'));

const PrivateRoute: React.FC<{ component: React.FC }> = ({
  component: Component,
}) => {
  const { user } = useContext(UserContext);
  return user ? <Component /> : <Navigate to="/login" />;
};

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/login" element={<LazyLoadedLogin />} />
          <Route path="/dashboard" element={<PrivateRoute component={LazyLoadedDashboard} />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
