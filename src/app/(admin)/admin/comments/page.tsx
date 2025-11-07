import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'

export default function CommentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Comentarios</h1>
        <p className="text-muted-foreground mt-2">
          Modera los comentarios del blog
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Moderación de Comentarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Página de comentarios en desarrollo
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
