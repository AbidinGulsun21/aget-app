import React from 'react'
import {Toast} from 'primereact/toast';
import { setGlobalToast } from '../utils/ortakFunc';

export default function Topbar() {
    return (
        <>
            <div className='topbar'> Aget 1.0.0 </div>
            <Toast ref={(el) => setGlobalToast(el)}  baseZIndex={1000002} position="bottom-right" />
        </>
    )
}
