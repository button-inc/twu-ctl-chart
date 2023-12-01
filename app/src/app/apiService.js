// apiService.js
export default async function fetchBoats() {
    const response = await fetch('/api/boats');
    if (!response.ok) {
        throw new Error('Failed to fetch boats');
    }
    return await response.json();
}
