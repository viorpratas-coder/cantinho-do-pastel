import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle } from 'lucide-react';

const RecentCodes = () => {
  // Em uma implementação real, esses dados viriam de uma API
  const recentCodes = [
    {
      id: '1',
      code: 'PED-ABC123-XYZ789',
      date: new Date(Date.now() - 1000 * 60 * 5), // 5 minutos atrás
      status: 'confirmed'
    },
    {
      id: '2',
      code: 'PED-DEF456-UVW456',
      date: new Date(Date.now() - 1000 * 60 * 15), // 15 minutos atrás
      status: 'confirmed'
    },
    {
      id: '3',
      code: 'PED-GHI789-RST123',
      date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
      status: 'confirmed'
    },
    {
      id: '4',
      code: 'PED-JKL012-OPQ789',
      date: new Date(Date.now() - 1000 * 60 * 60), // 1 hora atrás
      status: 'confirmed'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2" />
          Códigos Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentCodes.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            Nenhum código recente
          </p>
        ) : (
          <div className="space-y-3">
            {recentCodes.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-mono text-sm">{item.code}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <Badge variant="secondary">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Confirmado
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentCodes;