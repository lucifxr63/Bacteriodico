import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-muted-foreground mt-2">
          Ajustes generales del sitio
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración del Sitio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Página de configuración en desarrollo
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
