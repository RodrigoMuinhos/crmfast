import { 
  LayoutDashboard, 
  Store, 
  Monitor, 
  Package, 
  ShoppingBag, 
  Users,
  UserCheck,
  Settings,
  LogOut,
  Menu,
  Moon,
  Sun
} from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './ui/sheet';
import { VisuallyHidden } from './ui/visually-hidden';
import { useState } from 'react';
import { useTheme } from './theme-provider';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  collapsed?: boolean;
  onLogout?: () => void;
}

export function Sidebar({
  activeView,
  onViewChange,
  collapsed = false,
  onLogout,
}: SidebarProps) {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'stores', label: 'Lojas', icon: Store },
    { id: 'totems', label: 'Totems', icon: Monitor },
    { id: 'products', label: 'Catálogo', icon: Package },
    { id: 'orders', label: 'Pedidos', icon: ShoppingBag },
    { id: 'customers', label: 'Clientes Fast+', icon: UserCheck },
    { id: 'users', label: 'Operadores', icon: Users },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const handleViewChange = (view: string) => {
    onViewChange(view);
    setOpen(false);
  };

  const SidebarContent = ({ isCollapsed }: { isCollapsed: boolean }) => (
    <div className="flex flex-col h-full bg-secondary text-secondary-foreground">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <Logo className="text-white" size="small" showText={!isCollapsed} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          const buttonEl = (
            <button
              key={item.id}
              onClick={() => handleViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 h-12 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                isCollapsed
                  ? 'justify-center px-3'
                  : ''
              } ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={22} />
              {!isCollapsed && <span className="font-medium text-[15px]">{item.label}</span>}
            </button>
          );
          
          return isCollapsed ? (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>{buttonEl}</TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                {item.label}
              </TooltipContent>
            </Tooltip>
          ) : (
            buttonEl
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="w-full h-12 flex items-center justify-center px-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                onClick={onLogout}
                type="button"
              >
                <LogOut size={22} />
                <span className="sr-only">Sair</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
              Sair
            </TooltipContent>
          </Tooltip>
        ) : (
          <button
            className="w-full h-12 flex items-center gap-3 px-4 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            onClick={onLogout}
            type="button"
          >
            <LogOut size={22} />
            <span className="font-medium text-[15px]">Sair</span>
          </button>
        )}

        {!isCollapsed && (
          <div className="px-4 text-xs text-sidebar-foreground opacity-70">
            <p className="font-medium">Admin Master</p>
            <p className="truncate">admin@fastmarket.com</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile - Botão hambúrguer */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b px-4 py-3 flex items-center justify-between">
        <Logo size="small" />
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="iconLg"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="iconLg">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64" aria-describedby="navigation-description">
              <VisuallyHidden>
                <SheetTitle>Menu de Navegação</SheetTitle>
                <SheetDescription id="navigation-description">
                  Navegue pelas diferentes seções do sistema FastMarket
                </SheetDescription>
              </VisuallyHidden>
              <SidebarContent isCollapsed={false} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop - Sidebar fixa */}
      <div className={`hidden lg:block border-r transition-[width] duration-200 ease-linear ${collapsed ? 'w-20' : 'w-64'}`}>
        <SidebarContent isCollapsed={collapsed} />
      </div>
    </>
  );
}