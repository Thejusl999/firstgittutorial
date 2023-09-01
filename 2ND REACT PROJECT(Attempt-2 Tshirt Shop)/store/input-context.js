import React from 'react';
const InputContext=React.createContext({
    items:[],
    addItem:(item)=>{}
});
export default InputContext;