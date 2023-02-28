import {EditOutlined} from '@ant-design/icons';
import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';

const Login = () => {
   return (
	   <Content>
			<Title style={{textAlign: 'center'}}>Login <EditOutlined /></Title>
	   </Content>
   );
};

export default Login;
