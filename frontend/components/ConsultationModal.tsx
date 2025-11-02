import React, { useState } from 'react';
import { XIcon } from './Icons';

interface Doctor {
  name: string;
  specialty: string;
  imageUrl: string;
}

interface ConsultationModalProps {
  doctor: Doctor | null;
  onClose: () => void;
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
];

const ConsultationModal: React.FC<ConsultationModalProps> = ({ doctor, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [reason, setReason] = useState('');

  if (!doctor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientName && selectedDate && selectedTime) {
        setIsBooked(true);
    } else {
        alert("Please fill in all required fields.");
    }
  };

  const handleClose = () => {
    // Reset state for next time
    setIsBooked(false);
    setSelectedDate('');
    setSelectedTime('');
    setPatientName('');
    setReason('');
    onClose();
  }
  
  // Get today's date for the min attribute of the date input
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-lg transform transition-all scale-100 duration-300 ease-in-out" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white" id="modal-title">Book a Consultation</h3>
            <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <XIcon />
            </button>
          </div>

          <div className="mt-4 flex items-center space-x-4">
            <img src={doctor.imageUrl} alt={doctor.name} className="w-16 h-16 rounded-full object-cover border-2 border-teal-500" />
            <div>
              <h4 className="font-semibold text-lg text-slate-800 dark:text-slate-100">{doctor.name}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">{doctor.specialty}</p>
            </div>
          </div>
          
          {isBooked ? (
            <div className="mt-6 text-center py-8">
              <h4 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-2">Appointment Confirmed!</h4>
              <p className="text-slate-600 dark:text-slate-300">Your consultation with {doctor.name} has been booked for {selectedDate} at {selectedTime}.</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">You will receive a confirmation email shortly. (This is a demo).</p>
              <button onClick={handleClose} className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
                Close
              </button>
            </div>
          ) : (
             <form onSubmit={handleSubmit} className="mt-6 space-y-4">
               <div>
                  <label htmlFor="patientName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Your Name</label>
                  <input type="text" id="patientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-teal-500 focus:border-teal-500"/>
               </div>
               <div>
                  <label htmlFor="consultationDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Select Date</label>
                  <input type="date" id="consultationDate" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={today} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-teal-500 focus:border-teal-500"/>
               </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Select Time Slot</label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {timeSlots.map(time => (
                      <button key={time} type="button" onClick={() => setSelectedTime(time)} className={`px-3 py-2 text-sm rounded-md transition-colors ${selectedTime === time ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600'}`}>
                        {time}
                      </button>
                    ))}
                  </div>
                   {!selectedTime && <input type="hidden" required name="time-required" />}
                </div>
                 <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Reason for Consultation (Optional)</label>
                  <textarea id="reason" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-teal-500 focus:border-teal-500" placeholder="e.g. follow-up, new concern"></textarea>
               </div>
               <div className="pt-4 flex justify-end space-x-3">
                 <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500">
                   Cancel
                 </button>
                 <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                   Confirm Booking
                 </button>
               </div>
             </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;