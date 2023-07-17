import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../components/login/LoginForm/LoginForm";
import "./Login.css";
import { startSessionThunk } from "../../store/slices/authSlice";
import { Navigate, useLocation } from "react-router-dom";
const Login = () => {
  const isLogged = useSelector((store) => store.auth.isLogged);
  const dispatch = useDispatch();
  const location = useLocation();
  // useLocation me da información acerca de la ruta, en este caso queremos saber
  //si se le paso la ruta de procedencia por el "state"
  const from = location.state?.from;
  const handleLogin = async (loginData) => {
    dispatch(startSessionThunk(loginData));
  };
  return (
    <div className="main-container">
      <section className="main-section">
        <p>Welcome! Enter your email and password to continue</p>

        <section className="login-section">
          <h3>Test data</h3>
          <ul>
            <li>
              <em>Email</em>: nelson1995@gmail.com
            </li>
            <li>
              <em>Password</em>: nelson123456
            </li>
          </ul>
        </section>
        <LoginForm onLogin={handleLogin} />
      </section>
      {isLogged && <Navigate to={from ?? "/"} />}
    </div>
  );
};

export default Login;
