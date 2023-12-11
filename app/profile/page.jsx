"use client"; 
import {useState, useEffect} from 'react'
import {useSession} from 'next-auth/react'; 
import {useRouter} from 'next/navigation'; 

import Profile from '@/components/Profile';


const MyProfile = () => {

    const { data: session} = useSession(); 

    const [instruments, setInstruments] = useState([]); 

    const router = useRouter(); 



    useEffect(()=> {
        const getAllUserInstruments = async () => {
            try {
                const res = await fetch(`/api/users/${session?.user.id}/instruments`); 
                const data =  await res.json();
                setInstruments(data);
                console.log('client session', session);
                console.log('get user instrus response', data);
            } catch(error) {
                console.log('Get user instrus fetch error', error)
            }
        }
        
        if(session?.user.id) getAllUserInstruments(); 
    }, [])

    const handleEdit = (instrument) => {
        router.push(`/update-instrument?id=${instrument._id}`)
        
    }

    const handleDelete = async (instrument) => {
        const hasConfirmed = confirm("Are you sure you want to delete this listing?");

        if(hasConfirmed) {
            try {
                await fetch(`/api/instrument/${instrument._id.toString()}`, {
                    method: 'DELETE'
                })

                const filteredInstruments = instruments.filter((i)=>  
                    i._id !== instrument._id); 

                setInstruments(filteredInstruments); 
            } catch (error) {
                console.log("Delete error", error); 
            }
        }
    }


  return (
    <Profile name="My" desc="Welcome to your personalized profile page"
    data = {instruments}
    handleEdit={handleEdit}
    handleDelete={handleDelete}/>
  )
}

export default MyProfile