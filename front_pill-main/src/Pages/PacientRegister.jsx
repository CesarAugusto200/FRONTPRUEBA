import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Modal, Box, Typography, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PatientInform from '../Components/Register/PatientInform';
import ClinicalData from '../Components/Register/ClinicalData';

function PacientRegister() {
  const [activeStep, setActiveStep] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const idUsuario = localStorage.getItem("login_id");

  const [patient, setPatient] = useState({
    id: idUsuario,
    fullName: '',
    gender: '',
    age: '',
    address: '',
    phone: '',
  });

  const [clinicalData, setClinicalData] = useState({
    preexistingConditions: '',
    allergies: '',
    bloodType: '',
    weight: '',
    medicalCondition: '',
    recentDiagnoses: '',
  });

  const steps = ['Datos del Paciente', 'Datos Clínicos', 'Confirmar Datos'];

  // Bloquear números en campos que solo deben aceptar letras
  const handleKeyPress = (e) => {
    const regex = /^[A-Za-z\s]+$/; // Solo letras y espacios
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  // Bloquear números en el campo de alergias
  const handleKeyPressAllergies = (e) => {
    const regex = /^[A-Za-z\s]+$/; // Solo letras y espacios para alergias
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  // Validaciones generales
  const validateFields = () => {
    const { fullName, gender, address } = patient;
    const { preexistingConditions, allergies, bloodType, weight, medicalCondition, recentDiagnoses } = clinicalData;

    // Validar Grupo Sanguíneo
    const bloodTypeRegex = /^(A|B|AB|O)[+-]$/;
    if (bloodType && !bloodTypeRegex.test(bloodType)) {
      setErrorMessage('Grupo sanguíneo debe ser válido (Ej. A+, O-, B+).');
      return false;
    }

    // Validar Peso (30 a 300 kg)
    const weightRegex = /^(?:[3-9][0-9]|[1-2][0-9]{2}|300)$/; // Solo entre 30 y 300
    if (weight && !weightRegex.test(weight)) {
      setErrorMessage('Peso debe ser un número válido entre 30 y 300 kg. Ejemplo: 70');
      return false;
    }

    // Validar Diagnósticos Recientes (solo números)
    const numberRegex = /^[0-9]+$/;
    if (recentDiagnoses && !numberRegex.test(recentDiagnoses)) {
      setErrorMessage('Diagnósticos recientes deben contener solo números.');
      return false;
    }

    // Validar Edad (de 0 a 120 años)
    const ageRegex = /^(?:1[01][0-9]|120|[1-9]?[0-9])$/; // Solo entre 0 y 120
    if (patient.age && !ageRegex.test(patient.age)) {
      setErrorMessage('Edad debe ser un número válido entre 0 y 120.');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateFields()) return;

    setErrorMessage('');
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    if (!validateFields()) return;

    setErrorMessage('');

    // Datos del paciente
    const patientData = {
      id_usuario: idUsuario,
      nombre_completo: patient.fullName,
      genero: patient.gender,
      edad: patient.age,
      direccion: patient.address,
      telefono: patient.phone,
      condicion: clinicalData.medicalCondition,
      enfermedades_pers: clinicalData.preexistingConditions,
      alergias: clinicalData.allergies,
      grupo_sanguineo: clinicalData.bloodType,
      peso: clinicalData.weight,
      diagnostico_reciente: clinicalData.recentDiagnoses,
    };

    // Guardar datos del paciente localmente en el localStorage
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    patients.push(patientData);
    localStorage.setItem('patients', JSON.stringify(patients));

    // Mostrar modal de éxito
    setModalOpen(true);
    setTimeout(() => {
      setModalOpen(false);
      navigate('/home'); // Redirigir después de 2 segundos
    }, 2000);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate('/home'); // Redirigir al cerrar el modal
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h2 className="text-2xl font-semibold text-teal-600 mb-6">Registro del Paciente</h2>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full mt-6">
        {activeStep === 0 && (
          <div>
            <TextField
              label="Nombre Completo"
              fullWidth
              value={patient.fullName}
              onChange={(e) => setPatient({ ...patient, fullName: e.target.value })}
              onKeyPress={handleKeyPress}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Género</InputLabel>
              <Select
                value={patient.gender}
                onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
                label="Género"
              >
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Femenino">Femenino</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Edad"
              fullWidth
              value={patient.age}
              onChange={(e) => setPatient({ ...patient, age: e.target.value })}
              type="number"
              inputProps={{ min: 0, max: 120 }}
              margin="normal"
            />
            <TextField
              label="Dirección"
              fullWidth
              value={patient.address}
              onChange={(e) => setPatient({ ...patient, address: e.target.value })}
              onKeyPress={handleKeyPress}
              margin="normal"
            />
          </div>
        )}
        {activeStep === 1 && (
          <ClinicalData 
            clinicalData={clinicalData} 
            setClinicalData={setClinicalData} 
          />
        )}

        {errorMessage && (
          <div className="text-red-600 mt-4">{errorMessage}</div>
        )}

        <div className="flex justify-between mt-6">
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Atrás
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Finalizar Registro
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Siguiente
            </Button>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            border: '2px solid #00747C',
            borderRadius: '16px',
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" component="h2" sx={{ color: '#00747C', mb: 2 }}>
            ¡Registro Exitoso!
          </Typography>
          <Typography sx={{ mb: 2 }}>
            El paciente ha sido registrado correctamente.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default PacientRegister;
