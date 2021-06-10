import React from 'react'
import './header.css'
interface IHeaderProps {
  title: string
}

function Header (props: IHeaderProps) {
  return <header  data-testid="header" className="row header">
    <div className="text-center d-flex justify-content-center align-items-center">
      <div className="h1Font">{ props.title }</div>
    </div>
  </header>
}

export default Header