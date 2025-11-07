import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { formatDate } from '@/lib/utils'
import { Clock, User } from 'lucide-react'

interface PostCardProps {
  post: {
    id: string
    slug: string
    title: string
    excerpt: string | null
    cover_url: string | null
    cover_alt: string | null
    published_at: string | null
    reading_time: number | null
    author?: {
      display_name: string | null
      avatar_url: string | null
    }
    categories?: Array<{
      category: {
        name: string
        slug: string
        color: string | null
      }
    }>
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow content-visibility-auto">
      <Link href={`/post/${post.slug}`}>
        {post.cover_url && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={post.cover_url}
              alt={post.cover_alt || post.title}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-2">
            {post.categories?.map(({ category }) => (
              <span
                key={category.slug}
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: category.color + '20',
                  color: category.color,
                }}
              >
                {category.name}
              </span>
            ))}
          </div>
          <h3 className="text-fluid-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
            {post.title}
          </h3>
        </CardHeader>
        <CardContent>
          {post.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
          )}
        </CardContent>
      </Link>
      <CardFooter className="text-xs text-muted-foreground flex items-center gap-4">
        {post.author?.display_name && (
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {post.author.display_name}
          </span>
        )}
        {post.reading_time && (
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.reading_time} min
          </span>
        )}
        {post.published_at && (
          <span>{formatDate(post.published_at)}</span>
        )}
      </CardFooter>
    </Card>
  )
}
