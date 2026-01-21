import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Plus, Search, Edit, Trash2, Shield, User as UserIcon, Mail } from 'lucide-react';
import { mockUsers, mockStores } from '../data/mockData';
import { User } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export function UsersView() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const storeIdValue = formData.get('storeId') as string;
    
    const newUser: User = {
      id: String(users.length + 1),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as 'admin' | 'manager' | 'operator' | 'support',
      storeId: storeIdValue === 'multi-store' ? undefined : storeIdValue,
      active: true,
      createdAt: new Date(),
    };

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...newUser, id: editingUser.id, active: editingUser.active } : u));
    } else {
      setUsers([...users, newUser]);
    }
    
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja remover este operador?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, active: !u.active } : u
    ));
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin Master';
      case 'manager': return 'Gerente';
      case 'operator': return 'Operador';
      case 'support': return 'Suporte';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-destructive text-destructive-foreground';
      case 'manager': return 'bg-primary text-primary-foreground';
      case 'operator': return 'bg-secondary text-secondary-foreground';
      case 'support': return 'bg-accent text-accent-foreground';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Gestão de Operadores</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Gerencie usuários e permissões</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingUser(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Novo Operador
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingUser ? 'Editar Operador' : 'Novo Operador'}</DialogTitle>
              <DialogDescription>
                Configure um novo usuário do sistema
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input id="name" name="name" defaultValue={editingUser?.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input id="email" name="email" type="email" defaultValue={editingUser?.email} required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Função *</Label>
                  <Select name="role" defaultValue={editingUser?.role || 'operator'} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin Master</SelectItem>
                      <SelectItem value="manager">Gerente da Loja</SelectItem>
                      <SelectItem value="operator">Operador</SelectItem>
                      <SelectItem value="support">Suporte</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Define as permissões do usuário
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeId">Loja Vinculada</Label>
                  <Select name="storeId" defaultValue={editingUser?.storeId || 'multi-store'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Multi-loja (Admin)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multi-store">Multi-loja (Admin)</SelectItem>
                      {mockStores.filter(s => s.status === 'active').map(store => (
                        <SelectItem key={store.id} value={store.id}>
                          {store.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Deixe vazio para admin master
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  setEditingUser(null);
                }}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  {editingUser ? 'Salvar Alterações' : 'Criar Operador'}
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
            placeholder="Buscar por nome ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Operadores</CardTitle>
          <CardDescription>{filteredUsers.length} operador(es) cadastrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Operador</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Loja</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const store = user.storeId ? mockStores.find(s => s.id === user.storeId) : null;
                
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Cadastro: {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role)}>
                        <Shield className="mr-1 h-3 w-3" />
                        {getRoleLabel(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {store ? (
                        <span className="text-sm">{store.name}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">Multi-loja</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={user.active}
                          onCheckedChange={() => handleToggleActive(user.id)}
                        />
                        <span className="text-sm">
                          {user.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit className="mr-1 h-3 w-3" />
                          Editar
                        </Button>
                        {user.role !== 'admin' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(user.id)}
                          >
                            <Trash2 className="mr-1 h-3 w-3" />
                            Remover
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <UserIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nenhum operador encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Permissions Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informações sobre Permissões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-destructive text-destructive-foreground">
                  <Shield className="mr-1 h-3 w-3" />
                  Admin Master
                </Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Acesso total ao sistema</li>
                <li>• Gerenciar usuários</li>
                <li>• Multi-loja</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-primary-foreground">
                  <Shield className="mr-1 h-3 w-3" />
                  Gerente
                </Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• CRUD completo</li>
                <li>• Relatórios completos</li>
                <li>• Vinculado a loja</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-secondary text-secondary-foreground">
                  <Shield className="mr-1 h-3 w-3" />
                  Operador
                </Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Visualizar relatórios</li>
                <li>• Editar catálogo</li>
                <li>• Sem acesso a usuários</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-accent text-accent-foreground">
                  <Shield className="mr-1 h-3 w-3" />
                  Suporte
                </Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Status de totems</li>
                <li>• Reiniciar totems</li>
                <li>• Sem CRUD de dados</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}