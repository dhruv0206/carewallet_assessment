import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export const AppointmentsCard = ({ currentAppointment, isOpen, onClick }) => {
    const [formattedDate, setFormattedDate] = useState("")
    const [aptStartTime, setAptStartTime] = useState("")
    const [aptEndTime, setAptEndTime] = useState("")

    useEffect(() => {
        if (currentAppointment) {
            const dateObject = new Date(currentAppointment.start);

            // Extract the date (e.g., "08/27/2024")
            const formattedDate = dateObject.toLocaleDateString();
            setFormattedDate(formattedDate)
            const formattedStartTime24 = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            setAptStartTime(formattedStartTime24)

            const dateEndObject = new Date(currentAppointment.end);
            const formattedEndTime24 = dateEndObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            setAptEndTime(formattedEndTime24)
        }
    }, [currentAppointment])




    return (
        <div className='m-4'>
            <div className=" border-2 border-black-100 items-center p-2 mt-2 rounded-md" >
                <div className='flex justify-between cursor-pointer ' onClick={onClick}>
                    {!isOpen &&
                        <div className='grid grid-cols-4 gap-6'>
                            <p><span className='font-medium'>Patient ID:</span> {currentAppointment?.extendedProps?.patientData?.mrn} </p>
                            <p><span className='font-medium'>Patient Name:</span> {currentAppointment?.extendedProps?.patientData?.name} </p>
                            <p><span className='font-medium'>Appointment Date:</span> {formattedDate} </p>
                            <p><span className='font-medium'>Appointment Time:</span> {aptStartTime} - {aptEndTime} </p>
                        </div>}
                    {isOpen &&
                        <img
                            src={currentAppointment?.extendedProps?.patientData?.photo}
                            alt='patient-image'
                            className='h-20'
                        />}
                    <div className='grid grid-cols-4 gap-3'>

                        {isOpen && <>
                            <div className=''>
                                <p><span className='font-medium'>Patient ID:</span> {currentAppointment?.extendedProps?.patientData?.mrn} </p>
                                <p><span className='font-medium'>Patient Name:</span> {currentAppointment?.extendedProps?.patientData?.name} </p>
                                <p><span className='font-medium'>Patient DOB:</span> {currentAppointment?.extendedProps?.patientData?.DOB} </p>
                                <p><span className='font-medium'>Patient Phone:</span> {currentAppointment?.extendedProps?.patientData?.phone} </p>
                            </div>
                            <div className=''>
                                <p><span className='font-medium'>Appointment Date:</span> {formattedDate} </p>
                                <p><span className='font-medium'>Appointment Time:</span> {aptStartTime} - {aptEndTime} </p>
                                <p><span className='font-medium'>Appointment Type:</span> {currentAppointment?.extendedProps?.typeOfAppointment} </p>
                            </div>
                            <div className=''>
                                <p><span className='font-medium'>Insurance Number:</span> {currentAppointment?.extendedProps?.patientData?.insurance?.id} </p>
                                <p><span className='font-medium'>Insurance Name:</span> {currentAppointment?.extendedProps?.patientData?.insurance?.name}  </p>
                                <p><span className='font-medium'>Insurance Group:</span> {currentAppointment?.extendedProps?.patientData?.insurance?.group} </p>
                            </div>
                        </>}

                    </div>
                    <button className=''>
                        {isOpen ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}
                    </button>
                </div>
                {/* {isOpen && <div>{currentAppointment?.extendedProps?.patientData?.name}</div>} */}
                {/* <div>{currentAppointment?.title}</div> */}

            </div>

        </div>

    )
}
