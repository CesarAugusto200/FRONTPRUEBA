import React, { useEffect, useState } from "react";

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({
    id_medicamento: "",
    nombre_medicamento: "",
    dosis: "",
    frecuencias: "",
    fecha_inicio: "",
    fecha_final: "",
    id_medicamento_rfid: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    const savedMedicines = JSON.parse(localStorage.getItem("medicines")) || [];
    setMedicines(savedMedicines);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    try {
      let updatedMedicines = [...medicines];

      if (isEditing) {
        // Actualizar el medicamento existente
        updatedMedicines = updatedMedicines.map((medicine) =>
          medicine.id_medicamento === form.id_medicamento ? form : medicine
        );
        alert("Medicamento actualizado exitosamente.");
      } else {
        // Agregar un nuevo medicamento
        const newMedicine = { ...form, id_medicamento: Date.now() }; // Usamos Date.now() para generar un ID único
        updatedMedicines.push(newMedicine);
        alert("Medicamento agregado exitosamente.");
      }

      // Guardar la lista de medicamentos en localStorage
      localStorage.setItem("medicines", JSON.stringify(updatedMedicines));

      // Actualizar el estado local
      setMedicines(updatedMedicines);
      setForm({
        id_medicamento: "",
        nombre_medicamento: "",
        dosis: "",
        frecuencias: "",
        fecha_inicio: "",
        fecha_final: "",
        id_medicamento_rfid: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar el medicamento:", error);
      alert("No se pudo guardar el medicamento. Revisa la consola para más detalles.");
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este medicamento?")) return;

    try {
      // Filtrar el medicamento a eliminar
      const updatedMedicines = medicines.filter((medicine) => medicine.id_medicamento !== id);

      // Guardar la lista actualizada en localStorage
      localStorage.setItem("medicines", JSON.stringify(updatedMedicines));

      // Actualizar el estado local
      setMedicines(updatedMedicines);
      alert("Medicamento eliminado exitosamente.");
    } catch (error) {
      console.error("Error al eliminar el medicamento:", error);
      alert("No se pudo eliminar el medicamento. Revisa la consola para más detalles.");
    }
  };

  const handleEdit = (medicine) => {
    setForm(medicine);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setForm({
      id_medicamento: "",
      nombre_medicamento: "",
      dosis: "",
      frecuencias: "",
      fecha_inicio: "",
      fecha_final: "",
      id_medicamento_rfid: "",
    });
  };

  return (
    <div>
      {/* Modal de Edición */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-4">Editar Medicamento</h3>
            <input
              type="text"
              name="nombre_medicamento"
              value={form.nombre_medicamento}
              onChange={handleChange}
              placeholder="Nombre del Medicamento"
              className="w-full px-4 py-2 rounded-md border mb-4"
            />
            <input
              type="text"
              name="dosis"
              value={form.dosis}
              onChange={handleChange}
              placeholder="Dosis"
              className="w-full px-4 py-2 rounded-md border mb-4"
            />
            <input
              type="text"
              name="frecuencias"
              value={form.frecuencias}
              onChange={handleChange}
              placeholder="Frecuencia"
              className="w-full px-4 py-2 rounded-md border mb-4"
            />
            <input
              type="date"
              name="fecha_inicio"
              value={form.fecha_inicio}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border mb-4"
            />
            <input
              type="date"
              name="fecha_final"
              value={form.fecha_final}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300"
              >
                Hacer Cambios
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabla de Medicamentos */}
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl w-full">
        <h3 className="text-lg font-semibold mb-4">Lista de Medicamentos</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">Nombre</th>
              <th className="border-b px-4 py-2">Dosis</th>
              <th className="border-b px-4 py-2">Frecuencia</th>
              <th className="border-b px-4 py-2">Inicio</th>
              <th className="border-b px-4 py-2">Fin</th>
              <th className="border-b px-4 py-2">Código RFID</th>
              <th className="border-b px-4 py-2">ID</th>
              <th className="border-b px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicines.length > 0 ? (
              medicines.map((medicine) => (
                <tr key={medicine.id_medicamento}>
                  <td className="border-b px-4 py-2">{medicine.nombre_medicamento}</td>
                  <td className="border-b px-4 py-2">{medicine.dosis}</td>
                  <td className="border-b px-4 py-2">{medicine.frecuencias}</td>
                  <td className="border-b px-4 py-2">{medicine.fecha_inicio.split("T")[0]}</td>
                  <td className="border-b px-4 py-2">{medicine.fecha_final.split("T")[0]}</td>
                  <td className="border-b px-4 py-2">{medicine.id_medicamento_rfid || "N/A"}</td>
                  <td className="border-b px-4 py-2">{medicine.id_medicamento}</td>
                  <td className="border-b px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(medicine)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(medicine.id_medicamento)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No hay medicamentos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Medicines;
