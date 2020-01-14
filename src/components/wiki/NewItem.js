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
import { useUser } from "../../contexts/UserContext"

const ErrorMessage = styled.p`
  color: red;
  font-weight: 800;
`

const NewItem = ({ onHide, parent, setChildren }) => {
  const { user } = useUser()
  const { wikiEntries, setWikiEntries } = useWiki()
  const [newTitle, setNewTitle] = useState("")
  const [selected, setSelected] = useState(parent)
  const [errorMessage, setErrorMessage] = useState("")
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
          selected={selected.title}
          options={wikiEntries
            .map(c => ({ _id: c._id, title: c.title }))
            .sort((a, b) =>
              a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1
            )}
          onChange={value =>
            setSelected(wikiEntries.find(d => d.title === value))
          }
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
      {newTitle !== "" && newDescription !== "" && selected && (
        <ContainedButton
          onClick={() => {
            const newItem = {
              title: newTitle,
              description: newDescription,
              createdBy: { name: user.username, email: user.email },
            }
            create(`${apiUrl}/wikis`, newItem, "Unauthorized").then(
              response => {
                console.log("Create response: ", response)
                if (response.error) {
                  console.error("Create request failed with: ", response.error)
                  setErrorMessage("Create request failed, try again...")
                  return
                }
                setErrorMessage("")
                const createdData = {
                  ...response.created,
                  createdAt: new Date().toUTCString(),
                }
                const { _id, ...dataProps } = selected
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
                    setErrorMessage(
                      `Item created successfully but update request for parent failed... Go to ${selected.title} and add this child manually in the editor.`
                    )
                    return
                  }
                  setErrorMessage("")
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
                  parent.title === selected.title && setChildren(newChildren)
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
