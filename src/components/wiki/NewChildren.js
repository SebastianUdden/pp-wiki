import React from "react"
import { Dropdown } from "project-pillow-components"

const NewChildren = ({
  data,
  dataArray,
  setDataArray,
  children,
  setChildren,
  newCrumbs,
}) => {
  return (
    <Dropdown
      options={dataArray
        .filter(
          d =>
            d._id !== data._id &&
            (!children || !children.some(c => c._id === d._id)) &&
            !newCrumbs.some(c => c._id === d._id)
        )
        .map(c => ({ _id: c._id, title: c.title }))}
      onChange={value => {
        const addId = dataArray.find(d => d.title === value)._id
        const newDataArray = [
          ...dataArray.filter(d => d._id !== data._id),
          {
            ...data,
            children: [...(children ? children.map(c => c._id) : []), addId],
          },
        ]
        if (!newCrumbs.some(c => c._id === addId)) {
          console.log("new values")
          setDataArray(newDataArray)
          setChildren([
            ...(children || []),
            dataArray.find(d => d._id === addId),
          ])
        }
      }}
    />
  )
}

export default NewChildren
