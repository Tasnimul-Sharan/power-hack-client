import React from "react";
import { Button } from "react-bootstrap";
import swal from "sweetalert";

const UseBillingRow = ({ billing, setReload, reload, refetch, show }) => {
  const { _id, name, email, amount, phone } = billing;
  const handleDelete = (id) => {
    fetch(
      `https://peaceful-fortress-93887.herokuapp.com/api/delete-billing/${id}`,
      {
        method: "DELETE",
        //   headers: {
        //     authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        //   },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          swal("Deleted!", "You have Deleted a billing item", "success");
          //   setDeleteBill(false);
          setReload(reload);
        }
        refetch();
      });
  };

  const handleUpdate = (data) => {
    // const update = {
    //   name: data.name,
    //   email: data.email,
    //   amount: data.amount,
    //   phone: data.phone,
    // };
    fetch(
      `https://peaceful-fortress-93887.herokuapp.com/api/update-billing/${_id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
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
      <td>{phone}</td>
      <td>{amount}</td>
      <td>
        <Button
          // show={show}
          onClick={(show) => handleUpdate(show)}
          variant="dark"
        >
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
