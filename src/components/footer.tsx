import Link from 'next/link'

const footerNav = {
  sections: [
    {
      title: 'Contenido',
      links: [
        { name: 'Noticias', href: '/noticias' },
        { name: 'Divulgación', href: '/divulgacion' },
        { name: 'Eventos', href: '/eventos' },
        { name: 'Recursos', href: '/recursos' },
      ],
    },
    {
      title: 'Acerca de',
      links: [
        { name: 'Quiénes Somos', href: '/about' },
        { name: 'Contacto', href: '/contact' },
        { name: 'Colabora', href: '/collaborate' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacidad', href: '/privacy' },
        { name: 'Términos', href: '/terms' },
      ],
    },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 max-w-6xl py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold">
              🧫 BACTERIÓDICO
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Acercándote al fascinante mundo de los microorganismos.
            </p>
          </div>

          {footerNav.sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} BACTERIÓDICO. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
