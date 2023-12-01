// apiService.js
export async function fetchBoats() {
    const response = await fetch('/api/boats');
    if (!response.ok) {
        throw new Error('Failed to fetch boats');
    }
    return await response.json();
}

export async function updateBoatStatus(id, newStatus) {
    const response = await fetch(`/api/boats/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
        throw new Error('Failed to update boat status');
    }
    return await response.json();
}
