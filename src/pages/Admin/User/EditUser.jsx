import React, { useEffect, useState } from 'react'
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { checkToken } from '../../../constant/api';
import { layThongTinNguoiDungByID, upDateThongTinUser } from '../../../store/quanLyNguoiDung/thunkAction';
const EditUser = () => {
    // check Token bearer
    checkToken()
    const [componentSize, setComponentSize] = useState('default');
    // const [imgSrc, setImgSrc] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { thongTinNguoiDungByID } = useSelector(state => state.quanLyNguoiDung)
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const param = useParams()
    // console.log(param.id);
    useEffect(() => {
        dispatch(layThongTinNguoiDungByID(param.id))
    }, [])
    // console.log(thongTinNguoiDungByID);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDungByID?.taiKhoan,
            matKhau: thongTinNguoiDungByID?.matKhau,
            email: thongTinNguoiDungByID?.email,
            soDt: thongTinNguoiDungByID?.soDT,
            maNhom: thongTinNguoiDungByID?.maNhom,
            maLoaiNguoiDung: thongTinNguoiDungByID?.maLoaiNguoiDung,
            hoTen: thongTinNguoiDungByID?.hoTen
        },
        onSubmit: async (values) => {
         
            // values.maNhom = "GP13"
            await dispatch(upDateThongTinUser(values))
            navigate("/admin/user")
        }
    })
    const handleMaLoaiNguoiDung = (valuse) => {

        formik.setFieldValue("maLoaiNguoiDung", valuse[0])
    }
    return (
        <Form
            key={1}
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 5,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            style={{
                maxWidth: 1200,
            }}
        >
            <h3 className='mb-1 text-2xl font-bold'>Chỉnh sửa thông tin người dùng</h3>
            <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Tên tài khoản">
                <Input name='taiKhoan' onChange={formik.handleChange} value={formik.values.taiKhoan} />
            </Form.Item>
            <Form.Item label="Tên người dùng">
                <Input name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} />
            </Form.Item>
            <Form.Item label="Số điện thoại">
                <Input name='soDt' onChange={formik.handleChange} value={formik.values.soDt} />
            </Form.Item>
            <Form.Item label="Email">
                <Input name='email' onChange={formik.handleChange} value={formik.values.email} />
            </Form.Item>
            <Form.Item label="Mật khẩu" valuePropName="checked">
                <Input.Password name='matKhau' onChange={formik.handleChange} value={formik.values.matKhau} />
            </Form.Item>
            <Form.Item label="Mã loại người dùng" valuePropName="checked">
                <Cascader
                    options={

                        [
                            {
                                value: 'QuanTri',
                                label: 'Quản Trị',
                            },
                            {
                                value: 'KhachHang',
                                label: 'Khách Hàng',
                            },
                        ]}
                    onChange={handleMaLoaiNguoiDung}
                    placeholder="Chọn mã loại người dùng"
                />
            </Form.Item>
            <div className='text-right w-full'>
                <button type='submit' className='bg-green-500 text-white font-bold  p-2  rounded-md  transition duration-300 scale-95 hover:scale-105'>Cập nhật</button>
            </div>
        </Form >
    );
}

export default EditUser