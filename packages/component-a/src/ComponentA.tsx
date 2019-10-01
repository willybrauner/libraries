import * as React from 'react'

interface IProps {
  title: string
}

export const ComponentA = (props:IProps) => {
  return <h1>{props.title}</h1>
}


