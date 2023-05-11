import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { POST, callAPI } from '../utils/ortakFunc';
import { handleItemChange } from '../utils/ortakFunc';
import { Button } from 'primereact/button';
import { getGlobalToast } from '../utils/ortakFunc';

export default function Login() {

    const [item, setItem] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        const isAuthenticated = localStorage.getItem('authenticate');
        console.log("isAuthenticated", isAuthenticated)
        if (isAuthenticated) {
            navigate('/');
        } else if (!isAuthenticated) {
            navigate('/login');
        }
    }, []);


    async function login() {
        try {
            await callAPI({
                method: POST,
                url: 'api/users/login',
                data: item
            })
            console.log("giriş başarılı");
            getGlobalToast().show({ severity: 'success', summary: 'İşlem başarılı giriş oldu', life: 3000 });
            localStorage.setItem('authenticate', true);

        } catch (error) {
            localStorage.setItem("authenticate", false);
            console.log("eror", error)
        }
    }


    return (
        <>

            <Card>
                <InputText placeholder="Username" style={{ width: '100%', marginBottom: '30px' }} onChange={(e) => (handleItemChange('username', e.target.value, setItem))} />
                <InputText placeholder="Password" style={{ width: '100%' }} onChange={(e) => (handleItemChange('password', e.target.value, setItem))} />
                <Button onClick={login}>Login</Button>
            </Card>



        </>
    )
}
