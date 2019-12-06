import React from "react"
import {
  add,
  block,
  cross,
  Heading,
  SVG,
  ToggleSwitch,
  HighlightedText,
} from "project-pillow-components"
import { MAIN_THEME } from "../../constants/theme"
import { TitleInput, FlexWrapper, ToggleWrapper } from "./utils"

const WikiHeading = ({
  title,
  setTitle,
  highlight,
  lvl,
  showCreate,
  setShowCreate,
  showDelete,
  setShowDelete,
  showEditor,
  setShowEditor,
}) => {
  return (
    <Heading level={lvl} primaryColor={MAIN_THEME.PRIMARY.color.background}>
      <FlexWrapper>
        {showEditor ? (
          <TitleInput
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        ) : (
          <HighlightedText text={title} highlight={highlight} />
        )}
        <FlexWrapper>
          {lvl < 3 && !showCreate && (
            <SVG
              {...add}
              onClick={() => setShowCreate(true)}
              size={34}
              color="white"
            />
          )}
          <ToggleWrapper>
            <ToggleSwitch
              backgroundColor={MAIN_THEME.PRIMARY.color.background}
              checked={showEditor}
              onClick={() => setShowEditor(!showEditor)}
            />
          </ToggleWrapper>
          {showDelete ? (
            <SVG
              {...block}
              size={2}
              onClick={() => setShowDelete(false)}
              color="white"
            />
          ) : (
            <SVG
              {...cross}
              size={18}
              onClick={() => setShowDelete(true)}
              color="white"
            />
          )}
        </FlexWrapper>
      </FlexWrapper>
    </Heading>
  )
}

export default WikiHeading
