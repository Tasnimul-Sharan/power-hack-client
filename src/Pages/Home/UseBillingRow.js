import React from "react";
import { Button } from "react-bootstrap";
import swal from "sweetalert";

const UseBillingRow = ({
  billing,
  setReload,
  reload,
  refetch,
  show,
  setUpdateBilling,
  handleShow,
}) => {
  const { _id, name, email, amount, phone } = billing;
  const handleDelete = (id) => {
    fetch(`http://localhost:5002/api/delete-billing/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          swal("Deleted!", "You have Deleted a billing item", "success");
          setReload(!reload);
        }
        refetch();
      });
  };

  return (
    <tr>
      <td>{_id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{amount}</td>
      <td>
        <Button
          variant="dark"
          show={show}
          handleShow={handleShow}
          onClick={() => setUpdateBilling(billing)}
        >
          Edit
        </Button>
        |{" "}
        <Button onClick={() => handleDelete(_id)} variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default UseBillingRow;
