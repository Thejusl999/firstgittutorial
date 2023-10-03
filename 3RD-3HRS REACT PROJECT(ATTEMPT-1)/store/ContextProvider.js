import React from 'react';
import CrudContext from './crud-context';
const ContextProvider=props=>{
    const baseUrl='https://crudcrud.com/api/5ef5491c0df34ee1a036ebb50f32251f';
    const crudContext={
        baseUrl:baseUrl,
    }
    return <CrudContext.Provider value={crudContext}>
        {props.children}
    </CrudContext.Provider>
}
export default ContextProvider;