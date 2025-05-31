import '../styles/globals.css';
import Layout from '../components/Layout'; 
import { CartProvider } from '../context/CartContext'; 

export const metadata = {
  title: 'American Whatbytes',
  description: 'Your go-to store for quality products',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <CartProvider>
          <Layout>
            {children}
          </Layout>
        </CartProvider>
      </body>
    </html>
  );
}