'use client' // 👈 use it here
import Image from 'next/image'
import {fetchBoats, updateBoatStatus} from './apiService.js'
import React, { useState, useEffect } from 'react';


export default function Home() {

  const [boats, setBoats] = useState([]);

    useEffect(() => {
        fetchBoats().then(setBoats);
    }, []);

    const handleStatusChange = async (boatId, newStatus) => {
        try {
            await updateBoatStatus(boatId, newStatus);
            setBoats(boats.map(boat => boat.id === boatId ? { ...boat, status: newStatus } : boat));
        } catch (error) {
            console.error('Error updating boat status:', error);
        }
    };

    return (
       <main>
        WELCOME TO BOAT CONTROL BOARD
        <div>
          <table>
              <thead>
                  <tr>
                      <th style={{ padding: '0 10px' }}>Boat Name</th>
                      <th style={{ padding: '0 10px' }}>Current Status</th>
                      <th style={{ padding: '0 10px' }}>Change Status</th>
                  </tr>
              </thead>
              <tbody>
                  {boats.map(boat => (
                      <tr key={boat.id}>
                          <td style={{ padding: '0 10px' }}>{boat.name}</td>
                          <td style={{ padding: '0 10px' }}>{boat.status}</td>
                          <td style={{ padding: '0 10px' }}>
                              <select 
                                  onChange={(e) => handleStatusChange(boat.id, e.target.value)}
                                  value={boat.status}
                                  style={{ backgroundColor: 'black', color: 'white', width: '100%', border:'solid' }}
                              >
                                  <option value="Docked">Docked</option>
                                  <option value="Outbound to Sea">Outbound to Sea</option>
                                  <option value="Inbound to Harbor">Inbound to Harbor</option>
                                  <option value="Maintenance">Maintenance</option>
                              </select>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>

       </main>
       
    );
}
