import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, ShoppingBag, DollarSign, Receipt, XCircle, UserCheck, Gift } from 'lucide-react';
import { mockDashboardStats, mockOrders, mockCustomers } from '../data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function Dashboard() {
  const stats = mockDashboardStats;
  const totalCustomers = mockCustomers.filter(c => c.active).length;
  const totalPoints = mockCustomers.reduce((sum, c) => sum + c.points, 0);
  const revenueTarget = 150_000;
  const revenuePct = stats.revenue > 0 ? Math.min(100, (stats.revenue / revenueTarget) * 100) : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Visão geral do sistema de totems</p>
        </div>
        <Select defaultValue="current-month">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Hoje</SelectItem>
            <SelectItem value="7-days">Últimos 7 dias</SelectItem>
            <SelectItem value="current-month">Mês atual</SelectItem>
            <SelectItem value="custom">Período customizado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Faturamento (Hero) */}
      <Card className="relative overflow-hidden border-primary/20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />
        <CardHeader className="relative flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-base sm:text-lg font-semibold">Faturamento</CardTitle>
            <CardDescription className="text-sm">Janeiro 2026</CardDescription>
          </div>
          <div className="rounded-lg bg-primary/10 p-2">
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <div className="space-y-2">
            <div className="text-primary font-extrabold tabular-nums tracking-tight leading-none whitespace-nowrap truncate text-[clamp(1.8rem,4.2vw,3.1rem)]">
              {formatCurrency(stats.revenue)}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm">
              <span className="text-muted-foreground">
                Meta do mês: <span className="font-medium text-foreground tabular-nums">{formatCurrency(revenueTarget)}</span>
              </span>
              <span className="font-semibold text-foreground tabular-nums">{Math.round(revenuePct)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${revenuePct}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground mb-1">Média/dia</p>
              <p className="text-sm sm:text-base font-semibold tabular-nums truncate">
                {formatCurrency(stats.revenue / 30)}
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground mb-1">Vendas/dia</p>
              <p className="text-sm sm:text-base font-semibold tabular-nums">{Math.round(stats.orders / 30)}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground mb-1">Ticket médio</p>
              <p className="text-sm sm:text-base font-semibold tabular-nums truncate">
                {formatCurrency(stats.averageTicket)}
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground mb-1">Aprovação</p>
              <p className="text-sm sm:text-base font-semibold tabular-nums">
                {stats.orders > 0 ? Math.round((stats.approvedOrders / stats.orders) * 100) : 0}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Outras métricas (segunda linha) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nº de Vendas</CardTitle>
            <ShoppingBag className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stats.orders}</div>
            <p className="text-xs text-muted-foreground mt-1">Pedidos realizados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-accent font-bold tabular-nums tracking-tight leading-none whitespace-nowrap truncate text-[clamp(1.05rem,2.2vw,1.75rem)]">
              {formatCurrency(stats.averageTicket)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Por pedido</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovadas</CardTitle>
            <Receipt className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-primary">{stats.approvedOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Pagas com sucesso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Canceladas</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-destructive">{stats.cancelledOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Pedidos cancelados</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts - Responsivo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Receita por Forma de Pagamento</CardTitle>
            <CardDescription className="text-sm">Distribuição de vendas por método</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.paymentMethods.map((method, index) => {
                const colors = ['bg-primary', 'bg-secondary', 'bg-accent'];
                const percentage = (method.revenue / stats.revenue * 100).toFixed(1);
                
                return (
                  <div key={method.method} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium truncate">{method.method}</span>
                      <span className="text-muted-foreground ml-2">{percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`${colors[index % colors.length]} h-2 rounded-full transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">{method.quantity} vendas</span>
                      <span className="font-semibold">{formatCurrency(method.revenue)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Top 5 Produtos</CardTitle>
            <CardDescription className="text-sm">Produtos mais vendidos por receita</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topProducts.map((product, index) => {
                const maxRevenue = Math.max(...stats.topProducts.map(p => p.revenue));
                const percentage = (product.revenue / maxRevenue * 100);
                
                return (
                  <div key={product.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="font-medium truncate">{product.name}</span>
                      </div>
                      <span className="text-muted-foreground ml-2 flex-shrink-0">{product.quantity} un.</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-end">
                      <span className="font-semibold text-xs sm:text-sm">{formatCurrency(product.revenue)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Pedidos Recentes</CardTitle>
          <CardDescription className="text-sm">Últimos pedidos realizados nos totems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4 last:border-0">
                <div className="space-y-1 flex-1 min-w-0">
                  <p className="font-medium">Pedido #{order.id}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'itens'} • {
                      order.paymentMethod === 'pix' ? 'PIX' :
                      order.paymentMethod === 'credit_card' ? 'Cartão de Crédito' :
                      'Cartão de Débito'
                    }
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                  <p className="font-bold text-lg sm:text-xl">{formatCurrency(order.total)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                    order.status === 'paid' ? 'bg-primary/10 text-primary' :
                    order.status === 'pending_payment' ? 'bg-accent/10 text-accent' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {order.status === 'paid' ? 'Pago' :
                     order.status === 'pending_payment' ? 'Aguardando' :
                     'Cancelado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              Programa Fast+ (Fidelidade)
            </CardTitle>
            <CardDescription className="text-sm">R$ 1,00 = 10 pontos acumulados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Clientes Cadastrados</p>
                  <p className="text-3xl font-bold text-primary">{totalCustomers}</p>
                </div>
                <UserCheck className="h-12 w-12 text-primary opacity-50" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Pontos Distribuídos</p>
                  <p className="text-3xl font-bold text-accent">{totalPoints.toLocaleString('pt-BR')}</p>
                </div>
                <Gift className="h-12 w-12 text-accent opacity-50" />
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-3">Top 3 Clientes</p>
                <div className="space-y-2">
                  {mockCustomers
                    .sort((a, b) => b.points - a.points)
                    .slice(0, 3)
                    .map((customer, index) => (
                      <div key={customer.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="w-5 h-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="truncate">{customer.name}</span>
                        </div>
                        <span className="font-semibold text-accent ml-2">
                          {customer.points.toLocaleString('pt-BR')} pts
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Resumo de Performance</CardTitle>
            <CardDescription className="text-sm">Métricas consolidadas do período</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Taxa de Aprovação</span>
                  <span className="font-semibold">
                    {stats.orders > 0 ? Math.round((stats.approvedOrders / stats.orders) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${stats.orders > 0 ? (stats.approvedOrders / stats.orders) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Média/Dia</p>
                  <p className="text-lg font-bold">{formatCurrency(stats.revenue / 30)}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Vendas/Dia</p>
                  <p className="text-lg font-bold">{Math.round(stats.orders / 30)}</p>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">PIX</span>
                  <span className="font-semibold">
                    {stats.paymentMethods[0] ? Math.round((stats.paymentMethods[0].revenue / stats.revenue) * 100) : 0}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Cartões</span>
                  <span className="font-semibold">
                    {stats.paymentMethods[1] && stats.paymentMethods[2] 
                      ? Math.round(((stats.paymentMethods[1].revenue + stats.paymentMethods[2].revenue) / stats.revenue) * 100)
                      : 0}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}