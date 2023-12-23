"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import {usePathname} from 'next/navigation'; 

const Nav = () => {
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const {data: session} = useSession(); 
    const pathname = usePathname(); 

    useEffect(() => {
        const setUpProviders = async () => {
            if (!providers) {
                const response = await getProviders();
                setProviders(response);
            }
        };

        setUpProviders();
    }, [pathname]);

    return (
        <nav className="mb-10 flex justify-center ">

            {/* {alert(providers)} */}

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-instrument" className="black_btn">
                            List Your Gear
                        </Link>
                        <Link href= {`/chat`} className="black_btn">
                            Messages
                        </Link>
                        <button type="button" onClick={() => signOut({callbackUrl: 'http://localhost:3000'})} className="outline_btn">
                            Sign Out
                        </button>
                        <Link href="/profile" className="">
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                alt="profile"
                            ></Image>
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers ?
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >Sign In</button>
                            )) : <button
                            type="button"
                            onClick={() =>{}}
                            className="black_btn"
                        >Loading...</button>}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}

            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            alt="profile"
                            //We avoid modifying React state directly
                            onClick = {() => setToggleDropdown((prev)=> !prev )}
                            />

                            {toggleDropdown && (
                                <div className="dropdown">
                                    <Link href="/profile"
                                        className="dropdown_link"
                                        onClick ={() => setToggleDropdown(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <Link href="/create-instrument"
                                        className="dropdown_link"
                                        onClick ={() => setToggleDropdown(false)}
                                    >
                                        List Instrument
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setToggleDropdown(false);
                                            signOut({ callbackUrl: 'http://localhost:3000' }); 
                                        }}
                                        className="mt-5 w-full black_btn"
                                    >Sign Out</button>
                                </div>
                            )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className=""
                                >Sign In</button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
