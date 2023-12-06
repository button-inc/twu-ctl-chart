'use client' // 👈 use it here

import React, { useState, useEffect } from 'react';
import { fetchBoats, updateBoatStatus, createBoat, deleteBoat } from './apiService.js';

export default function Home() {
    const [boats, setBoats] = useState([]);
    const [newBoatName, setNewBoatName] = useState('');

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

    const handleCreateBoat = async () => {
        if (newBoatName) {
            try {
                await createBoat(newBoatName);
                setNewBoatName('');
                fetchBoats().then(setBoats);
            } catch (error) {
                console.error('Error creating boat:', error);
            }
        }
    };

    const handleDeleteBoat = async (boatId) => {
        try {
            await deleteBoat(boatId);
            setBoats(boats.filter(boat => boat.id !== boatId));
        } catch (error) {
            console.error('Error deleting boat:', error);
        }
    };

    return (
        <main>
            <h1>WELCOME TO BOAT CONTROL BOARD</h1>
            <input
                type="text"
                placeholder="Enter new boat name"
                value={newBoatName}
                onChange={(e) => setNewBoatName(e.target.value)}
                style={{ 
                    backgroundColorcolor: 'white', 
                    color:'black',
                    marginLeft:'15px' 
                }}
            />
            <button 
                onClick={handleCreateBoat}
                style={{ 
                    border:'solid', marginLeft:'15px', padding:'5px' 
                }}
                >
                    ADD
            </button>
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
                          <td style={{ padding: '0 10px' }}><button onClick={() => handleDeleteBoat(boat.id)}>DELETE</button></td>
                      </tr>
                  ))}
              </tbody>
                </table>
            </div>
        </main>
    );
}
