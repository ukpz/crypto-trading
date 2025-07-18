import Login from '@/components/Login';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

const IndexScreen = () => {
    const router = useRouter();
    const [login, setLogin] = useState(false);

    useEffect(() => {
        if (login) {
            router.push('/(tabs)');
        }
    }, [login]);

    return <Login setLogin={setLogin} />;
};

export default IndexScreen