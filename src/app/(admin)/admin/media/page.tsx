import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Image as ImageIcon } from 'lucide-react'

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Media</h1>
        <p className="text-muted-foreground mt-2">
          Gestiona imágenes y archivos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Galería de Media</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Página de media en desarrollo
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
