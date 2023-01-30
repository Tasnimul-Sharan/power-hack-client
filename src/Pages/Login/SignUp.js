import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import auth from "../../firebase.init";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Loading from "../Shared/Loading";
// import google from "../../images/google.png";
// import useToken from "../../Hooks/useToken";
import axios from "axios";
import swal from "sweetalert";
import { Form, Card } from "react-bootstrap";
import auth from "../../firebase.init";

const SignUp = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  // const [token] = useToken(user);
  const navigate = useNavigate();
  // const [error, setError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  const onSubmit = async (data) => {
    console.log(data);
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    axios
      .post("http://localhost:5002/api/registration", data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        const { data } = res;
        console.log(data);
        if (data) {
          swal("Good job!", "You are Sign In", "success");
          // setReload(!reload);
        }
        //   refetch();
      });
  };
  return (
    <div className="d-flex justify-content-center align-items-cente my-5">
      <Card className="  shadow-lg " style={{ width: "25rem" }}>
        <h1 className="text-3xl font-bold text-center">SIGN UP</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className=" m-3">
            <Form.Control
              type="text"
              placeholder="Enter Name"
              // class="input input-bordered w-full max-w-xs"
              {...register("name", {
                required: {
                  value: true,
                  message: "name is required",
                },
              })}
            />
            {errors.email?.type === "required" && (
              <span className="text-danger">{errors.text?.message}</span>
            )}
          </Form.Group>
          <Form.Group className="m-3">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              // class="input in"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Provide a valid email",
                },
              })}
            />
            {errors.email?.type === "required" && (
              <span className="text-danger">{errors.email.message}</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </Form.Group>
          <Form.Group className="m-3">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              class="text-danger"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 6,
                  message: "Your password must be 6 character or longer",
                },
              })}
            />
            {errors.password?.type === "required" && (
              <span className="text-danger">{errors.password.message}</span>
            )}
            {errors.password?.type === "minlength" && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </Form.Group>
          <input
            className="btn btn-dark w-full max-w-xs"
            type="submit"
            value="Sign Up"
          />
        </Form>
        <p className="m-5">
          <Link to="/login">
            <button className="btn btn-success text-white px-5">
              Login here
            </button>
          </Link>{" "}
        </p>
      </Card>
    </div>
  );
};

export default SignUp;
