import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './components/theme-provider';
import { AppHeader } from './components/AppHeader';
import { DemoLoginView } from './components/DemoLoginView';
import { Dashboard } from './components/Dashboard';
import { StoresView } from './components/StoresView';
import { TotemsView } from './components/TotemsView';
import { ProductsView } from './components/ProductsView';
import { OrdersView } from './components/OrdersView';
import { CustomersView } from './components/CustomersView';
import { UsersView } from './components/UsersView';
import { SettingsView } from './components/SettingsView';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [demoEntered, setDemoEntered] = useState<boolean>(() => {
    try {
      if (typeof window === 'undefined') return false;
      return window.localStorage.getItem('fastmarket-demo-entered') === '1';
    } catch {
      return false;
    }
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    try {
      if (typeof window === 'undefined') return false;
      return window.localStorage.getItem('fastmarket-sidebar-collapsed') === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('fastmarket-sidebar-collapsed', sidebarCollapsed ? '1' : '0');
    } catch {
      // ignore
    }
  }, [sidebarCollapsed]);

  useEffect(() => {
    try {
      window.localStorage.setItem('fastmarket-demo-entered', demoEntered ? '1' : '0');
    } catch {
      // ignore
    }
  }, [demoEntered]);

  const handleEnterDemo = () => {
    setDemoEntered(true);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setDemoEntered(false);
    setActiveView('dashboard');
    try {
      window.localStorage.removeItem('fastmarket-demo-entered');
    } catch {
      // ignore
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'stores':
        return <StoresView />;
      case 'totems':
        return <TotemsView />;
      case 'products':
        return <ProductsView />;
      case 'orders':
        return <OrdersView />;
      case 'customers':
        return <CustomersView />;
      case 'users':
        return <UsersView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="fastmarket-theme">
      {demoEntered ? (
        <div className="flex min-h-screen bg-background">
          <Sidebar
            activeView={activeView}
            onViewChange={setActiveView}
            collapsed={sidebarCollapsed}
            onLogout={handleLogout}
          />
          <main className="flex-1 w-full lg:w-auto pt-16 lg:pt-0">
            <AppHeader
              activeView={activeView}
              sidebarCollapsed={sidebarCollapsed}
              onToggleSidebar={() => setSidebarCollapsed((v) => !v)}
              onLogout={handleLogout}
            />
            <div className="w-full max-w-[1600px] mx-auto">
              {renderView()}
            </div>
          </main>
          <Toaster />
        </div>
      ) : (
        <>
          <DemoLoginView onEnterDemo={handleEnterDemo} />
          <Toaster />
        </>
      )}
    </ThemeProvider>
  );
}