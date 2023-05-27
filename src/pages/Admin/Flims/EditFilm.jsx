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
import { values } from 'lodash';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhim, layThongTinPhim, themPhimUploadHinh } from '../../../store/quanLyPhim/thunkAction';
import { useNavigate, useParams } from 'react-router';
import { checkToken } from '../../../constant/api';
import { async } from 'q';
const EditFilm = () => {
    // check Token bearer
    checkToken()
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { thongTinPhim } = useSelector(state => state.quanLyPhim)
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const param = useParams()
    useEffect(() => {
        dispatch(layThongTinPhim(param.id))
    }, [])
    // console.log(thongTinPhim);
    const formik = useFormik({
        // lên sử dụng cho form edit
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim?.maPhim,
            tenPhim: thongTinPhim?.tenPhim,
            trailer: thongTinPhim?.trailer,
            moTa: thongTinPhim?.moTa,
            ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu,
            dangChieu: thongTinPhim?.dangChieu,
            sapChieu: thongTinPhim?.sapChieu,
            hot: thongTinPhim?.hot,
            danhGia: thongTinPhim?.danhGia,
            hinhAnh: null,

        },
        onSubmit: async (values) => {
            // console.log(values);
            values.maNhom = "GP13"
            let formData = new FormData()
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('hinhAnh', values.hinhAnh, values.hinhAnh.name)
                    }
                }
            }
            // console.log(formData.get("hinhAnh"));
            await dispatch(capNhatPhim(formData))
            navigate("/admin/film")

        }
    })
    const handleChangeDatePicker = (value) => {
        // console.log(value);
        let ngayKhoiChieu = moment(value);
        // console.log(ngayKhoiChieu);
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }
    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }
    const handleChangeFile = async (e) => {
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            // console.log(file);
            // xử lý bdb khi upload hình 
            await formik.setFieldValue('hinhAnh', file)
            // tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // console.log(e.target.result);
                setImgSrc(e.target.result);//hình base 64
            }
        }
        // save to formik
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
            <h3 className='mb-1 text-2xl font-bold'>Chỉnh sửa thông tin phim</h3>
            <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Tên phim">
                <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker onChange={handleChangeDatePicker} format={"DD/MM/YYYY"} value={moment(formik.values.ngayKhoiChieu)} />
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch name="danhChieu" onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch name="sapChieu" onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
            </Form.Item>
            <Form.Item label="Hot">
                <Switch name="hot" onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
            </Form.Item>
            <Form.Item label="Số sao">
                <InputNumber onChange={handleChangeSwitch('danhGia')} min={1} max={10} value={formik.values.danhGia} />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <input type='file' onChange={handleChangeFile} accept='image/jpeg,image/jpg,image/gif,image/png ' />
                <img className='my-1' style={{ width: "120px", height: "170px" }} src={imgSrc === "" ? thongTinPhim?.hinhAnh : imgSrc} alt='...' />
            </Form.Item>

            <div className='text-right w-full'>
                <button type='submit' className='bg-green-500 text-white font-bold  p-2  rounded-md  transition duration-300 scale-95 hover:scale-105'>Cập nhật</button>
            </div>
        </Form >
    );
}

export default EditFilm