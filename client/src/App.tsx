import { Route, Routes } from "react-router"
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import { ReactElement } from "react"
import Home from "./views/Home"
import Login from "./views/Login"
import PatientsList from "./views/patients/PatientsList"
import CreatePatient from "./views/patients/CreatePatient"
import AppSidebar from "./components/base/AppSidebar"
import AppointmentList from "./views/appointments/AppointmentList"

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
      {/* ----Protected Routes---- */}
      {/* <Route path="/configurations" element={<ProtectedRoute><ConfigurationList /></ProtectedRoute>} />
      <Route path="/configuration/new" element={<ProtectedRoute><Test /></ProtectedRoute>} />
      <Route path="/configuration/edit/:id" element={<ProtectedRoute><TestEdit /></ProtectedRoute>} />
      <Route path="/configuration/view/:id" element={<ProtectedRoute><ViewConfiguration /></ProtectedRoute>} /> */}
      {/* ----Protected Routes Ends Here---- */}
      {/* ----Public Routes---- */}
      {/* <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/walkthrough" element={<Walkthrough />} /> */}
      {/* ----Public Routes Ends Here---- */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      {/* Patients */}
      <Route path="/patients" element={<ProtectedRoute><PatientsList /></ProtectedRoute>} />
      <Route path="/patient/new" element={<ProtectedRoute><CreatePatient /></ProtectedRoute>} />

      {/* Appointments */}
      <Route path="/appointments" element={<ProtectedRoute><AppointmentList /></ProtectedRoute>} />
      <Route path="/appointment/new" element={<ProtectedRoute><AppointmentList /></ProtectedRoute>} />

      <Route path="/users" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    </Routes>
    </>
  )
}