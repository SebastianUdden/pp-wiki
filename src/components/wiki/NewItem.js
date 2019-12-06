import React, { useState } from "react"
import {
  cross,
  SVG,
  MarkdownEditor,
  ContainedButton,
} from "project-pillow-components"
import { create } from "../api/api"
import { apiUrl } from "../../constants/urls"
import { TitleInput, H2 } from "./utils"

const NewItem = ({ onHide }) => {
  const [newTitle, setNewTitle] = useState("")
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
      </div>
      {newTitle !== "" && newDescription !== "" && (
        <ContainedButton
          onClick={() => {
            create(
              `${apiUrl}/wikis`,
              { title: newTitle, description: newDescription },
              "Unauthorized"
            ).then(response => {
              console.log({ response })
            })
          }}
        >
          Create
        </ContainedButton>
      )}
    </>
  )
}

export default NewItem
