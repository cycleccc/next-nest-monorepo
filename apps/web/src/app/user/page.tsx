'use client';
import { apiClient } from '@/lib/api-client';
import { useState } from 'react';

export default function UserPage() {
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async () => {
        try {
            const response = await apiClient.user.getUser({
                body: {
                    id: '436',
                },
            });

            if (response.status === 200) {
                setUser(response.body);
                setError(null);
            } else if (response.status === 404) {
                setError(response.body.message);
                setUser(null);
            }
        } catch (err) {
            setError('Failed to fetch user');
            setUser(null);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <button
                type="button"
                onClick={fetchUser}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Fetch User
            </button>

            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            {user && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h2 className="text-xl font-semibold">User Details</h2>
                    <p>ID: {user.id}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </div>
    );
}
