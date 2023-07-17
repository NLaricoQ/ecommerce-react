import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { reset } from "../../../store/slices/authSlice";
import "./Navbar.css";

const Navbar = ({ updateCartVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((store) => store.auth.isLogged);
  const userTo = isLogged ? "/profile" : "/login";
  const logout = () => {
    dispatch(reset());
    navigate("/login");
  };
  const getClass = ({ isActive }) => {
    if (isActive) return "header_nav_link header_nav_link-active";
    else return "header_nav_link ";
  };
  const handleCartClick = () => {
    if (isLogged) updateCartVisible();
    else navigate("/login");
  };
  return (
    <>
      <header className="header">
        <Link to="/">
          <h1 className="header-title">Ecommerce</h1>
        </Link>

        <nav>
          <ul className="header_nav_list">
            <li>
              <NavLink to={userTo} className={getClass}>
                <i className="bx bx-user"></i>
              </NavLink>
            </li>
            <li>
              <NavLink to="/purchases" className={getClass}>
                <i className="bx bxs-box"></i>
              </NavLink>
            </li>
            <li>
              <button className="header_nav_btn" onClick={handleCartClick}>
                <i className="bx bx-cart-alt"></i>
              </button>
            </li>

            {isLogged && (
              <li>
                <button className="header_nav_btn" onClick={logout}>
                  <i className="bx bx-log-out"></i>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
