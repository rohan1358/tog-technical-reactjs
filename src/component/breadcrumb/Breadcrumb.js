import "./style.css";

import React from "react";
import { Link } from "react-router-dom";
export default function BreadcrumbComp({ data }) {
  return (
    <ul className="breadcrumb m-0 p-0">
      {data.map((nb) => {
        if (nb.active) {
          return (
            <li>
              {nb.link ? (
                <Link to={nb.link} className="text-decoration-none text-dark">
                  {nb.title}
                </Link>
              ) : (
                <Link to={"#"} className="text-decoration-none text-dark">
                  {nb.title}
                </Link>
              )}
            </li>
          );
        } else {
          return (
            <li
              style={{
                color: "#E85012",
              }}
            >
              {nb.title}
            </li>
          );
        }
      })}
    </ul>
  );
}
