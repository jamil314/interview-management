import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'


const Loading = () => {


  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    console.log('aaaaaaaaaaaaaaaaaaaaa');
    

  const handleLoadingStart = (url : string) => {
    console.log('Loading started');
    (url !== router.asPath) && setLoading(true);
  }
  const handleLoadingComplete = (url : string) => { 
    console.log('Loading finished');
    (url !== router.asPath) && setLoading(false);
    
  }

  router.events.on('routeChangeStart', handleLoadingStart);
  router.events.on('routeChangeComplete', handleLoadingComplete);
  router.events.on('routeChangeError', handleLoadingComplete);

  return () => {
    
    router.events.off('routeChangeStart', handleLoadingStart);
    router.events.off('routeChangeComplete', handleLoadingComplete);
    router.events.off('routeChangeError', handleLoadingComplete);
  }


  })
  return loading ? <div style={{height : '100vh', width : '100vw', backgroundColor : 'green', zIndex : '5'}}>loading...</div> : <></>
}
export default function App({ Component, pageProps }: AppProps) {
  

  return(
    <>
      <Loading/>
      <Component {...pageProps} />
    </>
    )
}
