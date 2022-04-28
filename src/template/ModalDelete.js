import React from "react";

function ModalDelete({ data, yes, no }) {
  let id = Math.round(data.id * 9999);
  return (
    <>
      <>
        <div
          className="modal fade"
          id={`${id}`}
          tabIndex={-1}
          aria-labelledby={`${id}Label`}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`${id}Label`}>
                  Modal title
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                Are you sure you want to delete Fee Type Name: {data.name}?
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => no && no(id)}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  onClick={() => yes && yes(id)}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default ModalDelete;
