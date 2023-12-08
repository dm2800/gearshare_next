import React from "react";
import Link from 'next/link'; 


import {inter, roboto_mono, baloo} from '@/app/fonts'; 

const Header = () => {
    return (
        <div className = "my-10">
            <Link href="/">
            <h1
            className= {`text-[60px] font-baloo blue_gradient text-opacity-70 text-center ${baloo.className}`}
            style={{ lineHeight: '1' }}
            >
                GearShare
            </h1>
            </Link>

            <p className = "text-center font-semibold text-indigo-950/70">Borrow & lend your favorite gear.</p>
        </div>
    );
};

export default Header;
