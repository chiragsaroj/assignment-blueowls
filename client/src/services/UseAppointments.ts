import useInstance from "@/lib/instance"


export default function UseAppointments() {
  const {instance: api} = useInstance()

  const createAppointment = async (obj)=>{
    const res = await api.post('appointments', obj)
    return res.data
  }

  const getAppointments = async ()=>{
    const res = await api.get('appointments')
    return res.data
  }

  return {
    createAppointment,
    getAppointments
  }
}