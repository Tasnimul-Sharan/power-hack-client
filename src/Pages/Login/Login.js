import React, { useEffect } from "react";
import Loading from "../Shared/Loading";
import { useForm } from "react-hook-form";
// import auth from "../../firebase.init";
// import {
//   useSignInWithEmailAndPassword,
//   useSignInWithGoogle,
// } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Loading from "../Shared/Loading";
// import google from "../../images/google.png";
// import useToken from "../../Hooks/useToken";
import { Form, Card } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

const Login = () => {
  //   const [signInWithEmailAndPassword, user, loading, error] =
  //     useSignInWithEmailAndPassword(auth);
  //   const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  //   const navigate = useNavigate();
  //   const [token] = useToken(user || gUser);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //   const location = useLocation();
  //   let from = location.state?.from?.pathname || "/";

  //   useEffect(() => {
  //     if (token) {
  //       navigate(from, { replace: true });
  //     }
  //   }, [token, from, navigate]);

  //   if (loading) {
  //     return <Loading />;
  //   }

  const onSubmit = (data) => {
    console.log(data);
    axios.post("http://localhost:5002/api/login", data).then((res) => {
      const { data } = res;
      console.log(data);
      if (data) {
        swal("Good job!", "You are login", "success");
        // setReload(!reload);
      }
      //   refetch();
    });
    // signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <Card className="  shadow-lg " style={{ width: "25rem" }}>
        <h1 className="text-3xl font-bold text-center">LOG IN</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full max-w-xs m-7">
            <input
              type="email"
              placeholder="Enter Email"
              class="input input-bordered w-full max-w-xs"
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
          </div>
          <div className="form-control w-full max-w-xs m-7">
            <input
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
          </div>

          <input
            className="btn btn-primary w-full max-w-xs"
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
        {/* <div class="divider">OR</div>
        <button className="btn btn-info m-5" onClick={() => signInWithGoogle()}>
          <img src={google} alt="" />
          <span className="m-5 text-white">Sign In With Google</span>
        </button> */}
      </Card>
    </div>
  );
};

export default Login;
