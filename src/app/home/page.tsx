import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div className="text-center">
        <div className="flex flex-col space-y-5">
            Hello user!
            <p>User athenticated!</p>
        </div>
    </div>
  )
}