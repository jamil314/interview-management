import { useRouter } from 'next/router'
import React from 'react'
import margin from "../styles/margins.module.scss";
import ForgotPassword from "../component/Forms/ForgotPassword";
type Props = {}

const Forgot_password = (props: Props) => {
    
    const {query} = useRouter();
    console.log(query);
 
    return (
        <div className = {margin.login} >
          <ForgotPassword />
        </div>
    )
}

export default Forgot_password