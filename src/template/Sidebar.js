import React, { useState } from "react";

function Sidebar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const sideMenu = [
    "Standard Mark-Up",
    "Standard Service Fee",
    "Fee Type",
    "Frequent Traveler Program",
    "Standard Ancillary Fee",
    "Rating Type",
    "Setup Flight Commision",
    "Special Dates",
    "Corporate Rating",
  ];
  return (
    <>
      <div
        onMouseEnter={() => {
          setOpenDrawer(true);
        }}
        onMouseLeave={() => {
          setOpenDrawer(false);
        }}
        id="mySidenav"
        className="sidenav"
      >
        {openDrawer ? (
          <>
            <ul className="nav flex-column">
              <li className="nav-item">
                <button className="btn nav-link " aria-current="page">
                  <i className="bi bi-house-door text-white position-absolute" />{" "}
                  <label className="ms-5">Dashboard</label>
                </button>
              </li>
              <li className="nav-item  ">
                <button className="btn nav-link bg-warning ">
                  <i className="bi bi-briefcase-fill text-white position-absolute" />{" "}
                  <label className="ms-5">Master Data Management</label>
                </button>
              </li>
              {sideMenu.map((data, index) => {
                return (
                  <>
                    <li key={index} className="nav-item">
                      {data === "Fee Type" ? (
                        <button className="btn nav-link ms-5 text-warning">
                          {data}
                        </button>
                      ) : (
                        <button className="btn nav-link ms-5">{data}</button>
                      )}
                    </li>
                  </>
                );
              })}
            </ul>
          </>
        ) : (
          <ul className="nav flex-column">
            <li className="nav-item">
              <button className="btn nav-link " aria-current="page">
                <i className="bi bi-house-door text-white " />{" "}
              </button>
            </li>
            <li className="nav-item  ">
              <button className="btn nav-link bg-warning ">
                <i className="bi bi-briefcase-fill text-white " />
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default Sidebar;
