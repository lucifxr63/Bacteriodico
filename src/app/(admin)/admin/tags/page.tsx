import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tag } from 'lucide-react'

export default function TagsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tags</h1>
        <p className="text-muted-foreground mt-2">
          Gestiona las etiquetas del blog
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Página de tags en desarrollo
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
