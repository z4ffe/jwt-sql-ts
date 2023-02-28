import {LockOutlined} from '@ant-design/icons';
import {Button, Form, Input} from 'antd';
import {Content} from 'antd/es/layout/layout';
import {useFormik} from 'formik';
import React from 'react';
import apiInstance from '../lib/apiInstance';

const Register = () => {
   const formik = useFormik({
	  initialValues: {
		 email: '',
		 name: '',
		 password: '',
		 passwordConfirmation: ''
	  }, onSubmit: async (values) => {
		 const {email, name, password, passwordConfirmation} = values
		 const response = await apiInstance.post('/users', {
			email, name, password, passwordConfirmation
		 })
		 console.log(response.data)
	  }
   })

   return (
	   <Content>
		  <Form onFinish={formik.handleSubmit}>
			 <Form.Item
				 label="Name"
				 name="name"
				 rules={[{required: true, message: 'Please input your username!'}]}>
				<Input onChange={formik.handleChange}/>
			 </Form.Item><Form.Item
			  label="Email"
			  name="email"
			  rules={[{required: true, message: 'Please input your username!'}]}>
			 <Input onChange={formik.handleChange}/>
		  </Form.Item><Form.Item
			  label="Password"
			  name="password"
			  rules={[{required: true, message: 'Please input your username!'}]}>
			 <Input.Password
				 prefix={<LockOutlined className="site-form-item-icon"/>}
				 type="password"
				 placeholder="Password"
				 onChange={formik.handleChange}
			 />
		  </Form.Item><Form.Item
			  label="Password Confirmation"
			  name="passwordConfirmation"
			  rules={[{required: true, message: 'Please input your username!'}]}>
			 <Input.Password
				 prefix={<LockOutlined className="site-form-item-icon"/>}
				 type="password"
				 placeholder="Password"
				 onChange={formik.handleChange}
			 />
		  </Form.Item>
			 <Form.Item wrapperCol={{offset: 8, span: 16}}>
				<Button type="primary" htmlType="submit">Submit</Button>
			 </Form.Item>
		  </Form>
	   </Content>
   );
};

export default Register;
