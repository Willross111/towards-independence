import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import LivingIndependently from '@/pages/LivingIndependently';
import Identification from '@/pages/Identification';
import SupportServices from '@/pages/SupportServices';
import MajorCosts from '@/pages/MajorCosts';
import BudgetCalculator from '@/pages/BudgetCalculator';
import Accommodation from '@/pages/Accommodation';
import Transport from '@/pages/Transport';
import Resources from '@/pages/Resources';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      {/* Add your page Route elements here */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/living-independently" element={<LivingIndependently />} />
        <Route path="/identification" element={<Identification />} />
        <Route path="/support-services" element={<SupportServices />} />
        <Route path="/major-costs" element={<MajorCosts />} />
        <Route path="/budget-calculator" element={<BudgetCalculator />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/resources" element={<Resources />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App