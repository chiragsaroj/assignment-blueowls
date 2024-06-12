import useInstance from "@/lib/instance"


export default function UseAppointments() {
  const {instance: api} = useInstance()

  const createAppointment = async (obj)=>{
    const res = await api.post('appointments', obj)
    return res.data
  }

  return {
    createAppointment
  }
}