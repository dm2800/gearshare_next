import "../styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import Header from "@/components/Header";

import {inter, roboto_mono, baloo} from './fonts'; 



export const metadata = {
    title: "GearShare",
    description: "Lend and borrow your favorite gear",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={baloo.className}>
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Header />
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
}
