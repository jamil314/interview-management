import Head from 'next/head'
// import LoginForm from '@/component/Forms/LoginForm'
import margin from "../styles/margins.module.scss";
import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('../component/Forms/LoginForm'), {
  loading: () => {
    console.log('loading');
    
    return <p>Loading...</p>
  }
})

// export default function Home() {
//   return <DynamicHeader />
// }
export default function Home() {
  return (
    <>
      <Head> <title>Login @ IMS</title> </Head>
        <div className = {margin.login} >
          <DynamicHeader/>
        </div>
    </>
  )
}
