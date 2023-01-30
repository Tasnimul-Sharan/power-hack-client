import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import UseBillingRow from "./UseBillingRow";

const UpdateBilling = ({
  setUpdateBilling,
  billing,
  refetch,
  show,
  handleShow,
  handleClose,
}) => {
  const { _id, name, email, phone, amount } = billing;
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const url = `https://power-hack-server-sigma.vercel.app/api/update-billing/${_id}`;
    axios
      .patch(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          method: "PATCH",
        },
      })
      .then((res) => {
        const { data } = res;
        if (data) {
          setUpdateBilling(false);
          refetch();
          swal("Updated!", "You billing data is updated", "success");
        }
      });
  };
  return (
    <Container fluid>
      <Button variant="dark" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update Billing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Full Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={name}
                placeholder="Your Full Name"
                {...register("name")}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                defaultValue={email}
                {...register("email")}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phone Number"
                defaultValue={phone}
                {...register("phone")}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Enter Paid Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Paid Amount"
                defaultValue={amount}
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
      </Modal>
    </Container>
  );
};

export default UpdateBilling;
