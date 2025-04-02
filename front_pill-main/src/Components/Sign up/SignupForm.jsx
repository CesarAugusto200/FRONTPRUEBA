import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate

function SignupForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    año_nacimiento: "",
    direccion_Email: "",
    contraseña: "",
    telefono: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Inicializa useNavigate

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.direccion_Email || !formData.contraseña) {
      setErrorMessage("Por favor, complete todos los campos requeridos.");
      return;
    }
    
    console.log("Datos de registro:", formData);

    // Aquí puedes agregar la lógica de registro (por ejemplo, llamar a una API).
    // Suponiendo que el registro es exitoso, rediriges al login:
    navigate('/login'); // Redirige al login después del registro exitoso.
  };

  return (
    <div className="w-full md:w-1/2 bg-gray-100 rounded-2xl p-8">
      <h2 className="text-3xl font-semibold text-teal-600 mb-6">Crea tu cuenta</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            name="nombre"
            type="text"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <input
            name="telefono"
            type="number"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Número de teléfono"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <input
            name="año_nacimiento"
            type="date"
            placeholder="Fecha de nacimiento"
            value={formData.año_nacimiento}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <input
            name="direccion_Email"
            type="email"
            placeholder="Correo electrónico"
            value={formData.direccion_Email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="relative">
          <input
            name="contraseña"
            type={showPassword ? "text" : "password"}
            value={formData.contraseña}
            onChange={handleChange}
            placeholder="Contraseña"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-300"
        >
          Unirse ahora
        </button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-gray-600">¿Ya tienes una cuenta? </span>
        <Link to="/login" className="text-teal-600 hover:underline">
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
}

export default SignupForm;
