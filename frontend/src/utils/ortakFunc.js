import React from 'react';
import { Button } from 'primereact/button';
import { parse, stringify } from 'qs'
import axios from 'axios';
import produce from 'immer';

export const GET = 'get';
export const POST = 'post';
export const PUT = 'put';
export const DELETE = 'delete';
export const ISLEM_GIRIS = 'giris';
export const ISLEM_EDIT = 'edit';
export const ISLEM_VIEW = 'edit';
export const ISLEM_LOAD = 'yukle';
export const ISLEM_DELETE = 'sil';
export const ISLEM_INSERT = 'ekle';
export const ISLEM_UPDATE = 'guncelle';
export const ISLEM_NULL = '';
export const ISLEM_SHOW = 'goster';
export const ISLEM_LIST = 'list';
export const ISLEM_DETAY = 'detay';
export const ISLEM_ONAY = 'onay';
export const ISLEM_ONAY_KALDIR = 'onayKaldir';
export const ISLEM_SORGULA = 'sorgula';
export const ISLEM_ODENEK_TABLOSU = 'listOdenekTablosuGiris';
export const ISLEM_MASRAF_TABLOSU = 'listMasrafTablosuGiris';
export const ISLEM_IPTAL = 'iptal';
export const ISLEM_EXPORT = 'export';
export const ISLEM_EXPORT_PDF = 'pdf';
export const ISLEM_EXPORT_EXCEL = 'excel';


export function handleItemChange(field, value, setItem) {
    setItem(oldState => {
        const next = produce(oldState, draft => {
            draft[field] = value;
        });
        return next;
    });
}


const axiosObj = axios.create({
    paramsSerializer: {
        encode: parse,
        serialize: stringify,
    },
})

axiosObj.interceptors.response.use((response) => {
    return response;
}, (error) => {

    return Promise.reject(error);
});


export async function callAPI({ method, url, headers, params, data }) {

    try {
        const res = await axiosObj({
            method,
            url: `${process.env.REACT_APP_API_URL}/${url}`,
            headers: { ...headers },
            params,
            data,
        });
        return res;

    } catch (e) {
        if (e?.response?.status !== 403) {

            getGlobalToast().show({ severity: 'error', summary: 'Hata', detail: <p>{e.response?.data?.message}</p>, life: 6000 });
            if (e.response.data.errors?.length) {
                getGlobalToast().show({ severity: 'error', summary: 'Hata', detail: <p>{e.response.data.errors.map(val => <>{val.defaultMessage}<br /></>)}</p>, life: 6000 });
            }
        }

        throw e;
    }
}
let globalToast = null;

export function setGlobalToast(ref) {
    globalToast = ref;
}

export function getGlobalToast() {
    return globalToast;
}

export function actionBodyTemplate(handleEdit, handleDelete) {
    return rowData => {
        return (
            <div style={{ height: '30px', alignItems: 'center', display: 'flex', justifyContent: 'center', width: '120px' }}>
                {handleEdit && <Button type="button" icon="pi pi-pencil" className="p-button-primary " style={{ height: '30px', width: '30px', borderRadius: "50%" }}
                    onClick={() => handleEdit(rowData)} />}
                {handleDelete && <Button type="button" icon="pi pi-trash" className="p-button-danger mx-2" style={{ height: '30px', width: '30px', borderRadius: "50%" }}
                    onClick={() => handleDelete(rowData)} />}
            </div>
        );
    };
}

export function dateBodyTemplate(par) {
  return  par.substring(0, 10) + " " + par.substring(11 , 19) ;
}