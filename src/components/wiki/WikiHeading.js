import React, { useState } from "react"
import styled from "styled-components"
import {
  add,
  block,
  cross,
  Heading,
  SVG,
  ToggleSwitch,
  HighlightedText,
  cloudDone,
  cloudUpload,
} from "project-pillow-components"
import { MAIN_THEME } from "../../constants/theme"
import { TitleInput, FlexWrapper } from "./utils"

const DateWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`

const DateText = styled.span`
  font-size: 12px;
  color: ${p => p.color};
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const SVGWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`

const WikiHeading = ({
  title,
  setTitle,
  createdAt,
  updatedAt,
  highlight,
  lvl,
  showCreate,
  setShowCreate,
  showDelete,
  setShowDelete,
  showEditor,
  setShowEditor,
}) => {
  const [tempTitle, setTempTitle] = useState(title)
  const [showCreatedAt, setShowCreatedAt] = useState(false)
  const updatedAtString = updatedAt.toLocaleString()
  return (
    <Heading level={lvl} primaryColor={MAIN_THEME.PRIMARY.color.background}>
      <DateWrapper>
        {showCreatedAt ? (
          <DateText
            color={
              createdAt < new Date().setHours(0, 0, 0, 0)
                ? "#ffffff22"
                : MAIN_THEME.PRIMARY.color.background
            }
            onClick={() => setShowCreatedAt(!showCreatedAt)}
          >
            {createdAt.toLocaleDateString()}&nbsp;
            <SVG
              {...cloudDone}
              onClick={() => setShowCreate(true)}
              size={12}
              color="#ffffff88"
            />
          </DateText>
        ) : (
          <DateText
            color={
              updatedAt < new Date().setHours(0, 0, 0, 0)
                ? "#ffffff22"
                : MAIN_THEME.PRIMARY.color.background
            }
            onClick={() => setShowCreatedAt(!showCreatedAt)}
          >
            {updatedAtString.slice(0, updatedAtString.length - 3)}&nbsp;
            <SVG
              {...cloudUpload}
              onClick={() => setShowCreate(true)}
              size={12}
              color="#ffffff88"
            />
          </DateText>
        )}
      </DateWrapper>
      <FlexWrapper>
        {showEditor ? (
          <TitleInput
            placeholder="Title"
            value={tempTitle}
            onChange={e => {
              setTempTitle(e.target.value)
            }}
            onBlur={() => {
              setTitle(tempTitle || title)
              setTempTitle(tempTitle || title)
            }}
          />
        ) : (
          <HighlightedText text={title} highlight={highlight} />
        )}
        <FlexWrapper column alignment="flex-end">
          <FlexWrapper>
            {lvl < 3 && !showCreate && (
              <SVG
                {...add}
                onClick={() => setShowCreate(true)}
                size={27}
                color="white"
              />
            )}
            <ToggleSwitch
              size={20}
              backgroundColor={MAIN_THEME.PRIMARY.color.background}
              checked={showEditor}
              onClick={() => setShowEditor(!showEditor)}
            />
            <SVGWrapper>
              {showDelete ? (
                <SVG
                  {...block}
                  size={20}
                  onClick={() => setShowDelete(false)}
                  color="white"
                />
              ) : (
                <SVG
                  {...cross}
                  size={15}
                  onClick={() => setShowDelete(true)}
                  color="white"
                />
              )}
            </SVGWrapper>
          </FlexWrapper>
        </FlexWrapper>
      </FlexWrapper>
    </Heading>
  )
}

export default WikiHeading
