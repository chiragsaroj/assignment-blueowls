import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UsePatients from "@/services/UsePatients";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, { message: "This field has to be filled." }),
  age: z.string().min(1, { message: "This field has to be filled." }).max(100, { message: "Age must be between 1 and 100." }),
  gender: z.enum(["male", "female", "other"], { message: "Gender must be one of 'male', 'female', or 'other'." }),
  email: z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
  mobile_number: z.string().min(1, { message: "This field has to be filled." }).regex(/^\d{10}$/, { message: "This field must be a 10-digit number." })
})

function PatientForm({ 
  defaultValues = {
    name: "",
    age: "",
    email: "",
    mobile_number: ""
  },
  edit = false
}) {
  const { createPatient } = UsePatients()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  const createPatientMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: async (data)=>{
      navigate('/patients')
      toast.success("Patient created successfully")
    },
    onError(error: any, variables, context) {
      console.log(error)
      toast.error(error.response.data.detail)
    },
  })

  const onSubmit = (data)=>{
    if(edit){
      console.log(data)
    }else{
      createPatientMutation.mutate(data)
    }
  }

  return (
    <Card>
      <Form {...form}>
      <CardContent className="grid gap-4">
      <form className="flex flex-col gap-y-4 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient's Name</FormLabel>
              <div className="flex gap-3">
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl> 
              </div>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient's age</FormLabel>
              <div className="flex gap-3">
                <FormControl>
                  <Input type="number" autoComplete="off" {...field} />
                </FormControl> 
              </div>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue  />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="mobile_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <div className="flex gap-3">
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl> 
              </div>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <div className="flex gap-3">
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl> 
              </div>
              <FormMessage />
            </FormItem>
          )}
          />
          <div className="flex gap-3 justify-end">
            <Button className="mt-4 w-32" type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Form>
    </Card>
  )
}

export default PatientForm