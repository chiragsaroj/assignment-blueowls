import UsePatients from '@/services/UsePatients'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import PatientForm from './PatientForm'

function EditPatient() {
  const params = useParams()
  const { getPatient } = UsePatients()
  const { data, status } = useQuery({
    queryKey: ["patients", params?.id],
    queryFn: getPatient
  })

  if(status === "pending"){
    return <></>
  }

  return (
    <main className='p-10'>
      <PatientForm defaultValues={{...data, age: data?.age?.toString()}} edit={true} />
    </main>
  )
}

export default EditPatient