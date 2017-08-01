import React, { Component } from 'react';
import '../css/App.css';
import $ from 'jquery';

import Home from './Home';
import '../css/Home.css'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Header className="header">
            <div className="logo">
                School Design
            </div>

            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
            >
              {/*<Menu.Item key="1">nav 1</Menu.Item>*/}
              {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
              {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              {/*<Breadcrumb.Item>Home</Breadcrumb.Item>*/}
              {/*<Breadcrumb.Item>List</Breadcrumb.Item>*/}
              {/*<Breadcrumb.Item>App</Breadcrumb.Item>*/}
            </Breadcrumb>
            <Layout style={{ padding: '24px 0', background: '#fff' ,float:'left'}}>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                >
                  <SubMenu key="sub1" title={<span><Icon type="home" />首页</span>}>
                    <Menu.Item key="1">banner</Menu.Item>
                    <Menu.Item key="2">课程列表</Menu.Item>
                    <Menu.Item key="3">特色课程</Menu.Item>
                    <Menu.Item key="4">彩绘课程</Menu.Item>
                    <Menu.Item key="5">品格教育</Menu.Item>
                    <Menu.Item key="6">学校环境</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" title={<span><Icon type="notification" />园所概况</span>}>
                    <Menu.Item key="7">banner</Menu.Item>
                    <Menu.Item key="8">学校环境</Menu.Item>
                    <Menu.Item key="9">照片墙</Menu.Item>
                    <Menu.Item key="10">教育介绍</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub3" title={<span><Icon type="notification" />教育天地</span>}>
                    <Menu.Item key="11">banner</Menu.Item>
                    <Menu.Item key="12">教育模式</Menu.Item>
                    <Menu.Item key="13">特色教学</Menu.Item>
                    <Menu.Item key="14">照片墙</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub4" title={<span><Icon type="notification" />宝宝乐园</span>}>
                    <Menu.Item key="15">banner</Menu.Item>
                    <Menu.Item key="16">baby</Menu.Item>
                    <Menu.Item key="17">亲子主题乐园</Menu.Item>
                    <Menu.Item key="18">创想力</Menu.Item>
                    <Menu.Item key="19">照片墙</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub5" title={<span><Icon type="notification" />教师风采</span>}>
                    <Menu.Item key="20">banner</Menu.Item>
                    <Menu.Item key="21">幼教品牌</Menu.Item>
                    <Menu.Item key="22">业务园长</Menu.Item>
                    <Menu.Item key="23">副园长</Menu.Item>
                    <Menu.Item key="24">教育主任</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub6" title={<span><Icon type="notification" />我要预约</span>}>
                    <Menu.Item key="25">banner</Menu.Item>
                    {/*<Menu.Item key="10">表单验证</Menu.Item>*/}
                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ width: '1070px', minHeight: 280,}}>
               <Home/>
              </Content>
            </Layout>
          </Content>
          {/*<Footer style={{ textAlign: 'center' }}>*/}
            {/*Ant Design ©2016 Created by Ant UED*/}
          {/*</Footer>*/}
        </Layout>
      </div>
    );
  }
}
export default App;
