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
import { useMutation } from "@tanstack/react-query";
import UseAppointments from "@/services/UseAppointments";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  appointment_date: z.string().min(1, { message: "This field has to be filled." }),
  amount: z.string().min(1, { message: "This field has to be filled." }),
  note: z.string().min(1, { message: "This field has to be filled." }),
  patient_id: z.string().min(1, { message: "This field has to be filled." })
});

export default function AppointmentForm({defaultValues = {
  appointment_date: "",
  amount: "1",
  note: "",
  patient_id: ""
}, patient_list}) {

  const { createAppointment } = UseAppointments()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  const createAppointmentMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: async (data)=>{
      navigate('/appointments')
      toast.success("Appointment created successfully")
    },
    onError(error: any, variables, context) {
      toast.error(error.response.data.detail)
    },
  })

  const onSubmit = (data)=>{
    createAppointmentMutation.mutate(data)
  }

  return (
    <Card>
      <Form {...form}>
      <CardContent className="grid gap-4">
      <form className="flex flex-col gap-y-4 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="appointment_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appointment Date</FormLabel>
              <div className="flex gap-3">
                <FormControl>
                  <Input type="datetime-local" autoComplete="off" {...field} />
                </FormControl> 
              </div>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="patient_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {patient_list?.map((p)=>(
                    <SelectItem key={p.id} value={p.id.toString()}>{p.name} | {p.email} | {p.mobile_number}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Amount in ($)</FormLabel>
              <div className="flex gap-3">
                <FormControl>
                  <Input pattern="[0-9.]+" autoComplete="off" {...field} />
                </FormControl> 
              </div>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appointment Note</FormLabel>
              <div className="flex gap-3">
                <FormControl>
                  <Textarea rows={9} autoComplete="off" {...field} />
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