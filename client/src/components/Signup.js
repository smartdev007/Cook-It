import React, { useState, useContext } from 'react'
import { Space, Alert, Input, Select } from 'antd';
import Buttons from '../FormItems/Button';
import { UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// import Navigation from '../components/navigation'
import { AuthContext } from '../context/auth';
const register = gql`
mutation(
    $username: String!,
    $password: String!,
    $confirmPassword: String!,
    $email:String!,
){
    register(registerInput:{
      username:$username
      password:$password
      confirmPassword:$confirmPassword
      email:$email
    }){
      email
      token
    }
  }
`
const Signup = () => {
  const [data, setdata] = useState({
    username: '',
    password: "",
    confirmPassword: "",
    email: "",

  })

  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);
  const [loginUser, { loading }] = useMutation(register, {
    update(
      _,
      {
        data: { register: userData }
      }
    ) {
      context.login(userData);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: data
  })
  console.log(loading)

  const ChangeHandler = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }
  const regiss = () => {
    loginUser()
  }

  return (
    <>
      {/* <Navigation /> */}
      <div className="singin-main-container" style={{ marginTop: '0px' }}>
        <div className="signin-left-container">
          <div className="logo-conatainer">
            <h1 className="left-logo">App</h1>
          </div>
          <div className="signin-input">
            <h3 style={{textAlign:'left'}} className="sigin-name">Signup</h3>
            <Input className="input" name="username" onChange={(e) => ChangeHandler(e)} suffix={<UserOutlined style={{ color: 'light-gray !important' }} />} placeholder="Username" />
            <Input className="input" placeholder="Email Address" name="email" onChange={(e) => ChangeHandler(e)} />
            <Space direction="vertical">
              <Input.Password
                className="input"
                name="password" onChange={(e) => ChangeHandler(e)} placeholder="Password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Space>
            <Space direction="vertical">
              <Input.Password
                className="input"
                name="confirmPassword" onChange={(e) => ChangeHandler(e)} placeholder="Confirm Password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Space>
            <div className="checkbox-align">
            </div>
            <Buttons onClick={() =>
              regiss()
            } className="SignUp-btn" name="SignUp" />
            {errors.username && <Alert style={{ marginTop: '10px' }} message={errors.username} type="warning" showIcon closable />}
            {errors.password && <Alert style={{ marginTop: '10px' }} message={errors.password} type="warning" showIcon closable />}
            {errors.general && <Alert style={{ marginTop: '10px' }} message={errors.general} type="warning" showIcon closable />}
          </div>
        </div>
        <div className="signin-right-container">
          <div className="newUser-container">
            <h1>SignUp</h1>
          </div>
          {/* <p style={{ textAlign: 'center', color: 'white' }}> Please Select Country and Buisness Fields Here.</p> */}
   
          {/* <div className="btn-container">
            <Button className="btn-started" type="button"><Link to="/signup">Get Started</Link></Button>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Signup