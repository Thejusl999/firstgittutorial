import React from 'react';
import './AddProductInput.css'
const AddProductInput=React.forwardRef((props,ref)=>{
    return <div className="form-controls">
        <label>{props.label}</label>
        <input
        className="form-inputs"
        type={props.type}
        ref={ref}
        />
    </div>
});
export default AddProductInput;