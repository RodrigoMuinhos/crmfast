import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Logo } from './Logo';
import { Eye, EyeOff, Lock, Mail, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { Checkbox } from './ui/checkbox';

interface LoginViewProps {
  onLogin: (email: string, password: string) => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Campos obrigatórios', {
        description: 'Por favor, preencha email e senha.'
      });
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Email inválido', {
        description: 'Por favor, insira um email válido.'
      });
      return;
    }

    setIsLoading(true);

    // Simular autenticação
    setTimeout(() => {
      // Credenciais de teste
      if (email === 'admin@fastmarket.com' && password === 'admin123') {
        toast.success('Login realizado!', {
          description: `Bem-vindo de volta, ${email}`
        });
        
        if (rememberMe) {
          localStorage.setItem('fastmarket_remember', 'true');
          localStorage.setItem('fastmarket_email', email);
        }
        
        onLogin(email, password);
      } else {
        toast.error('Credenciais inválidas', {
          description: 'Email ou senha incorretos. Tente novamente.'
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Email obrigatório', {
        description: 'Insira seu email para recuperar a senha.'
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Email inválido', {
        description: 'Por favor, insira um email válido.'
      });
      return;
    }

    toast.success('Email enviado!', {
      description: `Instruções de recuperação foram enviadas para ${email}`
    });
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-secondary via-secondary to-primary/10 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-4 rounded-2xl shadow-lg">
              <ShoppingCart className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            FastMarket
          </h1>
          <p className="text-muted-foreground">
            Sistema de Gestão de Totems
          </p>
        </div>

        {/* Card de Login */}
        <Card className="shadow-2xl border-2">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center">
              {showForgotPassword ? 'Recuperar Senha' : 'Entrar no Sistema'}
            </CardTitle>
            <CardDescription className="text-center">
              {showForgotPassword 
                ? 'Insira seu email para receber instruções de recuperação'
                : 'Acesse o painel administrativo do FastMarket'
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!showForgotPassword ? (
              // Formulário de Login
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@fastmarket.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Lembrar-me
                    </Label>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Esqueci minha senha
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 h-11 text-base font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Entrando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </Button>

                {/* Credenciais de teste */}
                <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 text-center">
                    🔑 Credenciais de Teste
                  </p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p><strong>Email:</strong> admin@fastmarket.com</p>
                    <p><strong>Senha:</strong> admin123</p>
                  </div>
                </div>
              </form>
            ) : (
              // Formulário de Recuperação de Senha
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-recovery">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email-recovery"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 h-11 text-base font-semibold"
                  >
                    Enviar Instruções
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Voltar ao Login
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>© 2026 FastMarket. Todos os direitos reservados.</p>
          <p className="mt-1">Sistema de automação de vendas para postos de combustível</p>
        </div>
      </div>
    </div>
  );
}
