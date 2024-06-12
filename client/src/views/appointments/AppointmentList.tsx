import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import UseAppointments from '@/services/UseAppointments'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

function AppointmentList() {
  const { getAppointments } = UseAppointments()
  const { data, status, isLoading, isFetching } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments
})
  return (
    <main>
      <div className='flex justify-end items-center'>
        <Link to="/appointment/new">
          <Button className='rounded-none bg-[#2e5382] hover:bg-[#36629d]'>New Appointment</Button>
        </Link>
      </div>

      <section className='mt-10'>
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
              <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Appointment Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Link
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                  </th>
              </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((a)=>(
              <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src="/avatar.jpeg" alt="" />
                          </div>
                          <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                  Jane Cooper
                              </div>
                              <div className="text-sm text-gray-500">
                                  jane.cooper@example.com
                              </div>
                          </div>
                      </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {moment(a.appointment_date).format('dddd, MMMM D, YYYY h:mm A')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $ {a.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge payment_status={a.payment_status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline">
                    <Link target='_blank' to={a.payment_link}>{a.payment_link}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                    <span className="text-cyan-600 hover:text-cyan-900 cursor-pointer">View</span>
                  </td>
              </tr>
              ))}
            </tbody>
        </table>
        </div>
      </section>
    </main>
  )
}

export default AppointmentList

function StatusBadge({payment_status}){
  switch (payment_status) {
      case "paid":
          return (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Paid
            </span>
          )

      case "pending":
          return (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
              Pending
            </span> 
          )
  
      default:
          break;
  }
}