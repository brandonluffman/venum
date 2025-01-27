

import React from 'react';
// import { UserProvider } from '@auth0/nextjs-auth0/client';
import '../styles/globals.css'
import '../styles/index.css'
import '../styles/navbar.css'
import '../styles/search.css'
import '../styles/footer.css'
import '../styles/stock.css'
import '../styles/stocktabs.css'
import '../styles/stocks.css'
import '../styles/api.css'
import '../styles/gpt.css'
import '../styles/pricing.css'
import '../styles/stockanalytic.css'
import '../styles/stockfinancials.css'
import '../styles/stocksentiment.css'
import '../styles/macro.css'
import '../styles/stockratios.css'
import '../styles/stockownership.css'
import '../styles/screener.css'
import '../styles/chat.css'
import '../styles/test.css'
import '../styles/similar.css'
import '../styles/earnings.css'
import '../styles/navsearch.css'
import '../styles/etfs.css'
import '../styles/bonds.css'
import '../styles/news.css'
import '../styles/realestate.css'
import '../styles/account.css'
import '../styles/login.css'


// import NProgress from 'nprogress';
// import Router from 'next/router';

// Router.events.on('routeChangeStart', () => {
//   console.log('Route change started');
//   NProgress.start();
// });
// Router.events.on('routeChangeComplete', () => {
//   console.log('Route change complete');
//   NProgress.done();
// });
// Router.events.on('routeChangeError', () => {
//   console.log('Route change error');
//   NProgress.done();
// });

export default function App({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  );
}
