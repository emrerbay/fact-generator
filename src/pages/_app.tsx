import { RootLayout } from '@/src/components/layout'
import { AppProps } from 'next/app'
import "@/src/globals.css"
import Head from 'next/head'
import { Raleway } from 'next/font/google'

const raleway = Raleway({
  subsets: ['latin'],
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RootLayout>
      <Head>
        <title>Fact Generator</title>
        <meta name="description" content="Random Fact Generator Website" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <main className={raleway.className}>
        <Component {...pageProps} />
      </main>
    </RootLayout>
  )
}

export default MyApp
