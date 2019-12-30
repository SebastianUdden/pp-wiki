import React from "react"
import { Dropdown } from "project-pillow-components"
import { useWiki } from "../../contexts/WikiContext"

const filterChildren = (children, d) => {
  return !children || !children.some(c => c && c._id === d._id)
}

const NewChildren = ({ data, children, setChildren, newCrumbs }) => {
  const { wikiEntries, setWikiEntries } = useWiki()

  return (
    <Dropdown
      options={wikiEntries
        .filter(
          d =>
            d._id !== data._id &&
            filterChildren(children, d) &&
            !newCrumbs.some(c => c && c._id === d._id)
        )
        .map(c => ({ _id: c._id, title: c.title }))}
      onChange={value => {
        const addId = wikiEntries.find(d => d.title === value)._id
        const newWikiEntries = [
          ...wikiEntries.filter(d => d._id !== data._id),
          {
            ...data,
            children: [...(children ? children.map(c => c._id) : []), addId],
          },
        ]
        if (!newCrumbs.some(c => c._id === addId)) {
          setWikiEntries(newWikiEntries)
          setChildren([...(children || []), addId])
        }
      }}
    />
  )
}

export default NewChildren
