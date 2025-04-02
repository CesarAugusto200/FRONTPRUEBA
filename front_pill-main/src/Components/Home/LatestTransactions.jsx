import React from 'react';

function MedicationSchedule() {
  const schedule = [
    { time: '08:00 AM', medication: 'Paracetamol', dose: '2 píldoras / 5mg', status: 'Tomado' },
    { time: '12:00 PM', medication: 'Ibuprofeno', dose: '1 píldora / 10mg', status: 'Pendiente' },
    { time: '06:00 PM', medication: 'Amoxicilina', dose: '1 cápsula / 500mg', status: 'Tomado' },
    { time: '09:00 PM', medication: 'Vitamina C', dose: '1 píldora / 100mg', status: 'Pendiente' },
  ];

  const statusColors = {
    Tomado: 'text-green-500',
    Pendiente: 'text-yellow-500',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-700">Horario de Medicación</h3>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="text-left text-gray-600">Hora</th>
            <th className="text-left text-gray-600">Medicamento</th>
            <th className="text-left text-gray-600">Dosis</th>
            <th className="text-left text-gray-600">Estado</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="py-2">{item.time}</td>
              <td>{item.medication}</td>
              <td>{item.dose}</td>
              <td className={`${statusColors[item.status]} font-semibold`}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicationSchedule;
