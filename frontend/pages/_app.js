import '../styles/globals.css'
import Layout from '../components/Layout'
import LayoutHelper from '../components/LayoutHelper'
import { Provider } from 'react-redux'
import { myStore } from '../store/store'
import { useRouter } from 'next/router'

import { wrapper } from "../store/store";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";



function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  const router = useRouter()

  if (router.asPath == '/login' || router.asPath == '/register') {
    return (
      <PersistGate persistor={store.__persistor}>
        <LayoutHelper>
          <Component {...pageProps} />
        </LayoutHelper>
      </PersistGate>
    )
  }

  return (
    <PersistGate persistor={store.__persistor}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PersistGate>
  )
}

export default wrapper.withRedux(MyApp);
