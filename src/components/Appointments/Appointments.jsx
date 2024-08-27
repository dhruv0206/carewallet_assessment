import React, { useState } from 'react'
import { AppointmentsCard } from './AppointmentsCard'
import { useSelector } from 'react-redux';

export const Appointments = () => {
    const { appointments } = useSelector((state) => state);
    console.log("appointment ==>", appointments.appointmentList);
    const [openAppointmentId, setOpenAppointmentId] = useState(null);

    const handleCardClick = (id) => {
        setOpenAppointmentId((prevId) => (prevId === id ? null : id));
    };
    return (
        <div className='p-3'>

            <h2 className='flex justify-center font-bold text-2xl'>Scheduled Appointments</h2>
            {appointments.appointmentList.map((listItem, index) => (
                <AppointmentsCard
                    currentAppointment={listItem}
                    key={index}
                    isOpen={openAppointmentId === listItem.id}
                    onClick={() => handleCardClick(listItem.id)} />
            ))}
        </div>
    )
}
