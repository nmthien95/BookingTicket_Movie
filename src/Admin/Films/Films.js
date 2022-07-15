import React, { Fragment, useEffect, useState } from "react";
import { Button, Space, Table, Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { layDanhPhimAction } from "../../redux/action/QuanLyPhimAction";

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
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
      width: "20%",
      sorter: (a, b) => a.maPhim - b.maPhim,
      width: 200,

      sortOrder: sortedInfo.columnKey === "maPhim" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: "10%",
      render: (text, film, index) => {
        return (
          <Fragment>
            <img
              src={text}
              alt={film.tenPhim}
              style={{ width: 50, height: 50 }}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      width: "30%",

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
  ];
  const onSearch = (value) => console.log(value);
  return (
    <>
      <h3 className="text-theme text-center text-bold text-3xl">
        Quản lý Phim
      </h3>
      <Button className="mb-5">Thêm phim</Button>
      <Search
        className="mb-5"
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
      />
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
}
