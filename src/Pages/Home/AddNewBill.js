import axios from "axios";
import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import {
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

const AddNewBill = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [reload, setReload] = useState(false);

  ///api/billing-list

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios.post("http://localhost:5002/api/billing-list", data).then((res) => {
      const { data } = res;
      console.log(data);
      if (data) {
        swal("Good job!", "You have added a new bill", "success");
        setReload(!reload);
      }
      <Spinner animation="border" variant="primary" />;
    });
  };
  return (
    <Navbar className="my-2" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Billings</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </Nav>
          <Button variant="dark" onClick={handleShow}>
            Add New Bill
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Enter Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your Full Name"
                    {...register("name")}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    {...register("email")}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Phone Number"
                    {...register("phone")}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput4"
                >
                  <Form.Label>Enter Paid Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Paid Amount"
                    {...register("amount")}
                    autoFocus
                  />
                </Form.Group>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
            {/* <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer> */}
          </Modal>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AddNewBill;
