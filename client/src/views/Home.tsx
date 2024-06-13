import UsePatients from '@/services/UsePatients';
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { StatusBadge } from './appointments/AppointmentList';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GenderBadge } from './patients/PatientsList';

function Home() {
  const { user, loginWithRedirect, isAuthenticated, isLoading, logout } = useAuth0()
  const { getPatientAppointmentDetails } = UsePatients()
  const { data, isSuccess } = useQuery({
    queryKey: ["patient_details", user?.email],
    queryFn: getPatientAppointmentDetails,
    enabled: !isLoading
  })

  return (
    <main>
      <header className="h-12 bg-[#2e5382] flex items-center justify-between px-20">
        <Link to="/login" className='bg-white shadow rounded px-10 py-1 font-medium text-sm'>Go to Admin Panel</Link>
        {!isLoading && 
          <>
          {isAuthenticated ? (
            <button 
            className="shadow bg-white hover:bg-slate-100 text-slate-900 px-8 rounded-full py-1 text-sm flex items-center gap-2"
            onClick={()=>logout()}
            >
              <img className="h-5" src="/google.svg" /> 
              Logout
            </button>
          ) : (
            <button 
            className="shadow bg-white hover:bg-slate-100 text-slate-900 px-8 rounded-full py-1 text-sm flex items-center gap-2"
            onClick={()=>loginWithRedirect()}
            >
              <img className="h-5" src="/google.svg" /> 
              Sign in with Google
            </button>
          )}
          </>
        }
      </header>

      {isSuccess && 
        <section className='p-10'>
          <Card>
            <CardHeader>
              <CardTitle>{data?.name}</CardTitle>
              <CardDescription>{data?.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm font-semibold">
                <li>Mobile Number: <span className="font-normal">{data?.mobile_number}</span></li>
                <li>Age: <span className="font-normal">{data?.age}</span></li>
                <li>Gender: <GenderBadge gender={data?.gender} /></li>
              </ul>
            </CardContent>
          </Card>

          <section className='mt-10'>
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                  <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Appointment Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment Status
                      </th>
                      {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Note
                      </th> */}
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Link
                      </th>
                  </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.appointments?.map((a)=>(
                  <tr key={a?.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {moment(a.appointment_date).format('dddd, MMMM D, YYYY h:mm A')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $ {a.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge payment_status={a.payment_status} />
                      </td>
                      {/* <td className="px-6 py-4 text-wrap break-words text-sm max-w-96">
                        {a.note}
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline">
                        <Link target='_blank' to={a.payment_link}>{a.payment_link}</Link>
                      </td>
                  </tr>
                  ))}
                </tbody>
            </table>
            </div>
          </section>
        </section>
      }
    </main>
  )
}

export default Home