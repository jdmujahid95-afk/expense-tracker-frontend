import { useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/register", { name, email, password });
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Register</h3>
      <form onSubmit={submitHandler}>
        <input className="form-control mb-3" placeholder="Name" onChange={e => setName(e.target.value)} />
        <input className="form-control mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" className="form-control mb-3" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
};

export default Register;