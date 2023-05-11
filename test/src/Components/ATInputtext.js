import React from 'react';
import { InputText } from 'primereact/inputtext';

export default function ATInputtext({ label, required, invalidAciklama, dimen, ...rest }) {
    return (
        <>
            <div className={`p-pr-0 p-pl-0 mb-3 p-xl-${dimen}`}>
                <span className="p-float-label">
                    <InputText style={{width:'100%',paddingBottom:"20px"}} type="text" className={required ? "p-invalid" : ""} {...rest} />
                    {invalidAciklama && <small className="p-invalid">{invalidAciklama}</small>}
                    <label htmlFor="inputtext" ><b>{label}</b></label>
                </span>
            </div>

        </>
    )
}
