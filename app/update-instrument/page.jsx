"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";


const EditInstrument = () => {
    const [submitting, setSubmitting] = useState(false);
    const [item, setItem] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
        address:  {
            streetAddress: "", 
            city: "", 
            state: "", 
            postalCode: ""
        }
    });

    const router = useRouter(); 

    const searchParams = useSearchParams(); 

    const instrumentId = searchParams.get('id'); 

    useEffect(()=> {
        const getInstrumentDetails = async () => {
            const response = await fetch(`/api/instrument/${instrumentId}`)
            const data = await response.json(); 
            console.log('instrument details', data)

            setItem({title: data.title, 
            price: data.price, 
            description: data.description, 
            image: data.image,
            address: data.address
            })
        }

        if(instrumentId) getInstrumentDetails(); 
    },[instrumentId])



    const updateInstrument = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!instrumentId) return alert('Instrument ID not found'); 

        try {
            const response = await fetch(`/api/instrument/${instrumentId}`, {
                method: "PATCH",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    title: item.title,
                    price: item.price,
                    description: item.description,
                    image: item.image,
                    address: item.address
                }),
            })
            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log("create instrument error", error);
        } finally {
            setSubmitting(false); 
        }
    };

    return (
        <div className="text-center">
            <Form
                type="Update"
                item={item}
                setItem={setItem}
                submitting={submitting}
                handleSubmit={updateInstrument}
            />
        </div>
    );
};

export default EditInstrument;
