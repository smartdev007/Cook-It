import React from 'react'
import { Button } from 'antd';
// import './Assets/css/button.css'
import '../Assets/css/button.css'
const Buttons = (props) => {
    return (
        <Button type="button" className="Submit-btn btn-text" onClick={props.onClick}>{props.name}</Button>
    )
}

export default Buttons
