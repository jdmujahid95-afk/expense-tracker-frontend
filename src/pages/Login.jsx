import { useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/login", { email, password });
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Login</h3>
      <form onSubmit={submitHandler}>
        <input className="form-control mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" className="form-control mb-3" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;