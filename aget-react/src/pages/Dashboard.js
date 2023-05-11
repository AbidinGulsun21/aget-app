import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import { callAPI, GET } from '../utils/ortakFunc';


export default function Dashboard() {

    const [item, setItem] = useState({});

    useEffect(() => {
        fetchData()
    }, [])
    

    
    async function fetchData() {
        const res = await callAPI({
            method: GET,
            url: 'api/getAllProductCount',
        });
        const newData = res.data;
        setItem(newData);
    }


    return (
        <>
            <div className='flex justify-content-around'>
                <Card className='dashboard-card'>
                    <div className='flex align-items-center justify-content-between'>
                        <div className='flex align-items-center'>
                            <i className="pi pi-cart-plus mr-1" style={{ 'fontSize': '1.5em', color: 'orange' }}></i>
                            <p>Tüm Ürünler</p>
                        </div>
                        <i className="pi pi-ellipsis-v" style={{ 'fontSize': '1em', color: 'orange' }}></i>
                    </div>
                    <div className='flex align-items-start flex-column'>
                        <div>{item?.productCount}</div>
                        <div className='mt-1'><Badge value={'Ürünler'} severity="success"></Badge></div>
                    </div>
                </Card>

                <Card className='dashboard-card'>
                    <div className='flex align-items-center justify-content-between'>
                        <div className='flex align-items-center'>
                            <i className="pi pi-cart-plus mr-1" style={{ 'fontSize': '1.5em', color: 'orange' }}></i>
                            <p>Tüm Ürünler</p>
                        </div>
                        <i className="pi pi-ellipsis-v" style={{ 'fontSize': '1em', color: 'orange' }}></i>
                    </div>
                    <div className='flex align-items-start flex-column'>
                        <div>963</div>
                        <div className='mt-1'><Badge value={'Ürünler'} severity="success"></Badge></div>
                    </div>
                </Card>

                <Card className='dashboard-card'>
                    <div className='flex align-items-center justify-content-between'>
                        <div className='flex align-items-center'>
                            <i className="pi pi-cart-plus mr-1" style={{ 'fontSize': '1.5em', color: 'orange' }}></i>
                            <p>Tüm Ürünler</p>
                        </div>
                        <i className="pi pi-ellipsis-v" style={{ 'fontSize': '1em', color: 'orange' }}></i>
                    </div>
                    <div className='flex align-items-start flex-column'>
                        <div>963</div>
                        <div className='mt-1'><Badge value={'Ürünler'} severity="success"></Badge></div>
                    </div>
                </Card>

                <Card className='dashboard-card'>
                    <div className='flex align-items-center justify-content-between'>
                        <div className='flex align-items-center'>
                            <i className="pi pi-cart-plus mr-1" style={{ 'fontSize': '1.5em', color: 'orange' }}></i>
                            <p>Tüm Ürünler</p>
                        </div>
                        <i className="pi pi-ellipsis-v" style={{ 'fontSize': '1em', color: 'orange' }}></i>
                    </div>
                    <div className='flex align-items-start flex-column'>
                        <div>963</div>
                        <div className='mt-1'><Badge value={'Ürünler'} severity="success"></Badge></div>
                    </div>
                </Card>
            </div>

        </>
    )
}
