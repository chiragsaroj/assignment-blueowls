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
import { Separator } from '@/components/ui/separator';

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
          token: "b09c6e71392e190e0a51e74616991a0612091dd441ff",
          type: 'Bearer'
        },
        userState: {
          email: "admin@example.com",
        }
      })){
        // Redirect or do-something
        toast.success('Login successful')
        navigate('/dashboard')
      }else{
        //Throw error 
      }
    }
  })

  function onSubmit(values: {email: string, password: string}) {
    // loginMutation.mutate()
    if(signIn({
      auth: {
        token: "cbsdhujbjcbjsbcjsb",
        type: 'Bearer'
      },
      userState: {
        email: "admin@example.com",
      }
    })){
      // Redirect or do-something
      toast.success('Login successful')
      navigate('/')
    }else{
      //Throw error 
    }
  }

  return (
    <main className='relative flex flex-col justify-center items-center h-screen p-10 bg-[#2e5382]'>
      <Card className="w-full max-w-xl p-4">
        <form>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
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
              {/* <div className='flex justify-end'>
                <Button type='button' variant="link" className='text-blue-600' onClick={()=>navigate('/password-reset')}>Forgot Password</Button>
              </div> */}
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-5'>
            <Button type='submit' className="w-full" 
            onClick={handleSubmit(onSubmit)} 
            >Log in</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}