import Head from 'next/head'
import '../css/styles.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: any) {
  return <>
    <Head>
      <title>Explore</title>
    </Head>
    <Component {...pageProps} />
  </>
}