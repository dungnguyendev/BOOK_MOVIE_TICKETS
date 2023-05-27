import React, { Fragment, useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { XoaPhim, getmovieList, layThongTinPhim } from '../../../store/quanLyPhim/thunkAction';
import { NavLink, Outlet } from 'react-router-dom';
import { checkToken } from '../../../constant/api';
import Search from 'antd/es/transfer/search';

const Film = () => {
  checkToken()
  const dispatch = useDispatch()
  const { movieList } = useSelector((state) => state.quanLyPhim)
  useEffect(() => {
    dispatch(getmovieList())
  }, [dispatch])
  // console.log(movieList);
  const data = movieList
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
      title: 'Mã phim',
      dataIndex: 'maPhim',
      key: 'maPhim',
      width: '10%',
      ...getColumnSearchProps('maPhim'),
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      render: (text, film, index) => {
        return <Fragment>
          <img key={index} src={film.hinhAnh} alt="" style={{ width: "100%", height: "140px" }} />
        </Fragment>
      },
      key: 'maPhim',
      width: '15%',

    },
    {
      title: 'Tên phim',
      dataIndex: 'tenPhim',
      width: '30%',
      key: 'maPhim',
    },
    {
      title: 'Ngày khởi chiếu',
      dataIndex: 'ngayKhoiChieu',
      width: '15%',
      key: 'maPhim',

    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      width: '30%',
      key: 'maPhim',
      render: (text, film) => {
        return <Fragment>
          {film.moTa.length > 50 ? film.moTa.substr(0, 100) + "..." : film.moTa}
        </Fragment>
      },
    },
    {
      title: 'Hành động',
      dataIndex: 'hanhDong',
      width: '15%',
      key: 'maPhim',
      render: (text, film) => {

        return <Fragment key={1}>
          <div className='flex justify-center items-center content-center'>
            <NavLink key={1} className="mr-1 text-1xl text-blue-500 " to={`/admin/edit/${film.maPhim}`}><i className="fa-solid fa-pen-to-square"></i></NavLink>
            <div key={2} className="mr-1 text-1xl  " style={{ cursor: 'pointer' }}
              onClick={
                async () => {
                  if (window.confirm(`Bạn có muấn xoá bộ phim ${film.tenPhim}`)) {
                    await dispatch(XoaPhim(film.maPhim));
                    dispatch(getmovieList())
                  }
                }
              }

            ><i className="fa-regular fa-trash-can text-red-500"></i></div>
            <NavLink key={3} className="mr-1 text-1xl text-blue-500 " to={`/admin/create_calendar/${film.tenPhim}/${film.maPhim}`} onClick={() => {
              localStorage.setItem('filmParam', JSON.stringify(film))
            }}><i className="fa-regular fa-calendar"></i></NavLink>
          </div>
        </Fragment>
      },
    },
  ];
  return (

    <div className='h-full' key={1}>
      <Outlet />

      <h3 className='text-2xl my-1 font-bold'>Quản lý films</h3>
      {/* <Search placeholder='Tìm kiếm phim !' onChange={onSearch()} /> */}
      <Button className='my-1'><NavLink to="/admin/film/addnew">Thêm phim +</NavLink></Button>
      <Table columns={columns} dataSource={data} />
    </div>
  )
};


export default Film