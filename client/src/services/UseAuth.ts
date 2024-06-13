import useInstance from "@/lib/instance"


export default function UseAuth() {
  const {instance: api} = useInstance()

  const login = async (obj)=>{
    const res = await api.post('token', obj, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data
  }

  return {
    login
  }
}