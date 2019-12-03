import React, { useState } from "react"
import styled, { css } from "styled-components"
import {
  Breadcrumbs,
  Chips,
  Table,
  ToggleSwitch,
  MarkdownParser,
  MarkdownEditor,
  ContainedButton,
} from "project-pillow-components"
import {
  DP_TYPES,
  MAIN_THEME,
  ALTERNATE_THEME_COLORS,
} from "../../constants/theme"
import { Toggle, Label } from "../main"
import { MEDIA_MIN_MEDIUM } from "../../constants/sizes"
import { update, remove } from "../api/api"
import { apiUrl } from "../../constants/urls"
import NewItem from "./NewItem"
import WikiHeading from "./WikiHeading"
import NewChildren from "./NewChildren"

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
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
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
  return data.title && data.title.toLowerCase() === selected.toLowerCase()
}

const Wiki = ({
  dataArray,
  setDataArray,
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
  const [children, setChildren] = useState(data.children)
  const [tags, setTags] = useState(data.tags)
  const [showCreate, setShowCreate] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [newCrumbs, setNewCrumbs] = useState([
    ...crumbs,
    { _id: data._id, title: data.title },
  ])
  const [showChildrenDropdown, setShowChildrenDropdown] = useState(false)
  const isSelectedMatch = checkMatchingSelectionData(data, selected)
  const isSearchMatch =
    !selected && checkMatchingSearchData({ ...data, tags }, searchValue)
  const lvl = level
    ? level + 1
    : isSelectedMatch || isSearchMatch
    ? 2
    : undefined
  const [showChildren, setShowChildren] = useState(data.showChildren)
  const [created] = useState(false)

  return isSelectedMatch || isSearchMatch || parentIsMatch ? (
    <Wrapper toggleStyle={toggleStyle} created={created}>
      {data && (
        <>
          {showCreate && <NewItem onHide={() => setShowCreate(false)} />}
          <WikiHeading
            title={title || data.title}
            setTitle={setTitle}
            lvl={lvl}
            showCreate={showCreate}
            setShowCreate={setShowCreate}
            showDelete={showDelete}
            setShowDelete={setShowDelete}
            showEditor={showEditor}
            setShowEditor={setShowEditor}
          />
          {newCrumbs.length > 0 && (
            <Breadcrumbs
              crumbs={newCrumbs}
              onChange={value => setSelected(value.title)}
              size="medium"
            />
          )}
          {tags && (
            <Chips
              chips={tags.map(t => ({
                title: `${t}${showEditor ? " x" : ""}`,
              }))}
              onChange={value => {
                showEditor
                  ? setTags(tags.filter(t => t !== value[0]))
                  : value[0] && setSearchValue(value[0])
              }}
            />
          )}
          {description && !showEditor && (
            <MarkdownParser markdown={description} />
          )}
          {showEditor && (
            <MarkdownEditor
              markdown={description}
              setMarkdown={setDescription}
            />
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
          <FlexWrapper>
            {children && children.length > 0 && (
              <Breadcrumbs
                crumbs={children.map(c => ({
                  _id: c._id,
                  title: `${c.title}${showEditor ? " x" : ""}`,
                  showDelete: showEditor,
                }))}
                onChange={value => {
                  showEditor
                    ? setChildren(children.filter(c => c._id !== value._id))
                    : setSelected(value.title)
                }}
                size="medium"
              />
            )}
          </FlexWrapper>
          {showEditor && (
            <NewChildren
              data={data}
              dataArray={dataArray}
              setDataArray={setDataArray}
              children={children}
              setChildren={setChildren}
              newCrumbs={newCrumbs}
            />
          )}
          {!showDelete &&
            (title !== data.title ||
              description !== data.description ||
              tags !== data.tags ||
              children !== data.children) && (
              <>
                <ContainedButton
                  onClick={() => {
                    setTitle(data.title)
                    setDescription(data.description)
                    setChildren(data.children)
                    setShowEditor(false)
                  }}
                >
                  Cancel
                </ContainedButton>
                <ContainedButton
                  backgroundColor={MAIN_THEME.PRIMARY.color.background}
                  onClick={() => {
                    const { _id, ...dataProps } = data
                    const updateData = {
                      ...dataProps,
                      title: title || data.title,
                      description: description || data.description,
                      tags: tags || data.tags,
                      children: children ? children.map(c => c._id) : [],
                    }
                    update(
                      `${apiUrl}/wikis/${_id}`,
                      updateData,
                      "Unauthorized"
                    ).then(response => {
                      console.log({ response })
                      setShowEditor(false)
                    })
                  }}
                >
                  Update
                </ContainedButton>
              </>
            )}
          {children && children.length > 0 && (searchValue !== "" || selected) && (
            <Toggle>
              <ToggleSwitch
                backgroundColor={MAIN_THEME.PRIMARY.color.background}
                checked={showChildren}
                onClick={() => setShowChildren(!showChildren)}
              />
              <Label>Visa mer</Label>
            </Toggle>
          )}
          {children &&
            children.map(child => (
              <Wiki
                key={child._id}
                dataArray={dataArray}
                setDataArray={setDataArray}
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
  ) : children ? (
    children.map(child => (
      <Wiki
        key={child._id}
        dataArray={dataArray}
        setDataArray={setDataArray}
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
