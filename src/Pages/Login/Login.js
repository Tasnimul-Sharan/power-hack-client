import React, { useEffect } from "react";
import Loading from "../Shared/Loading";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Card } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const location = useLocation();
  let from = location.state?.from?.pathName || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  if (loading) {
    return <Loading />;
  }

  const onSubmit = (data) => {
    console.log(data);
    signInWithEmailAndPassword(data.email, data.password);
    axios.post("http://localhost:5002/api/login", data).then((res) => {
      const { data } = res;
      console.log(data);
      if (data) {
        swal("Good job!", "You are login", "success");
        // setReload(!reload);
      }
      //   refetch();
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <Card className="  shadow-lg " style={{ width: "25rem" }}>
        <h1 className="text-3xl font-bold text-center">LOG IN</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className=" m-3">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              // class="m-3"
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
              <span className="text-red-500">{errors.email.message}</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </Form.Group>
          <Form.Group className=" m-3">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              class="input input-bordered w-full max-w-xs"
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
              <span className="text-red-500">{errors.password.message}</span>
            )}
            {errors.password?.type === "minlength" && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </Form.Group>

          <input
            className="btn btn-dark w-full max-w-xs"
            type="submit"
            value="LOG IN"
          />
        </Form>
        <p className="m-5">
          <Link to="/signup">
            <button className="btn btn-success px-5 text-white">
              Create a new Account
            </button>
          </Link>{" "}
        </p>
      </Card>
    </div>
  );
};

export default Login;
