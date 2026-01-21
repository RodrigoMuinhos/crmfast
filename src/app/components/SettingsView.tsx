import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Bell, CreditCard, Lock, Monitor, Settings as SettingsIcon, Download } from 'lucide-react';
import { Separator } from './ui/separator';

export function SettingsView() {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Configurações</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Gerencie as configurações do sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <CardTitle>Formas de Pagamento</CardTitle>
            </div>
            <CardDescription>Configure os métodos de pagamento aceitos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>PIX</Label>
                <p className="text-sm text-muted-foreground">Pagamento via QR Code</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cartão de Crédito</Label>
                <p className="text-sm text-muted-foreground">Via integração TEF</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cartão de Débito</Label>
                <p className="text-sm text-muted-foreground">Via integração TEF</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dinheiro</Label>
                <p className="text-sm text-muted-foreground">⚠️ Não recomendado para totems</p>
              </div>
              <Switch disabled />
            </div>
            <div className="pt-4">
              <p className="text-xs text-muted-foreground">
                💡 O pagamento em dinheiro está desabilitado por segurança
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Totem Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              <CardTitle>Configurações de Totem</CardTitle>
            </div>
            <CardDescription>Configurações gerais dos totems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timeout">Tempo de Inatividade (segundos)</Label>
              <Input id="timeout" type="number" defaultValue="60" />
              <p className="text-xs text-muted-foreground">
                Tempo até o totem voltar à tela inicial
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="maintenance-pin">PIN de Manutenção</Label>
              <Input id="maintenance-pin" type="password" defaultValue="1234" />
              <p className="text-xs text-muted-foreground">
                PIN para acessar modo manutenção
              </p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modo Escuro</Label>
                <p className="text-sm text-muted-foreground">Interface dark nos totems</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notificações e Alertas</CardTitle>
            </div>
            <CardDescription>Configure quando receber alertas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Totem Offline</Label>
                <p className="text-sm text-muted-foreground">Alerta quando totem ficar offline</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Estoque Baixo</Label>
                <p className="text-sm text-muted-foreground">Alerta de produtos em falta</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Taxa de Erro Alta</Label>
                <p className="text-sm text-muted-foreground">Muitas falhas de pagamento</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="email-notifications">E-mail para Notificações</Label>
              <Input id="email-notifications" type="email" defaultValue="admin@fastmarket.com" />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle>Segurança e Auditoria</CardTitle>
            </div>
            <CardDescription>Configurações de segurança</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Logs de Auditoria</Label>
                <p className="text-sm text-muted-foreground">Registrar todas as ações</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Tempo de Sessão (minutos)</Label>
              <Input id="session-timeout" type="number" defaultValue="30" />
              <p className="text-xs text-muted-foreground">
                Tempo até logout automático
              </p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticação de Dois Fatores</Label>
                <p className="text-sm text-muted-foreground">2FA para operadores</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Exportar Logs de Auditoria
            </Button>
          </CardContent>
        </Card>

        {/* Reports */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              <CardTitle>Configurações de Relatórios</CardTitle>
            </div>
            <CardDescription>Personalize relatórios e exportações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Moeda</Label>
                <Input id="currency" defaultValue="BRL (R$)" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Input id="timezone" defaultValue="America/Sao_Paulo" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-format">Formato de Data</Label>
                <Input id="date-format" defaultValue="DD/MM/YYYY" disabled />
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar Relatório Mensal
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar Produtos (CSV)
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar Pedidos (CSV)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90 px-8 w-full sm:w-auto">
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}
