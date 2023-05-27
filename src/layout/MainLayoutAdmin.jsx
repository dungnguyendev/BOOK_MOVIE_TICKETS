import { Layout, Menu, Breadcrumb, theme } from 'antd';
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './../pages/CSS/admin.css'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Space } from 'antd';
import { quanLyNguoiDungActions } from '../store/quanLyNguoiDung/slice';
const Dashboard = () => {
    // dropdow heder
    const items = [
        {
            label: (
                <button
                    onClick={() => {
                        dispatch(quanLyNguoiDungActions.logOut());

                        navigate("/login");
                    }}
                    className="pr-8"
                >
                    Đăng xuất
                </button>
            ),
            key: '0',
        },
        {
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            ),
            key: '1',
        }
    ];

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;
    const { user } = useSelector(state => state.quanLyNguoiDung)
    useEffect(() => {
        if (!localStorage.getItem("user")) {
            toast.error("Bạn không có quền truy cập vào trang admin");
            return (navigate("/home"))
        }
        if (user?.maLoaiNguoiDung !== "QuanTri") {
            toast.error("Bạn không có quền truy cập vào trang admin");
            return (navigate("/home"))
        }
    }, [])
    return (
        <Layout className='h-full'>

            <Layout>
                <Sider breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}>
                    <div className="logo bg-white text-orange-400">Movies Film</div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '80%', borderRight: 0 }}
                    >
                        <SubMenu key="sub4" icon={<i className="fa-solid fa-user"></i>} title="User">
                            <Menu.Item key="5">
                                <NavLink to="/admin/user">Profile User</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<i className="fa-solid fa-film"></i>} title="Film">
                            <Menu.Item key="2">
                                <NavLink to="/admin/film">Films</NavLink>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <NavLink to="/admin/film/addnew">Thêm Film</NavLink>
                            </Menu.Item>
                        </SubMenu>

                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Header style={{ padding: 0, background: colorBgContainer }} >
                        <div className='flex justify-end mr-5'>
                            <p className='mt-3 mr-2 rounded-full bg-red-500' style={{ width: "30px", height: "30px" }}></p>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                            >
                                <p>Xin chào, <span className='font-bold'>{user?.taiKhoan}</span></p>
                            </Dropdown>

                        </div>
                    </Header>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    </Breadcrumb>
                    <Content>
                        <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Dashboard