import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Search, Edit, Trash2, Monitor, RefreshCw, Activity } from 'lucide-react';
import { mockTotems, mockStores } from '../data/mockData';
import { Totem } from '../types';

export function TotemsView() {
  const [totems, setTotems] = useState<Totem[]>(mockTotems);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTotem, setEditingTotem] = useState<Totem | null>(null);

  const filteredTotems = totems.filter(totem => 
    totem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    totem.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTotem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newTotem: Totem = {
      id: String(totems.length + 1),
      name: formData.get('name') as string,
      storeId: formData.get('storeId') as string,
      serialNumber: formData.get('serialNumber') as string,
      appVersion: formData.get('appVersion') as string,
      status: 'online',
      operationMode: formData.get('operationMode') as 'service' | 'catalog' | 'blocked',
      lastPing: new Date(),
      createdAt: new Date(),
    };

    if (editingTotem) {
      setTotems(totems.map(t => t.id === editingTotem.id ? { ...newTotem, id: editingTotem.id, status: editingTotem.status } : t));
    } else {
      setTotems([...totems, newTotem]);
    }
    
    setIsDialogOpen(false);
    setEditingTotem(null);
  };

  const handleEdit = (totem: Totem) => {
    setEditingTotem(totem);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja remover este totem?')) {
      setTotems(totems.filter(t => t.id !== id));
    }
  };

  const handleRestart = (id: string) => {
    alert('Comando de reinicialização enviado ao totem!');
    setTotems(totems.map(t => t.id === id ? { ...t, lastPing: new Date() } : t));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-primary text-primary-foreground';
      case 'offline': return 'bg-destructive text-destructive-foreground';
      case 'maintenance': return 'bg-accent text-accent-foreground';
      default: return 'bg-secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'maintenance': return 'Manutenção';
      default: return status;
    }
  };

  const getTimeSinceLastPing = (lastPing?: Date) => {
    if (!lastPing) return 'Nunca';
    const minutes = Math.floor((Date.now() - new Date(lastPing).getTime()) / 60000);
    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m atrás`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h atrás`;
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Gestão de Totems</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Monitore e gerencie seus totems</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingTotem(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Novo Totem
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTotem ? 'Editar Totem' : 'Novo Totem'}</DialogTitle>
              <DialogDescription>
                Configure um novo totem para sua loja
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTotem} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Totem *</Label>
                  <Input id="name" name="name" defaultValue={editingTotem?.name} placeholder="Totem 01 - Recepção" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeId">Loja *</Label>
                  <Select name="storeId" defaultValue={editingTotem?.storeId} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a loja" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStores.filter(s => s.status === 'active').map(store => (
                        <SelectItem key={store.id} value={store.id}>
                          {store.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Número de Série *</Label>
                  <Input id="serialNumber" name="serialNumber" defaultValue={editingTotem?.serialNumber} placeholder="TM-2024-001" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appVersion">Versão do App</Label>
                  <Input id="appVersion" name="appVersion" defaultValue={editingTotem?.appVersion || '2.5.1'} placeholder="2.5.1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="operationMode">Modo de Operação *</Label>
                <Select name="operationMode" defaultValue={editingTotem?.operationMode || 'service'} required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Atendimento</SelectItem>
                    <SelectItem value="catalog">Somente Catálogo</SelectItem>
                    <SelectItem value="blocked">Bloqueado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  setEditingTotem(null);
                }}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  {editingTotem ? 'Salvar Alterações' : 'Criar Totem'}
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
            placeholder="Buscar por nome ou número de série..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Totems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTotems.map((totem) => {
          const store = mockStores.find(s => s.id === totem.storeId);
          
          return (
            <Card key={totem.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${totem.status === 'online' ? 'bg-primary/10' : totem.status === 'offline' ? 'bg-destructive/10' : 'bg-accent/10'}`}>
                      <Monitor className={`h-5 w-5 ${totem.status === 'online' ? 'text-primary' : totem.status === 'offline' ? 'text-destructive' : 'text-accent'}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{totem.name}</CardTitle>
                      <CardDescription className="mt-1">{store?.name}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(totem.status)}>
                    {getStatusLabel(totem.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Série</p>
                    <p className="font-medium">{totem.serialNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Versão</p>
                    <p className="font-medium">{totem.appVersion}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Último Ping</p>
                    <p className="font-medium flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      {getTimeSinceLastPing(totem.lastPing)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Modo</p>
                    <p className="font-medium">
                      {totem.operationMode === 'service' ? 'Atendimento' :
                       totem.operationMode === 'catalog' ? 'Catálogo' :
                       'Bloqueado'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(totem)}
                  >
                    <Edit className="mr-2 h-3 w-3" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRestart(totem.id)}
                    title="Reiniciar totem"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(totem.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTotems.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Monitor className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhum totem encontrado</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
