import React from 'react'
import margin from "../../styles/margins.module.scss";
type Props = {}
import img from '../../resources/logo2.jpg'
const Header = (props: Props) => {
  return (
    <div className = {margin.header}>
      <div className = {margin.logo} />
        <h2> Interview Managememnt System </h2>
    </div>
  )
}

export default Header