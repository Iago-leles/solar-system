import React from 'react'

export const Lighting: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <hemisphereLight
        args={['#606080', '#202020']}
        intensity={0.4}
      />
    </>
  )
}

