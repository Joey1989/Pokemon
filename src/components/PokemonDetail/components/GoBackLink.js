import React from 'react'
import { Link } from 'react-router-dom'

export default function GoBackLink({destination, url}) {
  return (
    <div className='GoBackLink TextLeft'>
        <Link to={url} >
            {destination}
        </Link>
    </div>
  )
}
