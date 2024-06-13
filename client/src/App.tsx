import { Route, Routes } from "react-router"
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import { ReactElement } from "react"
import Home from "./views/Home"
import Login from "./views/Login"
import PatientsList from "./views/patients/PatientsList"
import CreatePatient from "./views/patients/CreatePatient"
import AppSidebar from "./components/base/AppSidebar"
import AppointmentList from "./views/appointments/AppointmentList"
import EditPatient from "./views/patients/EditPatient"
import AppointmentCreate from "./views/appointments/AppointmentCreate"
import PatientAppointmentView from "./views/appointments/PatientAppointmentView"
import PaymentSuccess from "./views/PaymentSuccess"
import Dashboard from "./views/Dashboard"

const ProtectedRoute = ({children}: {children: ReactElement})=>{
  return(
    <RequireAuth fallbackPath={'/login'}>
      <AppSidebar>
        {children}
      </AppSidebar>
    </RequireAuth>
  )
}

export default function App() {
  return (
    <>
     <Routes>
      {/* ----Public Routes Ends Here---- */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/payment_success/:id" element={<PaymentSuccess />} />


      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      {/* Patients */}
      <Route path="/patients" element={<ProtectedRoute><PatientsList /></ProtectedRoute>} />
      <Route path="/patient/edit/:id" element={<ProtectedRoute><EditPatient /></ProtectedRoute>} />
      <Route path="/patient/new" element={<ProtectedRoute><CreatePatient /></ProtectedRoute>} />
      <Route path="/patient-appointment/view/:id" element={<ProtectedRoute><PatientAppointmentView /></ProtectedRoute>} />

      {/* Appointments */}
      <Route path="/appointments" element={<ProtectedRoute><AppointmentList /></ProtectedRoute>} />
      <Route path="/appointment/new" element={<ProtectedRoute><AppointmentCreate /></ProtectedRoute>} />

      <Route path="/users" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    </Routes>
    </>
  )
}