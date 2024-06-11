import { LogOut } from 'lucide-react';
import { ReactNode } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

export default function AppSidebar({children}: {children: ReactNode}) {
  const signOut = useSignOut()
  const handleSignOut = ()=>{
    signOut();
    window.location.reload();
  }
  return (
    <div className='flex'>
    <Sidebar className='h-screen !border-none !sticky !top-0'>
      <div>
        <Link to='/dashboard'>
          <img className='mx-auto my-10 rounded-full p-4 bg-white' src="/logo.jpeg" alt='logo' width={120} height={120} />
        </Link>
      </div>
      <Menu className='text-[15px]'>
        <MenuItem component={<Link to='/patients'></Link>}>Patients</MenuItem>
        <MenuItem component={<Link to='/appointments'></Link>}>Appointments</MenuItem>
        <MenuItem component={<Link to='/users'></Link>}>Users</MenuItem>
        {/* <SubMenu label="Metrics">
          <MenuItem component={<Link to='/metrics'></Link>}>All Metrics</MenuItem>
          <MenuItem component={<Link to='/brand_metrics'></Link>}>Brand Wise Metrics</MenuItem>
          <MenuItem component={<Link to='/comp_metrics'></Link>}>You vs Competitors</MenuItem>
        </SubMenu>
        <SubMenu label="Help & Support">
          <MenuItem component={<Link to='/faq'></Link>}> FAQs </MenuItem>
          <MenuItem component={<Link to='/contact-us'></Link>}> Contact Us </MenuItem>
          <MenuItem component={<Link to='/walkthrough'></Link>}> How it works </MenuItem>
        </SubMenu>
        <MenuItem component={<Link to='/profile'></Link>}>Profile</MenuItem>
        <MenuItem component={<Link to='/products'></Link>}>Products</MenuItem> */}
      </Menu>
      <div className='absolute bottom-0 w-full p-5'>
        <Button variant="secondary" className='flex gap-2 cursor-pointer w-full rounded-none'
        onClick={handleSignOut}
        >Log out <LogOut size={20} strokeWidth={1.4} /></Button>
      </div>
    </Sidebar>
    <div className='w-full'>
      {/* <header className="h-14 w-full sticky top-0" style={{background: "linear-gradient(90deg, rgba(1,32,27,1) 0%, rgba(4,25,23,1) 0%)"}}>
      </header> */}
      <div className='p-5'>{children}</div>
    </div>
    </div>
  )
}