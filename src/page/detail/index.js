import React, { useEffect, useState } from "react";
import Breadcrumb from "../../component/breadcrumb/Breadcrumb";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../template/Header";
import Sidebar from "../../template/Sidebar";

function Details() {
  const navigation = useNavigate();
  const location = useLocation();

  const [load, setLoad] = useState(true);
  const [defaultValue, setDefaultValue] = useState({
    name: "",
    code: "",
    description: "",
    nameTab1: "",
    nameTab2: "",
    descriptionTab1: "",
  });

  const breadcrumb = [
    {
      title: "Master Data Management",
      active: true,
    },
    {
      title: "Fee Type",
      active: true,
      link: "/",
    },
    {
      title: "Fee Type Details",
      active: false,
    },
  ];

  const formik = useFormik({
    initialValues: defaultValue,
  });

  useEffect(() => {
    setDefaultValue(location.state.data);
    formik.setValues(location.state.data);
    setLoad(false);
  }, [location.state]);

  return (
    <>
      {/* navbar */}
      <Sidebar />
      <div
        style={{
          marginLeft: "50px",
        }}
      >
        <Header />

        <br />
        <div className="container">
          <Breadcrumb data={breadcrumb} />
          {/* heading */}
          <h3>Fee Type Details</h3>
        </div>

        {/* table */}
        {!load && (
          <form onSubmit={formik.handleSubmit} className="m-0 p-0">
            <div className={" container shadow p-3 mb-2 bg-body rounded"}>
              <div className="row mb-5">
                <div className="col ">
                  <div className=" row">
                    <div className="col">Fee Type Name</div>
                    <div className="col">
                      <input
                        className="form-control "
                        type="text"
                        aria-label="field name"
                        name="name"
                        id="name"
                        value={formik.values.name}
                      />
                      {formik.touched.name &&
                        (formik.errors.name ? (
                          <div className="text-danger">
                            {formik.errors.name}
                          </div>
                        ) : (
                          <div className="text-success">
                            Fee Type Name already exists
                          </div>
                        ))}
                    </div>
                  </div>
                  <br />
                  <div className="col ">
                    <div className="row ">
                      <div className="col">Description</div>
                      <div className="col">
                        <textarea
                          value={formik.values.description}
                          className="form-control"
                          rows={3}
                          id="description"
                          name="description"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="vstack border rounded gap-3 bg-light ">
                    <div className="  m-3 ">
                      <h3>For Interface Purpose</h3>
                      <div className="row">
                        <div className="col">
                          <label>
                            Fee Type Code
                            <i className="bi bi-info-circle mt-0" />
                          </label>
                        </div>
                        <div className="col">
                          <input
                            className="form-control "
                            type="text"
                            aria-label="field code"
                            id="code"
                            name="code"
                            value={formik.values.code}
                          />
                          {formik.touched.code &&
                            (formik.errors.code ? (
                              <div className="text-danger">
                                {formik.errors.code}
                              </div>
                            ) : (
                              <div className="text-success">
                                Fee Type Code already exists
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h5>Traslation</h5>
              <hr />
              <div className="row p-0 border rounded border-secondary m-0">
                <div className="col-4 m-0 p-0 bg-secondary">
                  <ul className="nav flex-column  m-0 p-0">
                    <li className="nav-item ">
                      <div className="nav-link text-dark fw-bold cursor-pointer active border border-end-0    bg-body rounded-0 ">
                        Indonesia{" "}
                        {formik.touched.nameTab1 && formik.errors.nameTab1 && (
                          <>
                            <i className="bi bi-exclamation-triangle-fill text-danger" />
                          </>
                        )}
                      </div>
                    </li>
                    <li className="nav-item mt-2">
                      <div
                        className="nav-link text-dark fw-bold cursor-pointer active border border-end-0      "
                        style={{
                          backgroundColor: "#ECECEC",
                        }}
                      >
                        Chinese Simplified{" "}
                        <i className="bi bi-exclamation-triangle-fill text-danger" />
                      </div>
                    </li>
                    <br />
                    <label className="fst-italic text-white">
                      Note:{" "}
                      <i className="bi bi-exclamation-triangle-fill text-danger" />{" "}
                      Incomplete data
                    </label>
                  </ul>
                </div>
                <div className="col m-0 p-0  p-3  bg-body rounded ">
                  <div className=" row">
                    <div className="col-4">Fee Type Name</div>
                    <div className="col-5">
                      <input
                        className="form-control "
                        type="text"
                        aria-label="field name"
                        name="nameTab1"
                        id="nameTab1"
                        value={formik.values.nameTab1}
                      />
                      {formik.touched.nameTab1 &&
                        (formik.errors.nameTab1 ? (
                          <div className="text-danger">
                            {formik.errors.nameTab1}
                          </div>
                        ) : (
                          <div className="text-success">
                            Fee Type Name already exists
                          </div>
                        ))}
                    </div>
                  </div>
                  <br />
                  <div className="col ">
                    <div className="row ">
                      <div className="col-4">Description</div>
                      <div className="col-6">
                        <textarea
                          value={formik.values.descriptionTab1}
                          className="form-control"
                          rows={3}
                          defaultValue={""}
                          id="descriptionTab1"
                          name="descriptionTab1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container mt-0 pt-0">
              <div>
                <button
                  onClick={() => {
                    navigation("/");
                  }}
                  type="button"
                  className="btn  btn-sm m-1 border border-secondary"
                >
                  Back
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      <br />
      <br />
    </>
  );
}

export default Details;
