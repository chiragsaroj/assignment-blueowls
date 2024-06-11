import useInstance from "@/lib/instance"


export default function UsePatients() {
  const { instance: api } = useInstance()

  const createPatient = async (obj)=>{
    const res = await api.post('patient', obj)
    return res.data
  }

  const getPatient = async ({ queryKey })=>{
    const res = await api.get(`patients/${queryKey[1]}`)
    return res.data
  }

  const patientList = async ()=>{
    const res = await api.get('patients')
    return res.data
  }

  const deletePatient = async (id)=>{
    const res = await api.delete(`patients/${id}`)
    return res.data
  }

  return {
    patientList,
    createPatient,
    getPatient,
    deletePatient
  }
}