import useInstance from "@/lib/instance"


export default function UsePatients() {
  const { instance: api } = useInstance()

  const createPatient = async (obj)=>{
    const res = await api.post('patient', obj)
    return res.data
  }

  const updatePatient = async({id, obj})=>{
    const res = await api.put(`patients/${id}`, obj)
    return res.data
  }

  const getPatient = async ({ queryKey })=>{
    const res = await api.get(`patients/${queryKey[1]}`)
    return res.data
  }

  const patientList = async ({ queryKey })=>{
    let searchName = queryKey[1] || null
    const url = searchName ? `patients?name=${searchName}` : "patients";
    const res = await api.get(url)
    return res.data
  }

  const deletePatient = async (id)=>{
    const res = await api.delete(`patients/${id}`)
    return res.data
  }

  return {
    patientList,
    updatePatient,
    createPatient,
    getPatient,
    deletePatient
  }
}