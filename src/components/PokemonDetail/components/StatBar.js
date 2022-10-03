import React from 'react'

export default function StatBar({ size }) {
  return (
    <div
        className='StatBar'
        style={{
            width: size/2 + '%',
            color: '#ffffff',
            backgroundColor: size >= 90 ? 'chartreuse' : 'gold'
        }}
    >
        {size}
    </div>
  )
}
