import * as React from 'react'
import ComponentA from "../../component-a/src"

interface IProps {

}

export const ComponentB = (props:IProps) => {
  return <div>
    Component B
    <ComponentA title={"from component B"} />
  </div>
}

