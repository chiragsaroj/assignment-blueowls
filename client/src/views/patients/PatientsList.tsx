import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import UsePatients from '@/services/UsePatients'
import { Loader } from '@mantine/core'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDebounceCallback } from 'usehooks-ts'

function PatientsList() {
    const [searchName, setSearchName] = useState('')
    const queryClient = useQueryClient()
    const { patientList, deletePatient } = UsePatients()
    const { data, status, isLoading, isFetching } = useQuery({
        queryKey: ["patients", searchName],
        queryFn: patientList
    })

    const deletePatientMutation = useMutation({
        mutationFn: deletePatient,
        onSuccess: ()=>{
          queryClient.invalidateQueries({queryKey: ["patients"]})
        }
    })

    const debounced = useDebounceCallback(setSearchName, 500)

  return (
    <main className='relative min-h-screen'>
      {isLoading && <Loader className='absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ' color='#36629d' />}
      <div className='flex justify-between items-center'>
        <div className='relative max-w-lg w-full grid gap-2 text-slate-800'>
          <Label>Search</Label>
          <Input className='max-w-md border-slate-400' defaultValue={searchName} onChange={event => debounced(event.target.value)} />
        </div>
        <Link to="/patient/new">
          <Button className='rounded-none bg-[#2e5382] hover:bg-[#36629d]'>New Patient</Button>
        </Link>
      </div>

      <section className='mt-10'>
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
          <thead className="bg-gray-50">
              <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mobile Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                  </th>
              </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((p)=>(
              <tr key={p.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src="/avatar.jpeg" alt="" />
                          </div>
                          <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                  {p.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                  {p.email}
                              </div>
                          </div>
                      </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {p.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <GenderBadge gender={p.gender} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {p.mobile_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {p.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                    <Link to={`/patient-appointment/view/${p.id}`} className="text-cyan-600 hover:text-cyan-900 cursor-pointer">View</Link>
                    <Link to={`/patient/edit/${p.id}`} className="ml-2 text-indigo-600 hover:text-indigo-900 ">Edit</Link>
                    {/* <span className="ml-2 text-red-600 hover:text-red-900 cursor-pointer" onClick={()=>deletePatientMutation.mutate(p.id)}>Delete</span> */}
                  </td>
              </tr>
            ))}
            </tbody>
        </table>
      </section>
    </main>
  )
}

export default PatientsList


export function GenderBadge({gender}){
    switch (gender) {
        case "male":
            return (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Male
                </span>
            )

        case "female":
            return (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-100 text-pink-800">
                    Female
                </span>
            )

        case "other":
            return (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Other
                </span>
            )
    
        default:
            break;
    }
}