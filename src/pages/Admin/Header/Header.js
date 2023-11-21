import { HomeFilled, MenuOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import React from 'react'
import { Link} from 'react-router-dom';
import SidebarData from '../Sidebar/SidebarData';
import axios from 'axios';
import { useAdminAuthContext } from 'contexts/AdminAuthContext';

export default function Header() {
  const {dispatch,user} = useAdminAuthContext()
  const  handleLogout = ()=>{
  axios.post("http://localhost:8000/auth/logout", {_id:user._id}).then((res)=>{
    console.log(res.data.message)
    dispatch({type:"LOGGED_OUT", user:null})
    window.sessionStorage.removeItem("token")
  
  }).catch((error)=>{
    console.log(error)
  })
 }
  return (
    <>
      <div className="offcanvas offcanvas-start bg-secondary text-light w-50" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        {/* <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel"></h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div> */}
        <div className="offcanvas-body  m-0 p-0">
          <SidebarData />
        </div>
      </div>
      <div className='main-header'>
        <Link to='/'><div className="left-side">
          <h6>FS Bank</h6>
        </div></Link>
        <div className="sidebar-toggle">
          <button className="btn btn-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <MenuOutlined />
          </button>
        </div>
        <div className="right-side">
          <Link to='/myaccount'>
            <span>  <UserOutlined /> My Account</span>
          </Link>
          <span>|</span>
          <span onClick={()=>handleLogout()}> <LogoutOutlined />   Logout</span>
          
        </div>
      </div>
      <div className="sub-header">
        <div className="left-side">
         <Link to="/"> <HomeFilled /></Link>
        </div>
        <div className="right-side">
          <Link to='/myaccount'>
            <UserOutlined />
          </Link>
          <b>|</b>
          <LogoutOutlined onClick={()=>handleLogout()} />

        </div>
      </div>
    </>
  )
}
