import React from "react";
import { Logo, User } from "../assets/image";

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          <button className="btn btn-sm navbar-brand">
            <img src={Logo} alt="logo" width={100} height={50} />
          </button>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <button
              className="btn btn-sm nav-link text-dark p-0 ps-2 pe-2"
              aria-current="page"
            >
              <i className="bi bi-question-circle-fill" />
            </button>
            <button
              className="btn btn-sm nav-link  text-dark p-0 ps-2 pe-2"
              aria-current="page"
            >
              <i className="bi bi-bell" />
            </button>
            {/* Example single danger button */}
            <div className="btn-group">
              <button
                className="btn btn-sm nav-link active p-0 ps-2 pe-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-current="page"
              >
                <img
                  src={User}
                  width="30"
                  height="30"
                  className="d-inline-block align-top rounded-circle "
                  alt="BAYU BUANA_LOGO_HORIZONTAL_COLOR"
                />
              </button>

              <ul
                className="dropdown-menu dropdown-menu-lg-start"
                style={{
                  left: "-130px",
                }}
              >
                <li>
                  <div className="dropdown-item align-center" href="#">
                    <div className="hstack gap-3 navbar-brand m-0">
                      <div className="bg-light  m-0">
                        <img
                          src={User}
                          alt="user"
                          width={30}
                          height={30}
                          className="d-inline-block align-text-top rounded-circle"
                        />
                      </div>
                      <div className="  me-auto fs-sm">
                        {" "}
                        <b>Patrick Jane</b>
                        {/* <br /> */}
                        <p className="p-0 m-0">Administrator</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="btn btn-sm dropdown-item">
                    <div>
                      <i className="bi bi-person-fill d-inline-block align-text-top" />
                      {"    "}
                      My Profile
                    </div>
                  </button>
                </li>
                <li>
                  <button className="btn btn-sm dropdown-item">
                    <div>
                      <i className="bi bi-unlock-fill d-inline-block align-text-top" />
                      {"    "}
                      Change Password
                    </div>
                  </button>
                </li>
                <li>
                  <button className="btn btn-sm dropdown-item">
                    <div>
                      <i className="bi bi-box-arrow-right d-inline-block align-text-top" />
                      {"    "}
                      Sign Out
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
