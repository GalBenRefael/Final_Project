import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { removeToken } from '../auth/TokenManager';
import { useContext } from 'react';
import { AppContext } from '../App';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '@mui/material';
import './Header.css';
import { baseUrl } from '../services/ApiService';

interface HeaderProps {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleTheme: () => void;
}

function Header({ search, handleSearch, toggleTheme }: HeaderProps) {
  const navigate = useNavigate();

  const context = useContext(AppContext);

  function handleLogoutClick() {
    removeToken();
    context.setUser(undefined);

    navigate('/login');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            <i className="bi bi-card-list me-2"></i>
            BCard
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  ABOUT
                </NavLink>
              </li>
              {context?.user && (
                <li className="nav-item">
                  <NavLink to="/favcards" className="nav-link">
                    FAV CARDS
                  </NavLink>
                </li>
              )}
              {context?.user?.isBiz && (
                <li className="nav-item">
                  <NavLink to="/mycards" className="nav-link">
                    MY CARDS
                  </NavLink>
                </li>
              )}
              {context?.user?.isAdmin && (
                <li className="nav-item">
                  <NavLink to="/sandbox" className="nav-link">
                    SANDBOX
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-4"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={handleSearch}
            />
          </form>

          <ul id="actions" className="navbar-nav">
            <IconButton onClick={toggleTheme}>
              <li className="bi bi-moon-fill"></li>
            </IconButton>

            {!context?.user && (
              <>
                <li className="nav-item me-3 mt-1">
                  <NavLink to="/register" className="nav-link">
                    REGISTER
                  </NavLink>
                </li>

                <li className="nav-item me-3 mt-1">
                  <NavLink to="/login" className="nav-link">
                    LOGIN
                  </NavLink>
                </li>
              </>
            )}

            {context?.user && (
              <div className="dropdown">
                <button
                  className="btn "
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {context?.user.imageUrl ? (
                    <img
                      src={baseUrl + context.user.imageUrl}
                      alt={context.user.imageAlt}
                      style={{
                        width: '45px',
                        height: '40px',
                        borderRadius: '50%',
                      }}
                    ></img>
                  ) : (
                    <Avatar src="/broken-image.jpg" />
                  )}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/profile/edit/${context.user._id}`}
                    >
                      Edit user
                    </Link>
                  </li>
                  <li>
                    <span className="dropdown-item" onClick={handleLogoutClick}>
                      Logout
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
