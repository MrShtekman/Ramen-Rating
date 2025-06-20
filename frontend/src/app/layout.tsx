import './globals.css';
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className='flex justify-center'>
          <ul className='flex flex-row gap-4'>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/restaurant">Restaurants</Link>
            </li>
            <li>
              <Link href="/ramen">Ramens</Link>
            </li>
            <li>
              <Link href="/review">Reviews</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
