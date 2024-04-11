// Modal.js
import React, { useState } from "react";
import "./AppointMentModal.css";
import img from "./../../assets/maleProfile.avif";
import AppointmentModalForm from "./AppointmentModalForm";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../util/http";
import { updateAppointmentStatus } from "../../util/appointment";
function Modal({ onClose, obj }) {
  // console.log(obj);
  const {
    data: mutateData,
    mutate,
    isPending,
    isError: mutateError,
    error: mutateer,
  } = useMutation({
    mutationFn: updateAppointmentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patient"],
      });
    },
  });
  function hasUndefined(arr) {
    // if (arr[1] === undefined) return false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].value === "") return false;
    }
    if (arr[arr.length - 1] === undefined) return false;
    return true;
  }
  function handleSubmit(formObj) {
    const isUndefined = hasUndefined(formObj);
    if (!isUndefined) {
      alert("Please fill all the details");
    } else {
      console.log(obj._id);
      mutate({ id: obj[0]._id });
      setTimeout(() => {
        handleClose();
      }, 500);
    }
    console.log(formObj);
  }
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  return (
    <div
      className={`modal-overlay ${isOpen ? "open" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal">
        <button className="modal-close" onClick={handleClose}>
          ×
        </button>
        <div className="modal-content">
          <h2>Patient Details</h2>
          <div className="modal-container">
            <div className="modal-upper">
              <img src={img} className="modal-img" alt="" />
              <ul className="modal-patientProfile">
                <li>
                  <strong>Name:</strong> {obj[0].owner.name}
                </li>
                <li>
                  <strong>Gender:</strong> {obj[0].owner.gender}
                </li>
                <li>
                  <strong>ContactInfo:</strong>
                  {obj[0].contactInfo}
                </li>
                <li>
                  <strong>Email:</strong> {obj[0].email}
                </li>
              </ul>
            </div>
            <div className="modal-down">
              <AppointmentModalForm
                isPending={isPending}
                handleSubmitLast={handleSubmit}
                handleClose={handleClose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;