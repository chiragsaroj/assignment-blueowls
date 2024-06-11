import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Link } from 'react-router-dom'

function AppointmentList() {
  return (
    <main>
      <div className='flex justify-end items-center'>
        <Link to="/patient/new">
          <Button className='rounded-none bg-[#2e5382] hover:bg-[#36629d]'>New Appointment</Button>
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
                      Appointment Date
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                  </th>
              </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="" />
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
                    {Date.now()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Paid
                      </span>
                      {/* <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Pending
                      </span> */}
                  </td>
                  <td className="px-6 my-4 whitespace-nowrap text-sm text-gray-500 max-w-80 text-wrap line-clamp-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus consequuntur sequi quo quos corporis magnam omnis nemo natus architecto, eligendi odio maxime tempore incidunt iusto voluptate rerum, porro aliquid eveniet.
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    https://docs.stripe.com/test-mode
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                      <a href="#" className="ml-2 text-red-600 hover:text-red-900">Delete</a>
                  </td>
              </tr>
            </tbody>
        </table>
      </section>
    </main>
  )
}

export default AppointmentList