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

export async function createBoat(name) {
    const response = await fetch('/api/boats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, status: 'Docked' }),
    });

    if (!response.ok) {
        throw new Error('Failed to create boat');
    }
    return await response.json();
}

export async function deleteBoat(id) {
    const response = await fetch(`/api/boats`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });

    if (!response.ok) {
        throw new Error('Failed to delete boat');
    }
    return await response.json();
}
