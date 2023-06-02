import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'
import { Analytics } from '@vercel/analytics/react';
export const metadata={
  title:"Promptopia",
  description:'Discover & Share AI Prompts'
}


const Rootlayout = ({children}) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
        <div className='main'>
          <div className='gradient'/>
        </div>         
        <main className='app'>
          <Nav/>
          {children}
          <Analytics />
        </main>
        </Provider>
      </body>
    </html>
  )
}

export default Rootlayout