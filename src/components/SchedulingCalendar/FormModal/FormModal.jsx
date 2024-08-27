// FormModal.js
import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import patientData from '../../../staticData/patients.json'

function FormModal({ isOpen, onRequestClose, handleFormSubmit, selectInfo }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (response) => {
    const selectedPatient = patientData.find(x => x.mrn === response.patientId)
    const resObject = {
      typeOfAppointment: response.typeOfAppointment,
      patient: selectedPatient
    }

    handleFormSubmit({
      ...resObject,
      selectInfo
    });

    onRequestClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Form Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Form Modal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="typeOfAppointment">Type of Appointment</label>
            <select
              id="typeOfAppointment"
              {...register("typeOfAppointment", {
                required: "Type of Appointment is required",
              })}
            >
              <option value="">Select Appointment</option>
              <option value="follow-up">Follow up</option>
              <option value="new-consult">New Consult</option>
              <option value="pre-op">Pre op</option>
              <option value="annual-exam">Annual Exam</option>
              <option value="new-physical">New Physical</option>
            </select>
            {errors.typeOfAppointment && (
              <span className="error">{errors.typeOfAppointment.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="patientId">Select Patient</label>
            <select
              id="patientId"
              {...register("patientId", {
                required: "Patient is required",
              })}
            >
              <option value="">Select Patient</option>
              {patientData.map(data => (
                <option value={data.mrn}>{data.name}</option>
              ))}
            </select>
            {errors.patientId && (
              <span className="error">{errors.patientId.message}</span>
            )}
          </div>
        </div>


        <button type="submit" className="submit-btn">
          Save
        </button>
        <button type="button" onClick={onRequestClose} className="close-btn">
          Close
        </button>
      </form>
    </Modal>
  );
}

export default FormModal;
