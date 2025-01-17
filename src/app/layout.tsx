import { WalletContextProvider } from '@/Context/WalletStore'
import './globals.css'

import { Work_Sans } from "next/font/google";
import { ChainApiContextProvider } from '@/Context/ChainApiStore'
import { PhalaContractContextProvider } from '@/Context/PhalaContractApiStore'
import { FetchedProfileContextProvider, ProfileContextProvider } from '@/Context/ProfileStore'
import { ProposalContextProvider } from '@/Context/submitPropolsal';




const workSans = Work_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: 'Ordum MVP',
  description: 'Grant aggregator and management service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <WalletContextProvider>
          <ChainApiContextProvider>
            <PhalaContractContextProvider>
              <ProfileContextProvider>
                <FetchedProfileContextProvider>
                  <ProposalContextProvider>
                    {children}
                  </ProposalContextProvider>
                </FetchedProfileContextProvider>
              </ProfileContextProvider>
            </PhalaContractContextProvider>
          </ChainApiContextProvider>
        </WalletContextProvider>  
        </body>
    </html>
  )
}
