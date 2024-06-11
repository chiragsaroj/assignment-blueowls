import { Route, Routes } from "react-router"
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import { ReactElement } from "react"
import Home from "./views/Home"
import Login from "./views/Login"

const ProtectedRoute = ({children}: {children: ReactElement})=>{
  return(
    <RequireAuth fallbackPath={'/login'}>
      {children}
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
      <Route path="/patients" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/payments" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    </Routes>
    </>
  )
}