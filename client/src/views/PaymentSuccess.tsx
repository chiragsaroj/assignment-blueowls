import { useParams } from "react-router-dom"


function PaymentSuccess() {
  const params = useParams()
  return (
    <div className='flex justify-center items-center h-screen'>
      <img src="/payment_success.svg" />
    </div>
  )
}

export default PaymentSuccess