import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Plus, Search, Edit, Trash2, MapPin, Phone, Clock, User } from 'lucide-react';
import { mockStores } from '../data/mockData';
import { Store } from '../types';
import { Switch } from './ui/switch';

export function StoresView() {
  const [stores, setStores] = useState<Store[]>(mockStores);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.responsible.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateStore = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newStore: Store = {
      id: String(stores.length + 1),
      name: formData.get('name') as string,
      cnpj: formData.get('cnpj') as string,
      responsible: formData.get('responsible') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      openingHours: formData.get('openingHours') as string,
      status: 'active',
      createdAt: new Date(),
    };

    if (editingStore) {
      setStores(stores.map(s => s.id === editingStore.id ? { ...newStore, id: editingStore.id } : s));
    } else {
      setStores([...stores, newStore]);
    }
    
    setIsDialogOpen(false);
    setEditingStore(null);
  };

  const handleEdit = (store: Store) => {
    setEditingStore(store);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja desativar esta loja?')) {
      setStores(stores.map(s => s.id === id ? { ...s, status: 'inactive' } : s));
    }
  };

  const handleToggleStatus = (id: string) => {
    setStores(stores.map(s => 
      s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s
    ));
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Gestão de Lojas</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Cadastre e gerencie suas lojas</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingStore(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Nova Loja
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingStore ? 'Editar Loja' : 'Nova Loja'}</DialogTitle>
              <DialogDescription>
                Preencha os dados da loja abaixo
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateStore} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Loja *</Label>
                  <Input id="name" name="name" defaultValue={editingStore?.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input id="cnpj" name="cnpj" defaultValue={editingStore?.cnpj} placeholder="00.000.000/0000-00" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="responsible">Responsável *</Label>
                  <Input id="responsible" name="responsible" defaultValue={editingStore?.responsible} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                  <Input id="phone" name="phone" defaultValue={editingStore?.phone} placeholder="(00) 00000-0000" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço Completo *</Label>
                <Input id="address" name="address" defaultValue={editingStore?.address} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="openingHours">Horário de Funcionamento *</Label>
                <Input id="openingHours" name="openingHours" defaultValue={editingStore?.openingHours} placeholder="08:00 - 20:00" required />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  setEditingStore(null);
                }}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  {editingStore ? 'Salvar Alterações' : 'Criar Loja'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou responsável..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStores.map((store) => (
          <Card key={store.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{store.name}</CardTitle>
                  {store.cnpj && (
                    <CardDescription className="mt-1">CNPJ: {store.cnpj}</CardDescription>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={store.status === 'active'}
                    onCheckedChange={() => handleToggleStatus(store.id)}
                  />
                  <Badge variant={store.status === 'active' ? 'default' : 'secondary'} className={store.status === 'active' ? 'bg-primary' : ''}>
                    {store.status === 'active' ? 'Ativa' : 'Inativa'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Responsável</p>
                  <p className="text-muted-foreground">{store.responsible}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Contato</p>
                  <p className="text-muted-foreground">{store.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Endereço</p>
                  <p className="text-muted-foreground">{store.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Horário</p>
                  <p className="text-muted-foreground">{store.openingHours}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(store)}
                >
                  <Edit className="mr-2 h-3 w-3" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(store.id)}
                >
                  <Trash2 className="mr-2 h-3 w-3" />
                  Desativar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStores.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhuma loja encontrada</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}