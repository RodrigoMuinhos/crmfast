import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Plus, Search, Edit, User, Gift, TrendingUp, ShoppingBag, Phone, Mail, CreditCard } from 'lucide-react';
import { mockCustomers, mockOrders, mockPointsHistory } from '../data/mockData';
import { Customer, PointsHistory } from '../types';

export function CustomersView() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.cpf.includes(searchTerm.replace(/\D/g, '')) ||
    customer.phone.includes(searchTerm.replace(/\D/g, ''))
  );

  const handleCreateCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newCustomer: Customer = {
      id: String(customers.length + 1),
      name: formData.get('name') as string,
      cpf: formData.get('cpf') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string || undefined,
      points: editingCustomer?.points || 0,
      totalPurchases: editingCustomer?.totalPurchases || 0,
      lastPurchaseDate: editingCustomer?.lastPurchaseDate,
      createdAt: editingCustomer?.createdAt || new Date(),
      active: true,
    };

    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...newCustomer, id: editingCustomer.id } : c));
    } else {
      setCustomers([...customers, newCustomer]);
    }
    
    setIsDialogOpen(false);
    setEditingCustomer(null);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsOpen(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const getCustomerOrders = (customerId: string) => {
    return mockOrders.filter(order => order.customerId === customerId);
  };

  const getCustomerPointsHistory = (customerId: string) => {
    return mockPointsHistory.filter(ph => ph.customerId === customerId);
  };

  // Estatísticas gerais
  const totalCustomers = customers.filter(c => c.active).length;
  const totalPoints = customers.reduce((sum, c) => sum + c.points, 0);
  const avgPoints = totalCustomers > 0 ? Math.round(totalPoints / totalCustomers) : 0;
  const topCustomer = customers.reduce((max, c) => c.points > max.points ? c : max, customers[0]);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Clientes Fast+</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Programa de fidelidade • R$ 1,00 = 10 pontos
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingCustomer(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCustomer ? 'Editar Cliente' : 'Cadastrar Cliente Fast+'}</DialogTitle>
              <DialogDescription>
                Preencha os dados do cliente para participar do programa de fidelidade
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateCustomer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  defaultValue={editingCustomer?.name} 
                  placeholder="João Silva" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input 
                  id="cpf" 
                  name="cpf" 
                  defaultValue={editingCustomer?.cpf} 
                  placeholder="000.000.000-00" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  defaultValue={editingCustomer?.phone} 
                  placeholder="(00) 00000-0000" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail (opcional)</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email"
                  defaultValue={editingCustomer?.email} 
                  placeholder="cliente@email.com" 
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  setEditingCustomer(null);
                }}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  {editingCustomer ? 'Salvar Alterações' : 'Cadastrar Cliente'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <User className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground mt-1">Ativos no programa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pontos Distribuídos</CardTitle>
            <Gift className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{totalPoints.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground mt-1">Total acumulado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Pontos</CardTitle>
            <TrendingUp className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPoints.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground mt-1">Por cliente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Cliente</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">{topCustomer?.name}</div>
            <p className="text-xs text-muted-foreground mt-1">{topCustomer?.points.toLocaleString('pt-BR')} pontos</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, CPF ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Customers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{customer.name}</h3>
                    <p className="text-sm text-muted-foreground">{customer.cpf}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pontos</span>
                  <Badge className="bg-accent text-accent-foreground">
                    {customer.points.toLocaleString('pt-BR')} pts
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total gasto</span>
                  <span className="font-semibold">{formatCurrency(customer.totalPurchases)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span className="truncate">{customer.phone}</span>
                </div>
                {customer.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleViewDetails(customer)}
                >
                  <ShoppingBag className="mr-2 h-3 w-3" />
                  Ver Detalhes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(customer)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhum cliente encontrado</p>
          </CardContent>
        </Card>
      )}

      {/* Customer Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle>Detalhes do Cliente</DialogTitle>
                <DialogDescription>
                  Histórico e informações completas
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Customer Info */}
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedCustomer.cpf}</p>
                    <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                    {selectedCustomer.email && (
                      <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Cliente desde {selectedCustomer.createdAt.toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-accent">{selectedCustomer.points}</div>
                    <p className="text-xs text-muted-foreground">pontos</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Total em Compras</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{formatCurrency(selectedCustomer.totalPurchases)}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Última Compra</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        {selectedCustomer.lastPurchaseDate?.toLocaleDateString('pt-BR') || 'Nunca'}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Points History */}
                <div>
                  <h4 className="font-semibold mb-3">Histórico de Pontos</h4>
                  <div className="space-y-2">
                    {getCustomerPointsHistory(selectedCustomer.id).length > 0 ? (
                      getCustomerPointsHistory(selectedCustomer.id).map((history) => (
                        <div key={history.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{history.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {history.createdAt.toLocaleString('pt-BR')}
                            </p>
                          </div>
                          <Badge variant={history.type === 'earned' ? 'default' : 'outline'}>
                            {history.type === 'earned' ? '+' : ''}{history.points} pts
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Nenhum movimento de pontos ainda
                      </p>
                    )}
                  </div>
                </div>

                {/* Purchase History */}
                <div>
                  <h4 className="font-semibold mb-3">Histórico de Compras</h4>
                  <div className="space-y-2">
                    {getCustomerOrders(selectedCustomer.id).length > 0 ? (
                      getCustomerOrders(selectedCustomer.id).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Pedido #{order.id}</p>
                            <p className="text-xs text-muted-foreground">
                              {order.items.length} {order.items.length === 1 ? 'item' : 'itens'} • {
                                order.createdAt.toLocaleString('pt-BR')
                              }
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{formatCurrency(order.total)}</p>
                            {order.pointsGenerated && (
                              <p className="text-xs text-accent">+{order.pointsGenerated} pts</p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Nenhuma compra registrada ainda
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
