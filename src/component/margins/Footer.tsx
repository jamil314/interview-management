import React from 'react'
import margin from "../../styles/margins.module.scss";

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className = {margin.footer}>
        All credit reserved :: developers @ 2023
    </div>
  )
}

export default Footer