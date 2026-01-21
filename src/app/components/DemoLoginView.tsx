import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Logo } from './Logo';
import { ArrowRight } from 'lucide-react';

export function DemoLoginView({
  onEnterDemo,
}: {
  onEnterDemo: () => void;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-secondary via-secondary to-primary/10 p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <div className="bg-background/80 backdrop-blur rounded-2xl px-5 py-4 shadow-lg border">
              <Logo size="large" />
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">
            Sistema de Controle do Totem
          </p>
        </div>

        <Card className="shadow-2xl border-2">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Acesse o painel administrativo do FastMarket.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              type="button"
              className="w-full bg-primary hover:bg-primary/90 h-11 text-base font-semibold"
              onClick={onEnterDemo}
            >
              Entrar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Bem-vindo! Você já pode começar.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
