import { useQuery } from "@tanstack/react-query";
import AppointmentForm from "./AppointmentForm";
import UsePatients from "@/services/UsePatients";


export default function AppointmentCreate() {
  const { patientList } = UsePatients()
  const { data, status, isLoading, isFetching } = useQuery({
    queryKey: ["patients"],
    queryFn: patientList
  })

  return (
    <main className='p-10'>
      <AppointmentForm patient_list={data} />
    </main>
  )
}