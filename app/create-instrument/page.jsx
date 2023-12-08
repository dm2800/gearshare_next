"use client";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";


const CreateInstrument = () => {
    const [submitting, setSubmitting] = useState(false);
    const [item, setItem] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
    });

    const router = useRouter(); 
    const { data: session} = useSession(); 

    const createInstrument = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch("/api/instrument/new", {
                method: "POST",
                body: JSON.stringify({
                    title: item.title,
                    userId: session?.user.id,
                    price: item.price,
                    description: item.description,
                    image: item.image,
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
                type="List"
                item={item}
                setItem={setItem}
                submitting={submitting}
                handleSubmit={createInstrument}
            />
        </div>
    );
};

export default CreateInstrument;
