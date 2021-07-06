import React, { useState, useContext } from 'react';
import { Input, Space, Button, Alert } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Buttons from '../FormItems/Button';
import { Link } from 'react-router-dom'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
// import Navigation from '../components/navigation'
const login = gql`
mutation(
    $username: String!
    $password: String!
){
    login(
        username:$username
        password:$password
        ){
      id
      email
      token
      username
      createdAt
    }
  }
`


const Login = () => {
    const [val, setval] = useState({
        username: "",
        password: ""
    })
    const [errors, setErrors] = useState({});
    const context = useContext(AuthContext);
    const [loginUser, { loading }] = useMutation(login, {
        update(
            _,
            {
                data: { login: userData }
            }
        ) {
            context.login(userData);
            //   props.history.push('/drag');
        },
        onError(err) {
            console.log('here', err)
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
            
        },
        variables: val
    })
    function loginUserCallback() {
        loginUser();
    }

    const ChangeHandler = (e) => {
        setval({ ...val, [e.target.name]: e.target.value })
    }
    console.log(loading)

    return (
        <>
        {/* <Navigation /> */}
        <div className="singin-main-container" style={{marginTop:'0px'}}>
            <div className="signin-left-container">
                <div className="logo-conatainer">
                    <h1 className="left-logo">App</h1>
                </div>
                <div className="signin-input">
                    <h3 style={{textAlign:'left'}} className="sigin-name">Login</h3>
                    <Input className="input" name="username" onChange={(e) => ChangeHandler(e)} suffix={<UserOutlined style={{ color: 'light-gray !important' }} />} placeholder="Username" />
                    <Space direction="vertical">
                        <Input.Password
                            className="input"
                            name="password"
                            onChange={(e) => ChangeHandler(e)}
                            placeholder="Password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Space>
                    <div className="checkbox-align">
                        {/* <div>
                            <Checkbox className="SignIn-Checkbox"><span >Remember me</span></Checkbox>
                        </div> */}
                        {/* <div>
                            <Link to="/forgotPassword">
                                <p className="singin-forgot-password">
                                    Forgot password
                                </p>
                            </Link>
                        </div> */}
                    </div>
                    <Buttons onClick={() =>
                        loginUserCallback()
                    } className="SignUp-btn" name="Log in" />
                    {errors.username && <Alert style={{ marginTop: '10px' }} message={errors.username} type="warning" showIcon closable />}
                    {errors.password && <Alert style={{ marginTop: '10px' }} message={errors.password} type="warning" showIcon closable />}
                    {errors.general && <Alert style={{ marginTop: '10px' }} message={errors.general} type="warning" showIcon closable />}

                </div>
            </div>
            <div className="signin-right-container">
                <div className="newUser-container">
                    <h1>New User?</h1>
                </div>
                <p className="newUser-para">Click on get started to create an account with us. It will only take a few minutes</p>
                <div className="btn-container">
                    <Button className="btn-started" type="button"><Link to="/signup">Get Started</Link></Button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login
