import { useId, useState } from "react";
import "./LoginForm.css";
useId;
const LoginForm = ({ onLogin }) => {
  const nameId = useId();
  const passwordId = useId();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    onLogin(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="emain-label">
        <label htmlFor={nameId}>Email</label>
      </div>
      <input
        type="email"
        value={formData.email}
        onChange={handleChange}
        id={nameId}
        required
        name="email"
        className="email-input"
      />
      <div>
        <label htmlFor={passwordId}>Password</label>
      </div>
      <div>
        <input
          type={isPasswordVisible ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          id={passwordId}
          required
          name="password"
          className="password-input"
        />
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <i className="bx bx-low-vision"></i>
        </button>
      </div>

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
