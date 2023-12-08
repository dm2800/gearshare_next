'use client'
import { useSearchParams } from 'next/navigation';
import {useEffect, useState} from 'react'; 
import InstrumentCard from '@/components/InstrumentCard';

const UserPage = () => {


  const [instruments, setInstruments] = useState([]); 

  const [user, setUser] = useState({}); 

  const searchParams = useSearchParams(); 

  const userId = searchParams.get("id");


  useEffect(()=> {
      const getAllUserInstruments = async () => {
          try {
              const res = await fetch(`/api/users/${userId}/instruments`); 
              const data =  await res.json();
              setInstruments(data);
              console.log('get user instrus response', data);
          } catch(error) {
              console.log('Get user instrus fetch error', error)
          }
      }
      
      if(userId) getAllUserInstruments(); 
  }, [userId])


  useEffect(()=> {
    const getUser = async () => {
        try {
            const res = await fetch(`/api/users/${userId}`); 
            const data =  await res.json();
            setUser(data[0]);
            console.log('get user response', data);
        } catch(error) {
            console.log('Get user fetch error', error)
        }
    }
    
    if(userId) getUser(); 
}, [])


  return (
    <section className = 'w-full'>

    <h1 className="head_text text-left">
        <span className="blue_gradient text-[40px]">
        {user.username}'s Listings
        </span>
       </h1>


       <div className=" flex-col w-1/2 justify-between mb-8 text-[20px] text-indigo-950">
                            <div className="flex items-center">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>{" "}
                                <p className="mx-1 font-semibold">4.9</p>
                            </div>

                            <p>32 Reviews</p>
                        </div>


       <div className="mt-10 prompt_layout">


             {instruments.map((instrument) => (
                <InstrumentCard 
                key={instrument._id}
                instrument = {instrument}
                handleEdit = {() => handleEdit && handleEdit(instrument)}
                handleDelete = {() => handleDelete && handleDelete(instrument)}/>
            ))}  
        </div>

  </section>
  )
}

export default UserPage