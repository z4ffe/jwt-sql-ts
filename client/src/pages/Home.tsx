import {Content} from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const Home = () => {
   return (
	   <Content>
		  <Title style={{textAlign: 'center'}}>What a form!</Title>
		  <Register/>
	   </Content>
   );
};

export default Home;
