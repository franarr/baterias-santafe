import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Baterías Santa Fe | Baterías Pioneiro a Domicilio',
  description: 'Baterías Pioneiro con entrega e instalación sin costo en Santa Fe. Autos, motos y camiones. Envíos a todo el país.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-surface text-on-surface font-body antialiased overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
