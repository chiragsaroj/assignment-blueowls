import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import UseAppointments from "@/services/UseAppointments"
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import { GenderBadge } from "../patients/PatientsList"
import moment from "moment"
import { StatusBadge } from "./AppointmentList"

export default function PatientAppointmentView() {
  const params = useParams()
  const { getPatientAppointment } = UseAppointments()
  const { data, status } = useQuery({
    queryKey: ["patient_appointments", params?.id],
    queryFn: getPatientAppointment
  })

  return (
    <main>
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
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
                  <td className="px-6 py-4 text-wrap break-words text-sm max-w-96">
                    {a.note}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline">
                    <Link target='_blank' to={a.payment_link}>{a.payment_link}</Link>
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