import React from "react"
import { Dropdown } from "project-pillow-components"
import { useWiki } from "../../contexts/WikiContext"

const filterChildren = (children, d) => {
  return !children || !children.some(c => c && c._id === d._id)
}

const NewChildren = ({ data, children, setChildren, newCrumbs }) => {
  const { wikiEntries } = useWiki()

  return (
    <Dropdown
      options={wikiEntries
        .filter(
          d =>
            d._id !== data._id &&
            filterChildren(children, d) &&
            !newCrumbs.some(c => c && c._id === d._id)
        )
        .map(c => ({ _id: c._id, title: c.title }))
        .sort((a, b) =>
          a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1
        )}
      onChange={value => {
        const addId = wikiEntries.find(d => d.title === value)._id

        if (!newCrumbs.some(c => c._id === addId)) {
          setChildren([...(children || []), addId])
        }
      }}
    />
  )
}

export default NewChildren

// const updateChildren = [...(children || []), addId]
// const updateEntry = {
//   ...data,
//   children: updateChildren,
// }
// const newWikiEntries = [
//   ...wikiEntries.filter(d => d._id !== data._id),
//   updateEntry,
// ]
// setWikiEntries(newWikiEntries)
