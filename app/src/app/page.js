'use client' // 👈 use it here
import Image from 'next/image'
import fetchBoats from './apiService.js'
import React, { useState, useEffect } from 'react';


export default function Home() {

  const [boats, setBoats] = useState([]);

    useEffect(() => {
        fetchBoats()
            .then(data => setBoats(data))
            .catch(error => console.error('Error fetching boats:', error));
    }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     WELCOME TO BOATS CONTROL CHART!
     <div>
            {boats.map(boat => (
                <div key={boat.id}>
                    {boat.name} - {boat.status}
                </div>
            ))}
        </div>
      
    </main>
  )
}
