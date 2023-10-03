import React from 'react';
const InputContext=React.createContext({
    items:[],
    addItem:(item)=>{},
    inputUpdater:()=>{}
});
export default InputContext;