import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbtn({ text,to }) {
    return (
        <>
            <Link className='my-btn' to={to} >{text}</Link>
        </>
    )
}
