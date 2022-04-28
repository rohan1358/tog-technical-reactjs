import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { CreateUpdate, Details, Home } from "../page";

export default function NewRoute() {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="create-update" element={<CreateUpdate />} />
          <Route path="details" element={<Details />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
