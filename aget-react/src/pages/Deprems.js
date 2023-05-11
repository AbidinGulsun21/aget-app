import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';

const initialPageSize = 15;


export default function Deprems() {

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState({ first: 0, rows: initialPageSize });
    const [totalRecords, setTotalRecords] = useState(0);
    const [data, setData] = useState([]);


    useEffect(() => {
        fetchData();
    }, [])

    function onPageChange(event) {
        setLoading(true);
        setPage(event);
        fetchData(event.first, event.rows);
    }

    async function fetchData(first, rows) {
        const response = await fetch(
            `https://api.orhanaydogdu.com.tr/deprem/kandilli/live?start=${first}&count=${rows}`
        );
        const data = await response.json();
        console.log('dataresult', data.result);
        setData(data.result);
        setTotalRecords(data.metadata.total);
        setLoading(false);
    }


    const magValues = data.map(val => val?.mag);
    const maxMag = Math.max(...magValues);
    const maxMagData = data.find(val => val?.mag === maxMag);

    return (
        <div>




            <Card>

                <Card title='Son Depremler' className='mb-3'>

                    <div className="myFlex">
                        <Card subTitle='Son Deprem' className='myCard'>
                            <Tag style={{ display: "block", marginBottom: "10px" }} value={"Büyüklük: " + data[0]?.mag}></Tag>
                            <Tag style={{ display: "block" }} value={"Şehir: " + data[0]?.title}></Tag>
                        </Card>
                        <Card subTitle='Son 24 Saatteki En büyük' className='myCard'>
                            <Tag style={{ display: "block", marginBottom: "10px" }} value={"Büyüklük: " + maxMagData?.mag}></Tag>
                            <Tag style={{ display: "block" }} value={"Şehir: " + maxMagData?.title}></Tag>
                        </Card>
                    </div>
                </Card>



                <DataTable
                    value={data}
                    loading={loading}
                    responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    size="small"
                    paginator
                    rows={page.rows}
                    first={page.first}
                    rowsPerPageOptions={[15, 20, 35, 50]}
                    totalRecords={totalRecords}
                    onPage={onPageChange}
                >
                    <Column field="date" header="Tarih" body={e => e?.date} sortable />
                    <Column field="mag" header="Magnitüd" body={e => e?.mag} sortable />
                    <Column field="coordinates" header="Coordinates" body={e => e?.coordinates} sortable />
                    <Column field="depth" header="Derinlik" body={e => e?.depth} sortable />
                    <Column field="title" header="Şehir" body={e => e?.title} sortable />
                </DataTable>

            </Card>


        </div>
    )
}
