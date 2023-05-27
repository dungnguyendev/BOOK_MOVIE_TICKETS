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
import { useEffect, useState } from 'react';
import { quanLyRapServices } from '../../../services/quanLyRap.servies';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { checkToken } from '../../../constant/api';
import { createShowTimes1 } from '../../../store/quanLyRap/thunkAction';

const Showtime = () => {
  checkToken()
  const param = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      maPhim: Number(param?.id),
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: '',
    },
    onSubmit: async (values) => {
      // console.log(values);

      await dispatch(createShowTimes1(values))
      navigate("/admin/film")
    }
  })
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  })
  useEffect(() => {
    const asyncFn = async () => {
      try {
        let result = await quanLyRapServices.getTheaterList();
        setState({
          ...state,
          heThongRapChieu: result.data.content
        })
      } catch (error) {
        console.log("err: " + error);
      }
    }
    asyncFn()
  }, [])
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const handleChangeHeThongRap = async (values) => {

    try {
      let result = await quanLyRapServices.fetchGroupTheater(values);
      // console.log(result.data.content);
      setState({
        ...state,
        cumRapChieu: result.data.content,
      })
    } catch (error) {
      console.log("err: " + error);
    }
  }
  const handleChangeCumRap = (values) => {
    console.log(values[0]);
    formik.setFieldValue("maRap", String(values[0]))
  }
  const SelectorHTR = () => {
    return state.heThongRapChieu?.map((htr, index) => {
      return { label: htr.tenHeThongRap, value: htr.maHeThongRap }
    })
  }
  const SelectorCumRap = () => {
    return state.cumRapChieu?.map((cumRap, index) => {
      return { label: cumRap.tenCumRap, value: cumRap.maCumRap }
    })
  }
  const onChangeDate = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
    // console.log(values.$d);

  }
  const onChangeInputNumber = (values) => {
    formik.setFieldValue('giaVe', values)
  }
  // const onOk = (values) => {
  //   formik.setFieldValue('ngayChieuGioChieu', values?.$d)
  //   // console.log(moment(values).format('DD/MM/YYYY hh:mm:ss'));
  //   // formik.setFieldTouched()
  // }
  let film = {};
  if (localStorage.getItem('filmParam')) {
    film = JSON.parse(localStorage.getItem('filmParam'));
  }
  return (
    <Form
      labelCol={{
        span: 4,
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
      onSubmitCapture={formik.handleSubmit}
    >
      <h3 className='font-bold text-2xl mb-5 '>Tạo lịch chiếu - Phim: {film.tenPhim}</h3>
      <div className='w-32 m-auto mb-5'>
        <img src={film?.hinhAnh} alt="" style={{ width: "120px", height: "200px" }} />
        <p className='italic'>( hình ảnh phim )</p>
      </div>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Hệ thống rạp">
        <Cascader
          options={SelectorHTR()}
          onChange={handleChangeHeThongRap}
          placeholder="Chọn hệ thống rạp"
        />
      </Form.Item>
      <Form.Item label="Cụm rạp">
        <Cascader
          options={SelectorCumRap()}
          onChange={handleChangeCumRap}
          placeholder="Chọn cụm rạp"
        />
      </Form.Item>
      <Form.Item label="Ngày chiếu, giờ chiếu">
        <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} />
      </Form.Item>
      <Form.Item label="Giá vé">
        <InputNumber min={75000} max={150000} onChange={onChangeInputNumber} />
      </Form.Item>
      <div className='text-right w-full'>
        <button type='submit' className='bg-green-500 text-white font-bold  p-2  rounded-md  transition duration-300 scale-95 hover:scale-105'>Tạo lịch chiếu</button>
      </div>
    </Form>
  );
}

export default Showtime