import React, { Fragment, useEffect, useState } from "react";
import { Button, Space, Table, Input } from "antd";
import {
  AudioOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhPhimAction,
  xoaPhimAction,
} from "../../../redux/action/QuanLyPhimAction";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";

const { Search } = Input;

export default function Films() {
  const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);
  const data = arrFilmDefault;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhPhimAction());
  }, []);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
      width: "15%",
      sorter: (a, b) => a.maPhim - b.maPhim,

      sortOrder: sortedInfo.columnKey === "maPhim" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: "15%",
      render: (text, film, index) => {
        return (
          <div className="flex justify-center items-center  lg:p-3">
            <img
              src={text}
              alt={film.tenPhim}
              style={{ width: 60, height: 60 }}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/index}/50/50`;
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      width: "20%",

      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortOrder: sortedInfo.columnKey === "tenPhim" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      width: "40%",
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length > 50
              ? film.moTa.substr(0, 80) + " ..."
              : film.moTa}
          </Fragment>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      key: "hanhDong",
      width: "10%",
      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              className="bg-slate-700 text-white  mr-2 text-2xl inline-flex p-1 transition-all ease-linear hover:text-lime-500 rounded-lg"
              to={`/admin/edit/${film.maPhim}`}
            >
              <EditOutlined />
            </NavLink>
            <span
              className="bg-slate-700 text-red-400 text-2xl inline-flex p-1 hover:text-lime-500  transition-all ease-linear rounded-lg cursor-pointer"
              onClick={() => {
                if (
                  window.confirm("Bạn có chắc muốn xóa phim" + film.tenPhim)
                ) {
                  dispatch(xoaPhimAction(film.maPhim));
                }
              }}
            >
              <DeleteOutlined />
            </span>
          </Fragment>
        );
      },
    },
  ];
  const onSearch = (value) => {
    console.log(value);
    //goi api laasy danh sach phim
    dispatch(layDanhPhimAction(value));
  };
  return (
    <>
      <h3 className="text-theme text-center text-bold text-3xl">
        Quản lý Phim
      </h3>
      <Button
        className="mb-5"
        onClick={() => {
          history.push("/admin/films/addnew");
        }}
      >
        Thêm phim
      </Button>
      <Search
        className="mb-5"
        placeholder="input search text"
        onSearch={onSearch}
        enterButton={<SearchOutlined />}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        rowKey={"maPhim"}
      />
    </>
  );
}
