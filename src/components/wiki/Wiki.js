import React, { useState } from "react"
import styled, { css } from "styled-components"
import {
  add,
  block,
  cross,
  Breadcrumbs,
  Chips,
  Heading,
  Table,
  ToggleSwitch,
  MarkdownParser,
  MarkdownEditor,
  ContainedButton,
  SVG,
} from "project-pillow-components"
import {
  DP_TYPES,
  MAIN_THEME,
  DP6,
  ALTERNATE_THEME_COLORS,
} from "../../constants/theme"
import { Toggle, Label } from "../main"
import { MEDIA_MIN_MEDIUM } from "../../constants/sizes"
import { update, create, remove } from "../api/api"
import { apiUrl } from "../../constants/urls"

const Wrapper = styled.div`
  /* max-height: ${p => (p.created ? 40000 : 0)}px;
  transition: max-height 10s ease; */
  width: 100%;
  overflow: hidden;
  margin: 0.5rem 0;

  ${p =>
    p.toggleStyle &&
    css`
      background-color: #44444477;
      padding: 0.5rem;
      box-shadow: ${DP_TYPES.DP6};
      ${MEDIA_MIN_MEDIUM} {
        padding: 1rem;
      }
    `};
`

const ToggleWrapper = styled.div`
  margin: 0 0.6rem 0 0;
`
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
`

const NewItem = styled.div``
const H2 = styled.h2`
  display: flex;
  justify-content: space-between;
  margin: 0.2rem 0.2rem 0.5rem;
`

const TitleInput = styled.input`
  background-color: inherit;
  color: ${MAIN_THEME.PRIMARY.color.foreground};
  border: none;
  outline: none;
  width: 100%;
  box-shadow: ${DP6};
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
`

const checkMatchingSearchData = (data, searchValue) => {
  if (!data || searchValue === undefined) return false
  return (
    (data.title &&
      data.title.toLowerCase().includes(searchValue.toLowerCase())) ||
    (data.secondaryText &&
      data.secondaryText.toLowerCase().includes(searchValue.toLowerCase())) ||
    (data.description &&
      data.description.toLowerCase().includes(searchValue.toLowerCase())) ||
    (data.tags &&
      data.tags.some(tag =>
        tag.toLowerCase().includes(searchValue.toLowerCase())
      ))
  )
}

const checkMatchingSelectionData = (data, selected) => {
  if (!data || !selected) return false
  return data.title.toLowerCase() === selected.toLowerCase()
}

const Wiki = ({
  searchValue,
  setSearchValue,
  selected,
  setSelected,
  parentIsMatch = false,
  toggleStyle = true,
  data,
  level,
  crumbs = [],
}) => {
  const [title, setTitle] = useState(data.title)
  const [description, setDescription] = useState(data.description)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [showCreate, setShowCreate] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const isSelectedMatch = checkMatchingSelectionData(data, selected)
  const isSearchMatch = !selected && checkMatchingSearchData(data, searchValue)
  const lvl = level
    ? level + 1
    : isSelectedMatch || isSearchMatch
    ? 2
    : undefined
  const [showChildren, setShowChildren] = useState(data.showChildren)
  const [created, setCreated] = useState(false)
  const newCrumbs = [...crumbs, data.title]

  return isSelectedMatch || isSearchMatch || parentIsMatch ? (
    <Wrapper toggleStyle={toggleStyle} created={created}>
      {data && (
        <>
          {showCreate && (
            <>
              <NewItem>
                <H2>
                  New entry{" "}
                  <SVG
                    {...cross}
                    size={18}
                    onClick={() => setShowCreate(false)}
                    color="white"
                  />
                </H2>
                <TitleInput
                  placeholder="Title"
                  onChange={e => setNewTitle(e.target.value)}
                />
                <MarkdownEditor
                  markdown={newDescription}
                  setMarkdown={setNewDescription}
                />
              </NewItem>
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
          )}
          <Heading
            level={lvl}
            primaryColor={MAIN_THEME.PRIMARY.color.background}
          >
            <FlexWrapper>
              {showEditor ? (
                <TitleInput
                  placeholder="Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              ) : (
                data.title
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
                    size={28}
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
          {newCrumbs.length > 1 && (
            <Breadcrumbs
              crumbs={newCrumbs}
              setSelected={setSelected}
              size="medium"
            />
          )}
          {data.tags && (
            <Chips
              chips={data.tags.map(t => ({ title: t }))}
              onChange={value => value[0] && setSearchValue(value[0])}
            />
          )}
          {description && (
            <>
              {showEditor ? (
                <MarkdownEditor
                  markdown={description}
                  setMarkdown={setDescription}
                />
              ) : (
                <MarkdownParser markdown={description} />
              )}
            </>
          )}
          {description !== data.description && !showDelete && (
            <ContainedButton
              onClick={() => {
                const { _id, ...dataProps } = data
                update(
                  `${apiUrl}/wikis/${_id}`,
                  { ...dataProps, description },
                  "Unauthorized"
                ).then(response => {
                  console.log({ response })
                })
              }}
            >
              Update
            </ContainedButton>
          )}
          {data.table && (
            <Table
              headings={data.table.headings}
              data={data.table.data}
              headingBackgroundColor="#323232"
              headingForegroundColor="#cccccc"
              backgroundColor="#222222"
              alternateColor="#888888"
            />
          )}
          {data && showDelete && (
            <>
              <ContainedButton
                foregroundColor={MAIN_THEME.BLACK.color.foreground}
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </ContainedButton>
              <ContainedButton
                backgroundColor={ALTERNATE_THEME_COLORS.ERROR_TEXT_COLOR}
                foregroundColor={MAIN_THEME.BLACK.color.foreground}
                onClick={() => {
                  remove(`${apiUrl}/wikis/${data._id}`, "Unauthorized").then(
                    response => {
                      console.log({ response })
                    }
                  )
                }}
              >
                Delete
              </ContainedButton>
            </>
          )}
          {data.children && data.children.length > 0 && (
            <Breadcrumbs
              crumbs={data.children.map(child => child.title)}
              setSelected={setSelected}
              size="medium"
            />
          )}
          {data.children &&
            data.children.length > 0 &&
            (searchValue !== "" || selected) && (
              <Toggle>
                <ToggleSwitch
                  backgroundColor={MAIN_THEME.PRIMARY.color.background}
                  checked={showChildren}
                  onClick={() => setShowChildren(!showChildren)}
                />
                <Label>Visa mer</Label>
              </Toggle>
            )}
          {data.children &&
            data.children.map(child => (
              <Wiki
                key={child.id}
                toggleStyle={toggleStyle}
                data={child}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                selected={selected}
                setSelected={setSelected}
                parentIsMatch={showChildren}
                level={lvl}
                crumbs={newCrumbs}
              />
            ))}
        </>
      )}
    </Wrapper>
  ) : data.children ? (
    data.children.map(child => (
      <Wiki
        key={child.id}
        toggleStyle={toggleStyle}
        data={child}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        selected={selected}
        setSelected={setSelected}
        level={lvl}
        crumbs={newCrumbs}
        // parentIsMatch={parentIsMatch || isMatch}
      />
    ))
  ) : null
}

export default Wiki
