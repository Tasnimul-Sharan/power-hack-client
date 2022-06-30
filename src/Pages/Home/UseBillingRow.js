import React from "react";
import { Button } from "react-bootstrap";
import swal from "sweetalert";

const UseBillingRow = ({ billing, setReload, reload, setDeleteBill }) => {
  const { _id, name, email, amount, phone } = billing;
  const handleDelete = (id) => {
    fetch(`http://localhost:5002/api/delete-billing/${id}`, {
      method: "DELETE",
      //   headers: {
      //     authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //   },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          swal("Deleted!", "You have Deleted a billings", "success");
          setDeleteBill(false);
          setReload(reload);
        }
      });
  };

  const handleUpdate = (id) => {
    fetch(`http://localhost:5002/api/update-billing/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      //   body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          swal("Updated!", "You billing data is updated", "success");
        }
      });
  };

  return (
    <tr>
      <td>{_id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{amount}</td>
      <td>{phone}</td>
      <td>
        <Button onClick={() => handleUpdate(_id)} variant="dark">
          Edit
        </Button>{" "}
        |{" "}
        <Button onClick={() => handleDelete(_id)} variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default UseBillingRow;
