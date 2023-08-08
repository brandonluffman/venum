// import Navbar from '../components/Navbar'
// import '../styles/globals.css'
// import '../styles/index.css'
// import '../styles/navbar.css'
// import '../styles/search.css'
// import '../styles/footer.css'
// import '../styles/stock.css'
// import '../styles/stocktabs.css'
// import '../styles/stocks.css'
// import '../styles/api.css'
// import '../styles/gpt.css'

// import React, { useState } from 'react';

// function MyApp({ Component, pageProps }) {

//   // const [isBackgroundLight, setIsBackgroundLight] = useState(true);

//   // const handleButtonClick = () => {
//   //   // Toggle the background color on button click
//   //   setIsBackgroundLight((prevValue) => !prevValue);
//   // };

//   // // Determine the background color based on the state
//   // const backgroundColor = isBackgroundLight ? '#f0f0f0' : '#1a1a1a';

//   // // Define the CSS transition style
//   // const transitionStyle = {
//   //   transition: 'background-color 0.5s ease', // 0.5s duration with ease-in-out timing function
//   // };

//   return (
//     // <div style={{ ...transitionStyle, backgroundColor }}>
//       // <Component {...pageProps} onButtonClick={handleButtonClick} />
//       <Component {...pageProps} />

//     // </div>
//   );
// }

// export default MyApp;

import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
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


export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
     </UserProvider>
  );
}
