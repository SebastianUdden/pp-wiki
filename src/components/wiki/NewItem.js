import React, { useState } from "react"
import styled from "styled-components"
import {
  cross,
  ContainedButton,
  Dropdown,
  MarkdownEditor,
  SVG,
} from "project-pillow-components"
import { create, update } from "../api/api"
import { apiUrl } from "../../constants/urls"
import { TitleInput, H2 } from "./utils"
import { useWiki } from "../../contexts/WikiContext"

const ErrorMessage = styled.p`
  color: red;
  font-weight: 800;
`

const NewItem = ({ onHide, parent, setChildren }) => {
  const { wikiEntries, setWikiEntries } = useWiki()
  const [newTitle, setNewTitle] = useState("")
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [newDescription, setNewDescription] = useState({
    meta: { justifyContent: "flex-start" },
    body: "",
  })

  return (
    <>
      <div>
        <H2>
          New entry <SVG {...cross} size={18} onClick={onHide} color="white" />
        </H2>
        <TitleInput
          placeholder="Title"
          onChange={e => setNewTitle(e.target.value)}
        />
        <MarkdownEditor
          markdown={newDescription}
          setMarkdown={setNewDescription}
        />
        <label>Select parent</label>
        <Dropdown
          label="Select parent"
          selected={parent.title}
          options={wikiEntries
            .map(c => ({ _id: c._id, title: c.title }))
            .sort((a, b) =>
              a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1
            )}
          onChange={() => alert("test")}
        />
        {showErrorMessage && <ErrorMessage>{showErrorMessage}</ErrorMessage>}
      </div>
      {newTitle !== "" && newDescription !== "" && (
        <ContainedButton
          onClick={() => {
            const newItem = { title: newTitle, description: newDescription }
            create(`${apiUrl}/wikis`, newItem, "Unauthorized").then(
              response => {
                console.log("Create response: ", response)
                if (response.error) {
                  console.error("Create request failed with: ", response.error)
                  setShowErrorMessage("Create request failed, try again...")
                  return
                }
                setShowErrorMessage("")
                const createdData = response.created
                const { _id, ...dataProps } = parent
                const newChildren = [
                  ...(dataProps.children || []),
                  response.created._id,
                ]
                const updateData = {
                  ...dataProps,
                  children: newChildren,
                }
                createdData && setWikiEntries([...wikiEntries, createdData])
                update(
                  `${apiUrl}/wikis/${_id}`,
                  updateData,
                  "Unauthorized"
                ).then(response => {
                  console.log("Update response: ", response)
                  if (response.error) {
                    console.error(
                      "Update request failed with: ",
                      response.error
                    )
                    setShowErrorMessage(
                      `Item created successfully but update request for parent failed... Go to ${parent.title} and add this child manually in the editor.`
                    )
                    return
                  }
                  setShowErrorMessage("")
                  onHide()
                  const index = wikiEntries.findIndex(
                    entry => entry._id === _id
                  )
                  const newWikiEntries = [...wikiEntries, createdData]
                  const updatedData = {
                    _id,
                    ...updateData,
                  }
                  newWikiEntries[index] = updatedData
                  setChildren(newChildren)
                  setWikiEntries(newWikiEntries)
                })
              }
            )
          }}
        >
          Create
        </ContainedButton>
      )}
    </>
  )
}

export default NewItem
