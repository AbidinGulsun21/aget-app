import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { actionBodyTemplate, callAPI, dateBodyTemplate, GET, getGlobalToast, DELETE, handleItemChange, ISLEM_INSERT, ISLEM_UPDATE, POST, PUT } from '../utils/ortakFunc';
import { Button } from 'primereact/button';
import ATInputtext from '../Components/ATInputtext';

const initialPageSize = 15;

export default function Products() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState({ page: 0, first: 0 });
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [pageData, setPageData] = useState(null);
    const [item, setItem] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [islem, setIslem] = useState(ISLEM_INSERT);

    function handleYeniClick() {
        setItem({});
        setModalVisible(true);
        setIslem(ISLEM_INSERT);
    }

    useEffect(() => {
        fetchData();
    }, [page, pageSize]);

    function handleOnPage(e) {
        setPage(e);
        setPageSize(e.rows);
    }

    async function fetchData() {
        setLoading(true);
        const res = await callAPI({
            method: GET,
            url: 'api/getall',
            params: { page: page.page, size: pageSize }
        });
        const newData = res.data.Product;
        setPageData(newData);
        setData(newData?.content);
        setLoading(false);
    }

    async function handleSave() {
        await callAPI({
            method: item.productId ? PUT : POST,
            url: 'api/addProduct',
            data: item
        });
        getGlobalToast().show({ severity: 'success', summary: 'İşlem Başarılı', detail: item?.productId ? 'Güncellene işlemi Başarılı' : 'Kayıt İşlemi Başarılı', life: 4000 });
        fetchData();
        setModalVisible(false);
    }

    async function handleEdit(rowData) {
        const res = await callAPI({
            method: GET,
            url: 'api/findById',
            params: { productId: rowData?.productId }
        });
        setIslem(ISLEM_UPDATE);
        setModalVisible(true);
        const newItem = res.data;
        setItem(newItem);
        fetchData();
    }


    async function handleDelete(rowData) {
        await callAPI({
            method: DELETE,
            url: 'api/deleteById',
            params: { productId: rowData?.productId }
        });
        getGlobalToast().show({ severity: 'success', summary: 'İşlem Başarılı', detail: "Silme İşlemi Başarılı", life: 4000 });
        fetchData();
    }


    return (
        <div>
            <Card>
                <Button type="button" icon="pi pi-plus" label="Yeni Ürün" className="p-button p-mr-2" onClick={() => handleYeniClick()} />
                <DataTable
                    value={data}
                    loading={loading}
                    paginator
                    responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    rows={pageSize}
                    size="small"
                    first={page.first}
                    onPage={handleOnPage}
                    lazy={true}
                    rowsPerPageOptions={[15, 20, 35, 50]}
                    totalRecords={pageData?.totalElements ?? 0}
                >
                    <Column field="productId" header="Product id" body={e => e?.productId} />
                    <Column field="productName" header="Product Name" body={e => e?.productName} />
                    <Column field="supplierId" header="Supplier Id" body={e => e?.supplierId} />
                    <Column field="categoryId" header="Category Id" body={e => e?.categoryId} />
                    <Column field="quantityPerUnit" header="Quantity Per Unit" body={e => e?.quantityPerUnit} />
                    <Column field="unitPrice" header="Unit Price" body={e => e?.unitPrice} />
                    <Column field="unitsInStock" header="Units In Stock" body={e => e?.unitsInStock} />
                    <Column field="creationDate" header="Creation Date" body={e => dateBodyTemplate(e?.creationDate)} />
                    <Column body={actionBodyTemplate(handleEdit, handleDelete)} headerStyle={{ width: '10em', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
                </DataTable>
            </Card>

            <Dialog header={item?.productId ? 'Ürün Güncelle' : 'Ürün Ekle'} visible={modalVisible} style={{ width: '40vw' }}
                onHide={() => setModalVisible(false)}
                footer={(
                    <div>
                        {islem === ISLEM_INSERT && <Button label='Kaydet' onClick={() => handleSave()} />}
                        {islem === ISLEM_UPDATE && <Button label='Güncelle' onClick={() => handleSave()} />}
                    </div>
                )}>
                <ATInputtext label="Product Name" value={item?.productName ?? ''} onChange={e => handleItemChange('productName', e.target.value, setItem)} />
                <ATInputtext label="Supplier Id" value={item?.supplierId ?? ''} onChange={e => handleItemChange('supplierId', e.target.value, setItem)} />
                <ATInputtext label="Category Id" value={item?.categoryId ?? ''} onChange={e => handleItemChange('categoryId', e.target.value, setItem)} />
                <ATInputtext label="Quantity Per Unit" value={item?.quantityPerUnit ?? ''} onChange={e => handleItemChange('quantityPerUnit', e.target.value, setItem)} />
                <ATInputtext label="Unit Price" value={item?.unitPrice ?? ''} onChange={e => handleItemChange('unitPrice', e.target.value, setItem)} />
                <ATInputtext label="Units In Stock" value={item?.unitsInStock ?? ''} onChange={e => handleItemChange('unitsInStock', e.target.value, setItem)} />
            </Dialog>
        </div>
    )
}
