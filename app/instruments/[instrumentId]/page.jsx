"use client";

import { useState, useEffect } from "react";
import {  useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const page = () => {

    // const router = useRouter(); 
    const [instrument, setInstrument] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
    });


    const searchParams = useSearchParams(); 

    const instrumentId = searchParams.get('id'); 

    useEffect(() => {
        const getSingleInstrument = async () => {
            const response = await fetch(`/api/instrument/${instrumentId}`);
            const data = await response.json();

            console.log("single instru data", data); 

            // const { title, price, description, image } = data;

            setInstrument({ title: data.title, price: price, description: description, image: image });
        };
        if (instrumentId) getSingleInstrument();
    }, [instrumentId]);

    return (
        <div>
            <p>Test</p>
            <p>{instrument.title}</p>
        </div>
    );
};

export default page;
