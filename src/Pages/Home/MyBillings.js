import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";
import UseBillingRow from "./UseBillingRow";
import PaginationPages from "./PaginationPages";
import { Pagination } from "react-bootstrap";
import "./Home.css";
import AddNewBill from "./AddNewBill";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";

const MyBillings = () => {
  const [pageCount, setPageCount] = useState(0);
  const [bills, setBills] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [reload, setReload] = useState(false);
  const [deleteBill, setDeleteBill] = useState(true);
  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useEffect(() => {
  //   fetch(`http://localhost:5002/billings?page=${page}&size=${size}`)
  //     .then((res) => res.json())
  //     .then((data) => setBills(data));
  // }, [page, size]);

  // useEffect(() => {
  //   fetch("http://localhost:5002/billingCount")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const count = data.count;
  //       const pages = Math.ceil(count / 10);
  //       setPageCount(pages);
  //     });
  // }, []);

  const {
    data: billings,
    isLoading,
    refetch,
  } = useQuery(["billing-list"], () =>
    fetch("http://localhost:5002/api/billing-list").then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container">
      <AddNewBill
        refetch={refetch}
        show={show}
        // setShow={setShow}
        reload={reload}
        setReload={setReload}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      <Table border="border" responsive="sm, md lg">
        <thead>
          <tr>
            <th>Billing Id</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Paid Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {billings?.map((billing) => (
            <UseBillingRow
              key={billing._id}
              billing={billing}
              reload={reload}
              setReload={setReload}
              //   setDeleteBill={setDeleteBill}
              refetch={refetch}
              show={show}
              //   data={data}
            ></UseBillingRow>
          ))}
        </tbody>
      </Table>
      <div className="pagination">
        {[...Array(pageCount).keys()].map((number) => (
          <Button
            className={page === number ? "selected" : ""}
            onClick={() => setPage(number)}
          >
            {number}
          </Button>
        ))}
        <select onChange={(e) => setSize(e.target.value)}>
          <option value="5">5</option>
          <option value="10" selected>
            10
          </option>
        </select>
      </div>
    </div>
  );
};

export default MyBillings;
