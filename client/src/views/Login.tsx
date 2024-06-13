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
import UseAuth from '@/services/UseAuth';

export default function Login() {
  const { login } = UseAuth()
  const signIn = useSignIn();
  const navigate = useNavigate();
  const {
    register, 
    handleSubmit, 
    formState: { errors }} = useForm({
    defaultValues: {
      username: "",
      password: ""
    },
  })

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data)=>{
      if(signIn({
        auth: {
          token: data?.access_token,
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

  function objectToFormData(obj, form = new FormData(), namespace = '') {
    for (let property in obj) {
        if (obj.hasOwnProperty(property)) {
            let formKey = namespace ? `${namespace}[${property}]` : property;

            if (obj[property] !== null && typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
                objectToFormData(obj[property], form, formKey);
            } else {
                form.append(formKey, obj[property]);
            }
        }
    }
    return form;
}

  function onSubmit(values: {username: string, password: string}) {
    const formData = objectToFormData(values);
    loginMutation.mutate(formData)
  }

  return (
    <main className='relative flex flex-col justify-center items-center h-screen p-10 bg-slate-200'>
      <Card className="w-full max-w-xl p-4">
      <img className='mx-auto rounded-full p-4 bg-white' src="/logo.jpeg" alt='logo' width={120} height={120} />
        <form>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input {...register("username", { required: "Username is required" })} />
              <span className='text-xs text-red-500'>{errors.username?.message}</span>
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