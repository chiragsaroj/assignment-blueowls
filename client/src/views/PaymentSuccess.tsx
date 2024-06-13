import useInstance from "@/lib/instance"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"


function PaymentSuccess() {
  const {instance: api} = useInstance()
  const params = useParams()
  const navigate = useNavigate()

  const updatePaymentStatusMutation = useMutation({
    mutationFn: async()=>{
      const res = await api.put(`appointments/${params?.id}/payment-status`)
      return res.data
    },
    onSuccess: async(data)=>{
      navigate('/')
      toast.success("Payment Completed")
    },
    onError: async(data)=>{
      // navigate('/')
      toast.error("Something went wrong")
    }
  })
  
  useEffect(() => {
    updatePaymentStatusMutation.mutate()
  }, [])
  

  return (
    <div className='flex justify-center items-center h-screen'>
      <img src="/payment_success.svg" />
    </div>
  )
}

export default PaymentSuccess