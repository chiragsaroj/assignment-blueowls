import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function Login() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const {
    register, 
    handleSubmit, 
    formState: { errors }} = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const loginMutation = useMutation({
    mutationFn: async()=>{ 
      return true 
    },
    onSuccess: (data)=>{
      if(signIn({
        auth: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcxODI5ODUzOX0.B51C54M3OHA9dLBTQ4AwC8LA1cevojH-OT-r1MN6zNk",
          type: 'Bearer'
        },
        // userState: {
        //   email: "admin@example.com",
        // }
      })){
        toast.success('Login successful')
        navigate('/dashboard')
      }else{
        //Throw error 
      }
    }
  })

  function onSubmit(values: {email: string, password: string}) {
    loginMutation.mutate()
  }

  return (
    <main className='relative flex flex-col justify-center items-center h-screen p-10 bg-slate-200'>
      <Card className="w-full max-w-xl p-4">
      <img className='mx-auto rounded-full p-4 bg-white' src="/logo.jpeg" alt='logo' width={120} height={120} />
        <form>
          {/* <CardHeader className='text-center'>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader> */}
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@example.com" {...register("email", { required: "Email is required" })} />
              <span className='text-xs text-red-500'>{errors.email?.message}</span>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password", { required: "Password is required" })} />
              <span className='text-xs text-red-500'>{errors.password?.message}</span>
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-5'>
            <Button type='submit' className="w-full bg-[#2e5382] hover:bg-[#36629d]" 
            onClick={handleSubmit(onSubmit)} 
            >Log in</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}