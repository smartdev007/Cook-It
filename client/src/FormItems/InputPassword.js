import React from 'react'
import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
const InputPassword = (props) => {
    return (
        <Space direction="vertical">
            <Input.Password
                className="inputText "
                placeholder={props.placeholder}
                value={props.password}
                name={props.name}
                onChange={props.onChange}
                style={{width:`${props.width}`}}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
        </Space>
    )
}

export default InputPassword
