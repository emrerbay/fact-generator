import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Inter } from 'next/font/google';
import Footer from '../components/Footer';
import Image from 'next/image';
import bg from '../../public/bg.png';


const fontInter = Inter({ subsets: ['latin'] });

type RootLayoutProps = {
  children: React.ReactNode;
};

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div lang="en">
      <UserProvider>
        <div className={fontInter.className}>
          <div className="fixed inset-0 -z-10 opacity-55 blur-sm contrast-75">
            <Image
              src={bg}
              alt="Background"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="mt-2"
            />
          </div>
          {children}
        </div>
      </UserProvider>
      <Footer />
    </div>
  );
}
