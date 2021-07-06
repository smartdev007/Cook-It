import React from 'react'
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../Assets/css/inputtext.css'
const InputText = (props) => {
    return (
        <Input name={props.name} className="inputText" style={{width:`${props.width} !important`}} suffix={<UserOutlined style={{color:'light-gray'}} />} value={props.value} placeholder={props.placeholder} onChange={props.onChange} />
    )
}

export default InputText
