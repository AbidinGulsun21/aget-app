import React from 'react';
import { Image } from 'primereact/image';
import Navbtn from './Navbtn';

export default function Navbar() {

    return (
        <>
            <div className='my-side-bar'>
                <Image src='logo.png' width='150px' />
                <Navbtn text={'Dashboard'} to='/' />
                <Navbtn text={'Products'} to='/products' />
                <Navbtn text={'Deprems'} to='/deprems' />
                <Navbtn text={'Login'} to='/login' />
            </div>
        </>
    )
}
