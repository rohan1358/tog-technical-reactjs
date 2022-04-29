import React, { useEffect, useRef, useState } from "react";
import Pagination from "@mui/material/Pagination";
import {
  closeModal,
  download,
  focusElement,
  getAllData,
  setData,
} from "../../utils";
import Breadcrumb from "../../component/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import Header from "../../template/Header";
import ModalDelete from "../../template/ModalDelete";

import "./style.css";

import { useReactToPrint } from "react-to-print";
import Sidebar from "../../template/Sidebar";

let initialContentTable = [];
let defaultTake = 10;

function Home() {
  const componentRef = useRef();

  const navigation = useNavigate();

  const [ContentTable, setContentTable] = React.useState(initialContentTable);
  const [loading, setLoading] = React.useState(false);

  const [openAdvanced, setOpenAdvanced] = useState(false);
  const [statusAdvanced, setStatusAdvanced] = useState(false);

  const [checkAll, setCheckAll] = React.useState(false);

  const [successDelete, setSuccessDelete] = React.useState(false);

  const [status, setStatus] = React.useState(false);

  const [sort, setSort] = React.useState({
    field: "",
    dir: "",
  });
  const [page, setPage] = React.useState({
    skip: 0,
    take: 10,
  });
  const [keyword, setKeyword] = React.useState("");

  const positionSort = (name) => {
    if (sort.field === name) {
      return `sorting_${sort.dir}`;
    } else {
      return "";
    }
  };

  const handleSort = (param) => {
    const { field, dir } = sort;

    const helper = (field, dir) => {
      return {
        field,
        dir,
      };
    };

    if (field === param) {
      if (dir === "desc") {
        setSort(helper(param, "asc"));
      } else {
        setSort(helper(param, "desc"));
      }
    } else {
      setSort(helper(param, "desc"));
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const header = [
    {
      attr: {
        datatype: "number",
        className: "cursor-auto text-light",
        tabIndex: 0,
        "aria-controls": "fee_type",
        rowSpan: 1,
        colSpan: 1,
        // aria-sort:"ascending"
        "aria-label": "drag & drop: activate to sort column ascending",
        style: {
          width: "10px",
          backgroundColor: "#5E5E5E",
        },
      },
      content: <></>,
    },
    {
      attr: {
        onClick: () => handleCheckAll(),
        className: "cursor-pointer text-center text-light",
        tabIndex: 0,
        "aria-controls": "fee_type",
        rowSpan: 1,
        colSpan: 1,
        // aria-sort:"ascending"
        "aria-label": "checkbox: activate to sort column ascending",
        style: { width: "10px", backgroundColor: "#5E5E5E" },
      },
      content: (
        <>
          <input
            onChange={() => handleCheckAll()}
            id={`default-${"checkbox"}-heading`}
            className="form-check-input custom-form-check-input"
            checked={checkAll}
            type="checkbox"
            defaultValue
            color="#027F71"
          />
        </>
      ),
    },
    {
      attr: {
        className: `sorting ${positionSort("code")} text-light`,
        tabIndex: 0,
        "aria-controls": "fee_type",
        rowSpan: 1,
        colSpan: 1,
        "aria-label": "Fee Type Code: activate to sort column ascending",
        style: {
          minWidth: "110px",
          width: "120px",
          backgroundColor: "#5E5E5E",
        },
        onClick: () => {
          handleSort("code");
        },
      },
      content: <>Fee Type Code</>,
    },
    {
      attr: {
        className: `sorting ${positionSort("name")} text-light`,
        tabIndex: 0,
        "aria-controls": "fee_type",
        rowSpan: 1,
        colSpan: 1,
        "aria-label": "Fee Type Name: activate to sort column ascending",
        style: {
          minWidth: "120px",

          width: "125px",
          backgroundColor: "#5E5E5E",
        },
        onClick: () => {
          handleSort("name");
        },
      },
      content: <>Fee Type Name</>,
    },
    {
      attr: {
        className: `sorting ${positionSort("description")} text-light`,
        tabIndex: 0,
        "aria-controls": "fee_type",
        rowSpan: 1,
        colSpan: 1,
        "aria-label": "Description: activate to sort column ascending",
        style: {
          minWidth: "130px",

          width: "218.159px",
          backgroundColor: "#5E5E5E",
        },
        onClick: () => {
          handleSort("description");
        },
      },
      content: <>Description</>,
    },
    {
      attr: {
        className: `sorting ${positionSort("status")} text-light`,
        tabIndex: 0,
        "aria-controls": "fee_type",
        rowSpan: 1,
        colSpan: 1,
        "aria-label": "Status: activate to sort column ascending",
        style: { width: "85.5568px", backgroundColor: "#5E5E5E" },
        onClick: () => {
          handleSort("status");
        },
      },
      content: <>Status</>,
    },
    {
      attr: {
        className: "cursor-auto text-light",
        tabIndex: 0,
        "aria-controls": "fee_type",
        rowSpan: 1,
        colSpan: 1,
        "aria-label": "Actions: activate to sort column ascending",
        style: { width: "73.2841px", backgroundColor: "#5E5E5E" },
      },
      content: <>Actions</>,
    },
  ];

  const dragAndDrop = () => {
    var iCnt = 1;
    window.$("#fee_type tbody tr").each(function () {
      var id = "tr" + parseInt(iCnt);
      window.$(this).attr("id", id);
      iCnt++;
    });
    window.$("#fee_type").find("tr:even").addClass("even");
    window.$("#fee_type").find("tr:odd").addClass("odd");
    window.$("#fee_type").tableDnD({
      onDragClass: "myDragClass",
      onDrop: function (table, row) {
        window.$("#fee_type").find("tr").removeClass("even odd");
        window.$("#fee_type").find("tr:even").addClass("even");
        window.$("#fee_type").find("tr:odd").addClass("odd");
      },
    });
    // });
  };

  useEffect(() => {
    getAllData().then(async (res) => {
      await setContentTable(res);
      initialContentTable = res;
    });
    setTimeout(() => {
      dragAndDrop();
    }, 250);
  }, []);

  const handleCheck = (index, checkbox, data) => {
    const newIndex = initialContentTable.indexOf(data);
    setLoading({
      id: newIndex,
      load: true,
    });
    initialContentTable[newIndex].checkbox = !checkbox;
    if (!initialContentTable[newIndex].checkbox) {
      setCheckAll(false);
    }
    setTimeout(() => {
      setContentTable(initialContentTable);
      setLoading(false);
    }, 100);
  };
  const handleCheckAll = async () => {
    setCheckAll(!checkAll);
    await ContentTable.map((data, index) => {
      initialContentTable[index].checkbox = !checkAll;
      if (initialContentTable[index].checkbox) {
        initialContentTable[index].status = "Active";
      } else {
        initialContentTable[index].status = "Inactive";
      }
      return initialContentTable[index].checkbox;
    });
    setContentTable(initialContentTable);
  };

  const handleSearch = (param) => {
    if (param.length <= 256) {
      setKeyword(param);
      setPage({ skip: 0, take: page.take });
    }
  };

  const handlePage = (param) => {
    setPage({ skip: (param - 1) * page.take, take: page.take });
  };

  const actionIcon = [
    {
      className: "bi bi-pencil-square m-1 cursor-pointer fw-bold",
      handleClick: (data) =>
        navigation("create-update", { state: { data: data, type: "edit" } }),
      titleTooltip: "Click to edit",
    },
    {
      className: "bi bi-eye m-1 cursor-pointer fw-bold",
      handleClick: (data) => navigation("details", { state: { data: data } }),
      titleTooltip: "Click to view details",
    },
    {
      className: "bi bi-trash3 m-1 cursor-pointer fw-bold",
      handleClick: (data) => {
        window.$(`#${Math.round(data.id * 9999)}`).modal("show");
      },
      titleTooltip: "Click to delete",
    },
  ];

  const orderBy = () => {
    const text = (data) => {
      if (sort.field) {
        return data.sort(function (x, y) {
          let a = x[sort.field].toUpperCase(),
            b = y[sort.field].toUpperCase();
          if (sort.dir === "asc") {
            return a === b ? 0 : a > b ? 1 : -1;
          } else {
            return b === a ? 0 : b > a ? 1 : -1;
          }
        });
      } else {
        return data;
      }
    };

    const number = (data) => {
      if (sort.field) {
        return data.sort(function (a, b) {
          if (sort.dir === "asc") {
            return a[sort.field] - b[sort.field];
          } else {
            return b[sort.field] - a[sort.field];
          }
        });
      } else {
        return data;
      }
    };

    const results = sort.field ? number(text(ContentTable)) : ContentTable;
    return results;
  };

  const newDataContentTable = orderBy()
    .filter((data) => {
      if (keyword) {
        if (typeof data.name === "string") {
          return data.name.includes(keyword);
        } else {
          return data.name === keyword;
        }
      } else {
        return data;
      }
    })
    .filter((data) => {
      if (status) {
        return data.status === status;
      } else {
        return data;
      }
    });

  const checkDataIncludesChecked = () => {
    const find = newDataContentTable.filter((data) => data.checkbox);
    return find.length > 0;
  };

  const handleUpdateStatusOrDelete = async (status, type) => {
    const find = newDataContentTable.filter((data) => data.checkbox);
    if (type === "delete") {
      initialContentTable = newDataContentTable.filter(
        (data) => !data.checkbox
      );
    } else {
      await find.map(async (data) => {
        const index = await initialContentTable.findIndex(
          (cb) => cb.id === data.id
        );
        initialContentTable[index] = {
          ...data,
          status: status || "Active",
          checkbox: false,
        };
      });
    }

    setContentTable(initialContentTable);
    setData(initialContentTable).then((res) => {
      getAllData().then(async (res) => {
        await setContentTable(res);
        setCheckAll(false);
        initialContentTable = res;
      });
    });
  };

  const handleFilterByStatus = (status) => {
    window.$(".dropdown-toggle").dropdown("hide");
    setStatusAdvanced(false);
    setStatus(status);
    setPage({ take: 10, skip: 0 });
  };

  const breadcrumb = [
    {
      title: "Master Data Management",
      active: true,
    },
    {
      title: "Master Data Management",
      active: false,
    },
  ];

  return (
    <>
      <Sidebar />

      <div
        style={{
          marginLeft: "50px",
        }}
      >
        <Header />

        <div className="container">
          <Breadcrumb data={breadcrumb} />
          {/* heading */}
          <h3>Fee Type</h3>
          {/* table */}
          <div className={" m-2"}>
            <div id="fee_type_wrapper" className="dataTables_wrapper">
              <div className="row mb-0">
                <div className="dataTables_length col" id="fee_type_length">
                  <div className="row w-75">
                    <div className="input-group input-group-sm mb-3 col ">
                      <input
                        value={keyword}
                        onChange={(e) => handleSearch(e.target.value)}
                        type="text"
                        className="form-control border-end-0 "
                        placeholder="Search..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        id={"search"}
                      />
                      <span
                        onClick={() => focusElement("search")}
                        className="input-group-text bg-white border-start-0 cursor-pointer"
                        id="basic-addon2"
                      >
                        <i className="bi bi-search" />
                      </span>
                    </div>
                    <div className="col align-items-center">
                      <button
                        onClick={() => setOpenAdvanced(!openAdvanced)}
                        className="btn btn-sm btn-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFeeType"
                        aria-expanded="false"
                        aria-controls="collapseFeeType"
                      >
                        <b>
                          Advanced Options{" "}
                          <i
                            className={`${
                              openAdvanced
                                ? "bi bi-chevron-double-up"
                                : "bi bi-chevron-double-down"
                            }   text-black font-weight-bold`}
                          />
                        </b>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="dataTables_length col-md-auto"
                  id="fee_type_length"
                >
                  <button
                    onClick={() => download(ContentTable)}
                    type="button"
                    className="btn  btn-sm btn-secondary me-1 rounded-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Click to download"
                  >
                    <i className="bi bi-download" />
                  </button>
                  <button
                    id="print"
                    onClick={async () => {
                      defaultTake = page.take;
                      await setPage({ ...page, take: ContentTable.length });
                      handlePrint();
                      setTimeout(() => {
                        setPage({ ...page, take: defaultTake });
                      }, 250);
                    }}
                    type="button"
                    className="btn btn-sm btn-secondary me-1 rounded-circle"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Click to print"
                  >
                    <i className="bi bi-printer" />
                  </button>
                  <button
                    onClick={() => navigation("create-update")}
                    type="button"
                    className="btn  me-1 btn-sm fw-bold"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Click to create"
                    style={{
                      backgroundColor: "#F3C244",
                    }}
                  >
                    <i className="bi bi-file-earmark-plus" /> Create New
                  </button>
                </div>
              </div>
              <div className="collapse " id="collapseFeeType">
                <div className="card card-body bg-light">
                  <div className="dropdown " id="dd-status">
                    <b>Status</b>
                    <br />
                    <button
                      onClick={() => setStatusAdvanced(!statusAdvanced)}
                      className="btn btn-sm btn-white border dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      // data-toggle="dropdown"
                      data-bs-auto-close="false"
                      aria-expanded="false"
                      style={{
                        backgroundColor: "white",
                      }}
                    >
                      {status || "select status"}{" "}
                      <i
                        className={`${
                          statusAdvanced
                            ? "bi bi-chevron-up"
                            : "bi bi-chevron-down"
                        } `}
                      />
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <button
                          onClick={() => handleFilterByStatus("Active")}
                          className="dropdown-item"
                        >
                          Active
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleFilterByStatus("Inactive")}
                          className="dropdown-item"
                        >
                          Inctive
                        </button>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleFilterByStatus(false)}
                    className="btn btn-sm btn-secondary position-absolute end-0 rounded rounded-circle m-1"
                  >
                    <i className="bi bi-arrow-repeat" />
                  </button>
                </div>
              </div>
              <br />
              {checkDataIncludesChecked() && (
                <div className="mb-1">
                  <button
                    className="btn text-light btn-sm dropdown-toggle me-2 custom-btn-success"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Update Status
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <button
                        onClick={() => {
                          handleUpdateStatusOrDelete();
                        }}
                        className="dropdown-item"
                      >
                        Active
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleUpdateStatusOrDelete("Inactive");
                        }}
                        className="dropdown-item"
                      >
                        Inactive
                      </button>
                    </li>
                  </ul>

                  <button
                    onClick={() => {
                      handleUpdateStatusOrDelete(false, "delete");
                    }}
                    type="button"
                    className="btn text-light btn-sm ms-2 custom-btn-success"
                  >
                    Remove Fee Type
                  </button>
                </div>
              )}

              <div>
                <table
                  ref={componentRef}
                  id="fee_type"
                  className="display dataTable border rounded border-1"
                  style={{ width: "100%" }}
                  aria-describedby="fee_type_info"
                >
                  <thead>
                    <tr>
                      {header.map((hdr, index) => {
                        return (
                          <th {...hdr.attr} key={index}>
                            {hdr.content}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {newDataContentTable.length > 0 ? (
                      newDataContentTable
                        .slice(page.skip, page.take + page.skip)
                        .map((data, index) => {
                          const { code, name, description, status, checkbox } =
                            data;
                          return (
                            <tr key={index} className="odd">
                              <td className="sorting_1 text-center">
                                <i className="bi bi-grip-vertical" />
                              </td>
                              <td
                                className="cursor-pointer text-center"
                                onClick={() => {
                                  handleCheck(index, checkbox, data);
                                }}
                                id={code}
                              >
                                {loading.id !== index ? (
                                  <>
                                    <input
                                      onChange={() => {
                                        handleCheck(index, checkbox, data);
                                      }}
                                      className="form-check-input custom-form-check-input"
                                      type="checkbox"
                                      checked={checkbox}
                                      id={`default-${"checkbox"}`}
                                    />
                                  </>
                                ) : (
                                  <></>
                                )}
                              </td>
                              <td className="cursor-auto">{code}</td>
                              <td className="cursor-auto">{name}</td>
                              <td className="cursor-auto">{description}</td>
                              <td className="cursor-auto">{status}</td>
                              <td className="cursor-auto">
                                <ModalDelete
                                  data={data}
                                  yes={(idModal) => {
                                    closeModal(idModal);
                                    let { id } = data;
                                    initialContentTable =
                                      initialContentTable.filter(
                                        (data) => data.id !== id
                                      );
                                    setData(initialContentTable).then((res) => {
                                      setContentTable(initialContentTable);
                                    });
                                    setSuccessDelete(
                                      `Record Fee Type Name: ${data.name} was successfully deleted.`
                                    );

                                    setTimeout(() => {
                                      setSuccessDelete(false);
                                    }, 2000);
                                  }}
                                  no={(id) => {
                                    closeModal(id);
                                  }}
                                />

                                {actionIcon.map((action, indexAction) => {
                                  return (
                                    <label
                                      key={indexAction}
                                      className="text-primary fw-bold"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title={action.titleTooltip}
                                      onClick={() => {
                                        if (action.handleClick) {
                                          action.handleClick({
                                            ...data,
                                            index,
                                          });
                                        }
                                      }}
                                    >
                                      <i className={action.className} />
                                    </label>
                                  );
                                })}
                              </td>
                            </tr>
                          );
                        })
                    ) : (
                      <tr>
                        <td colSpan={header.length} className="text-center">
                          Empty
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {successDelete && (
                <div
                  className="alert alert-success position-absolute top-50 start-50 translate-middle"
                  role="alert"
                >
                  {successDelete}
                </div>
              )}

              <div className="row m-1 align-items-center">
                <div
                  className="dataTables_length col-md-auto  align-items-center p-0 pe-1 ps-1"
                  id="fee_type_length"
                >
                  <label>
                    <select
                      onChange={(e) =>
                        setPage({ skip: 0, take: parseInt(e.target.value) })
                      }
                      name="fee_type_length"
                      aria-controls="fee_type"
                      className
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>{" "}
                  </label>
                </div>
                <div
                  className="dataTables_info  col align-items-center p-0 pe-1 ps-1"
                  id="fee_type_info"
                  role="status"
                  aria-live="polite"
                >
                  Showing {page.take + page.skip - (page.take - 1)} to{" "}
                  {page.take + page.skip > newDataContentTable.length
                    ? newDataContentTable.length
                    : page.take + page.skip}{" "}
                  of {newDataContentTable.length}
                </div>
                Page :{" "}
                <div
                  className="dataTables_paginate paging_simple_numbers col-md-auto align-items-center p-0 pe-1 ps-1"
                  id="fee_type_paginate"
                >
                  <Pagination
                    onChange={(e, page) => handlePage(page)}
                    count={Math.ceil(newDataContentTable.length / page.take)}
                    variant="outlined"
                    shape="rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
}

export default Home;
