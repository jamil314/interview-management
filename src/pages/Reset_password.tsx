import { useRouter } from 'next/router'
import React from 'react'
import margin from "../styles/margins.module.scss";
import ResetPassword from "../component/Forms/ResetPassword";
type Props = {}

const Reset_password = (props: Props) => {
    
    const {query} = useRouter();
    console.log(query);
 
    return (
        <div className = {margin.login} >
          <ResetPassword />
        </div>
    )
}

export default Reset_password