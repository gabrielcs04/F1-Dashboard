import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'F1 Dashboard',
  description: 'Sistema de visualização e consulta de dados da Fórmula 1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
