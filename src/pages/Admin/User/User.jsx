import React, { Fragment, useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
// import { XoaPhim, getmovieList, layThongTinPhim } from '../../../store/quanLyPhim/thunkAction';
import { NavLink, Outlet } from 'react-router-dom';
import { checkToken } from '../../../constant/api';
import Search from 'antd/es/transfer/search';
import { deleteThongTinUser, layDSNguoiDung, layThongTinNguoiDung } from '../../../store/quanLyNguoiDung/thunkAction';

const User = () => {
  checkToken()
  const dispatch = useDispatch()
  const { listUser } = useSelector((state) => state.quanLyNguoiDung)
  useEffect(() => {
    dispatch(layDSNguoiDung("GP01"))
  }, [dispatch])
  // console.log(movieList);
  console.log(listUser);
  const data = listUser;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const onSearch = (value) => {
    // console.log(value);
  }
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Tên tại khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      width: '10%',
      ...getColumnSearchProps('taiKhoan'),
    },
    {
      title: 'Họ và tên',
      dataIndex: 'hoTen',
      ...getColumnSearchProps('hoTen'),
      key: 'taiKhoai',
      width: '15%',

    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDT',
      width: '20%',
      key: 'taiKhoan',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '15%',
      key: 'taiKhoan',

    },
    {
      title: 'Mã loại người dùng',
      dataIndex: 'maLoaiNguoiDung',
      width: '15%',
      key: 'taiKhoan',

    },
    {
      title: <div className='text-center'> <i className=" fa-solid fa-gear"></i></div>,
      dataIndex: 'action',
      width: '10%',
      key: 'taiKhoan',
      render: (text, user) => {

        return <Fragment key={1}>
          <div className='flex justify-around  text-center'>
            <NavLink key={1} className=" text-1xl text-blue-500 " to={`/admin/user/edit/${user.taiKhoan}`}><i className="fa-solid fa-pen-to-square"></i></NavLink>
            <div key={2} className=" text-1xl  " style={{ cursor: 'pointer' }}
              onClick={
                async () => {
                  if (window.confirm(`Bạn có muấn xoá tài khoản: ${user.taiKhoan} không ?`)) {
                    await dispatch(deleteThongTinUser(String(user.taiKhoan)));
                    dispatch(layDSNguoiDung("GP01"))
                  }
                }
              }

            ><i className="fa-regular fa-trash-can text-red-500"></i></div>
            <NavLink key={3} className=" text-1xl  text-blue-500 " style={{ cursor: 'pointer' }} to={`/admin/user/booktickets/${user.taiKhoan}`}>
              <i class="fa-solid fa-calendar-days"></i>
            </NavLink>
          </div >
        </Fragment>
      },
    },
  ];
  return (

    <div className='h-full' key={1}>
      <Outlet />

      <h3 className='text-2xl my-1 font-bold'>Quản lý người dùng</h3>
      {/* <Search placeholder='Tìm kiếm phim !' onChange={onSearch()} /> */}
      <Button className='my-1'><NavLink to="/admin/user/add">Thêm người dùng +</NavLink></Button>
      <Table columns={columns} dataSource={data} />
    </div>
  )
};


export default User