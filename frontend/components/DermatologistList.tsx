import React, { useState } from 'react';
import ConsultationModal from './ConsultationModal';

const dermatologists = [
  {
    name: 'Dr. Emily Carter',
    specialty: 'General & Pediatric Dermatology',
    experience: '12 years',
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.F9WTZDAHd4RG4-IMI1_j7AHaHe?pid=Api&P=0&h=180',
  },
  {
    name: 'Dr. Ben Hanson',
    specialty: 'Cosmetic Dermatology & Laser Surgery',
    experience: '15 years',
    imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.-1YYPFeOAsQZkVxVXa6RagHaJQ?pid=Api&P=0&h=180',
  },
  {
    name: 'Dr. Olivia Chen',
    specialty: 'Mohs Surgery & Skin Cancer',
    experience: '10 years',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dr. Isaac Rodriguez',
    specialty: 'Dermatopathology',
    experience: '18 years',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.9LA2Zm3Ug3PkTtVFF2zxoAHaHa?pid=Api&P=0&h=180',
  },
  {
    name: 'Dr. Sophia Patel',
    specialty: 'Immunodermatology',
    experience: '9 years',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dr. James Miller',
    specialty: 'Acne and Rosacea Specialist',
    experience: '7 years',
    imageUrl: 'https://images.unsplash.com/photo-1618498082410-b4aa22193b38?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dr. Chloe Davis',
    specialty: 'Hair and Nail Disorders',
    experience: '11 years',
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dr. Liam Wilson',
    specialty: 'Eczema and Psoriasis Care',
    experience: '14 years',
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.fg6iVrCx1396kU49tWtTSQAAAA?pid=Api&P=0&h=180',
  },
  {
    name: 'Dr. Ava Martinez',
    specialty: 'Anti-Aging and Rejuvenation',
    experience: '20 years',
    imageUrl: 'https://images.unsplash.com/photo-1579165466949-3180a3d056d5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dr. Noah Taylor',
    specialty: 'Skin Allergy Testing',
    experience: '8 years',
    imageUrl: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dr. Isabella Garcia',
    specialty: 'Pigmentary Disorders',
    experience: '13 years',
    imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.Xt4ePKZ67vfj-5aehB-PZgHaIP?pid=Api&P=0&h=180',
  },
];

interface Doctor {
  name: string;
  specialty: string;
  experience: string;
  imageUrl: string;
}

const DermatologistList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleConsultClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <>
      <div className="mt-8">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 text-center">Recommended Dermatologists</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dermatologists.map((doc, index) => (
            <div key={index} className="bg-slate-50 dark:bg-slate-700 rounded-lg shadow-md p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105">
              <img src={doc.imageUrl} alt={doc.name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-teal-400" />
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">{doc.name}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">{doc.specialty}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{doc.experience} of experience</p>
              <button
                onClick={() => handleConsultClick(doc)}
                className="w-full mt-auto px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
              >
                Consult Now
              </button>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && <ConsultationModal doctor={selectedDoctor} onClose={handleCloseModal} />}
    </>
  );
};

export default DermatologistList;