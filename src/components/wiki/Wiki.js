import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import {
  Breadcrumbs,
  Chips,
  Table,
  ToggleSwitch,
  MarkdownParser,
  MarkdownEditor,
  ContainedButton,
  block,
  SVG,
  done,
  deleteTrashcanForever,
  deleteTrashcan,
} from "project-pillow-components"
import { MAIN_THEME } from "../../constants/theme"
import { Toggle } from "../main"
import { update, remove } from "../api/api"
import { apiUrl } from "../../constants/urls"
import NewItem from "./NewItem"
import WikiHeading from "./WikiHeading"
import NewChildren from "./NewChildren"
import Diff from "./Diff"
import { useWiki } from "../../contexts/WikiContext"
import { useUser } from "../../contexts/UserContext"
import { arraysEqual } from "./utils"
import { Button, Wrapper } from "../common"
import { FooterWrapper } from "../footer/footer"

export const Label = styled.label`
  margin-right: 0.2rem;
  cursor: pointer;
`

const EditorFooter = styled(FooterWrapper)`
  padding: 0 1rem;
`

const ErrorMessage = styled.p`
  color: red;
  font-weight: 800;
  margin: 0;
`

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
`

const ContentBox = styled.div`
  ${p =>
    p.showEditor &&
    css`
      position: fixed;
      top: 4.5rem;
      left: 0.5rem;
      right: 0.5rem;
      bottom: 0;
      border-radius: 12px;
      overflow-y: scroll;
      background-color: #2e2e2e;
      padding: 0 1rem 6rem;
      z-index: 90;
    `};
`

const Section = styled.div`
  display: grid;
`

const SectionItem = styled.div`
  grid-column: 1;
  grid-row: 1;
`

const checkMatchingSearchData = (data, searchValue) => {
  if (!data || searchValue === undefined) return false
  return (
    (data.title &&
      data.title.toLowerCase().includes(searchValue.toLowerCase())) ||
    (data.secondaryText &&
      data.secondaryText.toLowerCase().includes(searchValue.toLowerCase())) ||
    (data.description &&
      data.description.body
        .toLowerCase()
        .includes(searchValue.toLowerCase())) ||
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

const checkForMatches = ({
  currentValue,
  isSelected,
  data,
  description,
  level,
  parentIsMatch,
  tags,
}) => {
  const newSelected = currentValue && isSelected ? currentValue : ""
  const newSearchValue = currentValue && !isSelected ? currentValue : ""
  const isSelectedMatch = checkMatchingSelectionData(data, newSelected)
  const isSearchMatch =
    !isSelected &&
    checkMatchingSearchData({ ...data, description, tags }, newSearchValue)
  const lvl = level
    ? level + 1
    : isSelectedMatch || isSearchMatch
    ? 2
    : undefined
  const highlight = newSelected || newSearchValue
  const isMatch = isSelectedMatch || isSearchMatch || parentIsMatch
  return {
    lvl,
    highlight,
    isMatch,
  }
}

const Wiki = ({
  onFoundMatch,
  searchValue,
  setSearchValue,
  selected,
  setSelected,
  history,
  setHistory,
  historyIndex,
  setHistoryIndex,
  parentIsMatch = false,
  theme = "Grey",
  data: dataProps,
  level,
  crumbs = [],
}) => {
  const { user } = useUser()
  const { wikiEntries, setWikiEntries } = useWiki()
  const id = (dataProps && dataProps._id) || dataProps
  const data = wikiEntries.find(entry => entry._id === id)
  if (!data) return null
  const [errorMessage, setErrorMessage] = useState("")
  const [hide, setHide] = useState(false)
  const createdAt = data.createdAt ? new Date(data.createdAt) : null
  const updatedAt = data.updatedAt ? new Date(data.updatedAt) : null
  const [title, setTitle] = useState(data.title)
  const [description, setDescription] = useState(
    typeof data.description === "string"
      ? { meta: { justifyContent: "flex-start" }, body: data.description }
      : data.description
  )
  const [children, setChildren] = useState(
    data.children ? data.children.filter(Boolean) : null
  )
  const [tags, setTags] = useState(data.tags)
  const [showCreate, setShowCreate] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const currentValue = history[historyIndex] && history[historyIndex].value
  const isSelected = history[historyIndex] && history[historyIndex].isSelected

  const { lvl, highlight, isMatch } = checkForMatches({
    currentValue,
    isSelected,
    data,
    description,
    level,
    parentIsMatch,
    tags,
    searchValue,
    selected,
  })
  const [showChildren, setShowChildren] = useState(
    title === "Wiki" || data.showChildren
  )
  const newCrumbs = [...crumbs, { _id: data._id, title: data.title }]

  if (isMatch) {
    onFoundMatch(true)
  }

  if (hide) return null

  const handleUpdate = () => {
    setErrorMessage("")
    const { _id, ...dataProps } = data
    const updateData = {
      ...dataProps,
      title: title || data.title,
      description: description || data.description,
      tags: tags || data.tags,
      children: children ? children.filter(Boolean) : [],
      updatedBy: { name: user.username, email: user.email },
    }
    update(`${apiUrl}/wikis/${_id}`, updateData, "Unauthorized").then(
      response => {
        console.log({ response })
        if (response.error) {
          console.error("Update request failed with: ", response.error)
          setErrorMessage(
            "Update failed, wait for a few seconds then try again..."
          )
          return
        }
        const index = wikiEntries.findIndex(entry => entry._id === data._id)
        const newWikiEntries = [...wikiEntries]
        newWikiEntries[index] = {
          _id,
          ...updateData,
          updatedAt: new Date(),
        }
        setWikiEntries(newWikiEntries)
        setShowEditor(false)
      }
    )
  }

  const handleDelete = () => {
    remove(`${apiUrl}/wikis/${data._id}`, "Unauthorized").then(response => {
      console.log({ response })
      if (response.error) {
        console.error("Delete request failed with: ", response.error)
        setErrorMessage(
          "Deletion of item failed, try again in a few seconds..."
        )
        return
      }
      const newEntries = wikiEntries
        .filter(entry => entry._id !== data._id)
        .map(entry => ({
          ...entry,
          children:
            entry.children && entry.children.filter(c => c !== data._id),
        }))
      setWikiEntries(newEntries)
      setSearchValue("")
      setSelected("Wiki")
      setHide(true)
      setShowDelete(false)
    })
  }

  useEffect(() => {
    if (showEditor) {
      document.body.style.position = "fixed"
      document.body.style.top = `-${window.scrollY}px`
      return
    }
    document.body.style.position = ""
  }, [showEditor])

  return isMatch ? (
    <Wrapper theme={theme}>
      {data && (
        <>
          {showCreate && (
            <NewItem
              parent={data}
              setChildren={setChildren}
              onHide={() => setShowCreate(false)}
            />
          )}
          <ContentBox showEditor={showEditor}>
            <Section>
              {title !== data.title && (
                <SectionItem>
                  <Diff color={MAIN_THEME.PRIMARY.color.background} />
                </SectionItem>
              )}
              <SectionItem>
                <WikiHeading
                  title={title || data.title}
                  setTitle={setTitle}
                  createdAt={createdAt}
                  updatedAt={updatedAt}
                  createdBy={data.createdBy}
                  updatedBy={data.updatedBy}
                  highlight={highlight}
                  lvl={lvl}
                  showCreate={showCreate}
                  setShowCreate={setShowCreate}
                  showDelete={showDelete}
                  setShowDelete={setShowDelete}
                  showEditor={showEditor}
                  setShowEditor={setShowEditor}
                />
              </SectionItem>
            </Section>

            {newCrumbs.length > 0 && (
              <Breadcrumbs
                className="crumbs"
                crumbs={newCrumbs}
                onChange={value => {
                  setSelected(value.title)
                  setSearchValue("")
                }}
                size="medium"
              />
            )}
            <Section>
              {tags !== data.tags && (
                <SectionItem>
                  <Diff color={MAIN_THEME.PRIMARY.color.background} />
                </SectionItem>
              )}
              {tags && (
                <SectionItem>
                  <Chips
                    chips={tags.map(t => ({
                      title: t,
                      showRemove: showEditor,
                    }))}
                    onChange={value => {
                      showEditor
                        ? setTags(tags.filter(t => t !== value[0]))
                        : value[0] && setSearchValue(value[0])
                    }}
                  />
                </SectionItem>
              )}
            </Section>
            <Section>
              {description !== data.description && (
                <SectionItem>
                  <Diff color={MAIN_THEME.PRIMARY.color.background} />
                </SectionItem>
              )}
              <SectionItem>
                {description && !showEditor && (
                  <MarkdownParser
                    markdown={description}
                    highlight={highlight}
                    primaryColor={MAIN_THEME.PRIMARY.color.background}
                  />
                )}
                {showEditor && (
                  <MarkdownEditor
                    markdown={description}
                    setMarkdown={setDescription}
                  />
                )}
              </SectionItem>
            </Section>
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
              </>
            )}
            <Section>
              {!arraysEqual(children, data.children) && (
                <SectionItem>
                  <Diff color={MAIN_THEME.PRIMARY.color.background} />
                </SectionItem>
              )}
              <SectionItem>
                <FlexWrapper>
                  {children && children.length > 0 && (
                    <Breadcrumbs
                      icon={false}
                      crumbs={children.map(c => {
                        const entry = wikiEntries.find(entry => entry._id === c)
                        const title = entry && entry.title
                        return {
                          _id: c,
                          title: `${title}${showEditor ? " x" : ""}`,
                          showDelete: showEditor,
                        }
                      })}
                      onChange={value => {
                        if (showEditor) {
                          setChildren(children.filter(c => c !== value._id))
                        } else {
                          setSelected(value.title)
                          setSearchValue("")
                        }
                      }}
                      size="medium"
                    />
                  )}
                </FlexWrapper>
              </SectionItem>
            </Section>
            {showEditor && (
              <NewChildren
                data={data}
                children={children}
                setChildren={setChildren}
                newCrumbs={newCrumbs}
              />
            )}
            {showEditor && (
              <EditorFooter>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                {showDelete ? (
                  <Button
                    backgroundColor="#7a1a1a"
                    foregroundColor={MAIN_THEME.BLACK.color.foreground}
                    onClick={() => handleDelete()}
                  >
                    <span style={{ fontSize: "small", marginRight: "0.3rem" }}>
                      Confirm
                    </span>
                    <SVG {...deleteTrashcanForever} size="1.5rem" />
                  </Button>
                ) : (
                  <Button onClick={() => setShowDelete(true)}>
                    <SVG {...deleteTrashcan} size="1.5rem" />
                  </Button>
                )}
                <Button
                  backgroundColor="#1a1a1a"
                  onClick={() => {
                    setTitle(data.title)
                    setDescription(data.description)
                    setChildren(data.children)
                    setShowEditor(false)
                    setErrorMessage("")
                  }}
                >
                  <SVG {...block} size="1.5rem" />
                </Button>
                {(title !== data.title ||
                  description !== data.description ||
                  tags !== data.tags ||
                  !arraysEqual(children, data.children)) && (
                  <>
                    <Button
                      backgroundColor="#1a4a1a"
                      onClick={() => handleUpdate()}
                    >
                      <SVG {...done} size="1.5rem" />
                    </Button>
                  </>
                )}
              </EditorFooter>
            )}
          </ContentBox>

          {children && children.length > 0 && (searchValue !== "" || selected) && (
            <Toggle>
              <Label onClick={() => setShowChildren(!showChildren)}>
                Visa mer
              </Label>
              <ToggleSwitch
                size={22}
                backgroundColor={MAIN_THEME.PRIMARY.color.background}
                checked={showChildren}
                onClick={() => setShowChildren(!showChildren)}
              />
            </Toggle>
          )}
          {children &&
            children
              .filter(c => c !== undefined)
              .map(child => (
                <Wiki
                  key={child}
                  onFoundMatch={onFoundMatch}
                  theme={theme}
                  data={child}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  selected={selected}
                  setSelected={setSelected}
                  parentIsMatch={showChildren}
                  history={history}
                  setHistory={setHistory}
                  historyIndex={historyIndex}
                  setHistoryIndex={setHistoryIndex}
                  level={lvl}
                  crumbs={newCrumbs}
                />
              ))}
        </>
      )}
    </Wrapper>
  ) : children ? (
    children
      .filter(c => c !== undefined)
      .map(child => (
        <Wiki
          key={child}
          onFoundMatch={onFoundMatch}
          theme={theme}
          data={child}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          selected={selected}
          setSelected={setSelected}
          history={history}
          setHistory={setHistory}
          historyIndex={historyIndex}
          setHistoryIndex={setHistoryIndex}
          level={lvl}
          crumbs={newCrumbs}
        />
      ))
  ) : null
}

export default Wiki
