import { useMemo } from 'react';
import { ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from './theme-provider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const viewMeta: Record<string, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Visão geral do sistema de totems',
  },
  stores: {
    title: 'Lojas',
    subtitle: 'Gerencie suas lojas e configurações',
  },
  totems: {
    title: 'Totems',
    subtitle: 'Monitore e gerencie seus totems',
  },
  products: {
    title: 'Catálogo',
    subtitle: 'Cadastre e organize seus produtos',
  },
  orders: {
    title: 'Pedidos',
    subtitle: 'Acompanhe pedidos e status de pagamento',
  },
  customers: {
    title: 'Clientes Fast+',
    subtitle: 'Fidelidade, pontos e histórico',
  },
  users: {
    title: 'Operadores',
    subtitle: 'Gerencie usuários e permissões',
  },
  settings: {
    title: 'Configurações',
    subtitle: 'Ajustes do sistema',
  },
};

export function AppHeader({
  activeView,
  sidebarCollapsed,
  onToggleSidebar,
}: {
  activeView: string;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}) {
  const { theme, setTheme } = useTheme();

  const meta = useMemo(() => {
    return viewMeta[activeView] ?? viewMeta.dashboard;
  }, [activeView]);

  return (
    <header className="hidden lg:block sticky top-0 z-40 bg-background/90 backdrop-blur border-b">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="outline"
            size="iconLg"
            onClick={onToggleSidebar}
            title={sidebarCollapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>

          <div className="min-w-0">
            <h1 className="text-base font-semibold leading-tight truncate">{meta.title}</h1>
            <p className="text-xs text-muted-foreground truncate">{meta.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeView === 'dashboard' && (
            <Select defaultValue="current-month">
              <SelectTrigger className="w-[200px] h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="7-days">Últimos 7 dias</SelectItem>
                <SelectItem value="current-month">Mês atual</SelectItem>
                <SelectItem value="custom">Período customizado</SelectItem>
              </SelectContent>
            </Select>
          )}

          <Button
            variant="outline"
            size="iconLg"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={theme === 'dark' ? 'Trocar para tema claro' : 'Trocar para tema escuro'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
