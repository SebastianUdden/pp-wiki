import React, { useState } from "react"
import { Text, TextButton, Modal as ModalUI } from "project-pillow-components"

const Modal = ({ title, description, onConfirm, onDeny }) => {
  const [modalOpen, setModalOpen] = useState(true)

  return (
    <>
      {modalOpen && (
        <ModalUI
          title={title}
          onClose={() => {
            setModalOpen(false)
          }}
          open={modalOpen}
        >
          <Text>{description}</Text>
          <div
            style={{
              display: "flex",
              marginTop: "32px",
              justifyContent: "flex-end",
            }}
          >
            <TextButton
              onClick={() => {
                setModalOpen(false)
                onConfirm()
              }}
              backgroundColorHover="#444444"
            >
              Yes
            </TextButton>
            <TextButton
              onClick={() => {
                setModalOpen(false)
                onDeny()
              }}
              backgroundColorHover="#444444"
            >
              No
            </TextButton>
          </div>
        </ModalUI>
      )}
    </>
  )
}

export default Modal
