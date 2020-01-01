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
import Diff from "./Diff"
import { useWiki } from "../../contexts/WikiContext"
import { arraysEqual } from "./utils"

const Wrapper = styled.div`
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

const ButtonWrapper = styled.div`
  display: inline-block;
  margin: 0.5rem 0;
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
  toggleStyle = true,
  data: dataProps,
  level,
  crumbs = [],
}) => {
  const { wikiEntries, setWikiEntries } = useWiki()
  const id = (dataProps && dataProps._id) || dataProps
  const data = wikiEntries.find(entry => entry._id === id)
  if (!data) return null
  const [hide, setHide] = useState(false)
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
  const [showChildren, setShowChildren] = useState(data.showChildren)
  const newCrumbs = [...crumbs, { _id: data._id, title: data.title }]

  if (isMatch) {
    onFoundMatch(true)
  }

  if (hide) return null
  return isMatch ? (
    <Wrapper toggleStyle={toggleStyle}>
      {data && (
        <>
          {showCreate && <NewItem onHide={() => setShowCreate(false)} />}
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
              crumbs={newCrumbs}
              onChange={value => setSelected(value.title)}
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
                <MarkdownParser markdown={description} highlight={highlight} />
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
              <ButtonWrapper>
                <ContainedButton
                  foregroundColor={MAIN_THEME.BLACK.color.foreground}
                  onClick={() => setShowDelete(false)}
                >
                  Cancel
                </ContainedButton>
              </ButtonWrapper>
              <ButtonWrapper>
                <ContainedButton
                  backgroundColor={ALTERNATE_THEME_COLORS.ERROR_TEXT_COLOR}
                  foregroundColor={MAIN_THEME.BLACK.color.foreground}
                  onClick={() => {
                    remove(`${apiUrl}/wikis/${data._id}`, "Unauthorized").then(
                      response => {
                        console.log({ response })
                        const newEntries = wikiEntries
                          .filter(entry => entry._id !== data._id)
                          .map(entry => ({
                            ...entry,
                            children:
                              entry.children &&
                              entry.children.filter(c => c !== data._id),
                          }))
                        setWikiEntries(newEntries)
                        setHide(true)
                      }
                    )
                  }}
                >
                  Delete
                </ContainedButton>
              </ButtonWrapper>
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
                      showEditor
                        ? setChildren(children.filter(c => c !== value._id))
                        : setSelected(value.title)
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
          {title !== data.title && <span>Title DIFF</span>}
          {description !== data.description && <span>Description DIFF</span>}
          {tags !== data.tags && <span>Tags DIFF</span>}
          {!arraysEqual(children, data.children) && (
            <span>
              Children DIFF: {JSON.stringify(children)} !=={" "}
              {JSON.stringify(data.children)}
            </span>
          )}
          {!showDelete &&
            (title !== data.title ||
              description !== data.description ||
              tags !== data.tags ||
              !arraysEqual(children, data.children)) && (
              <>
                <ButtonWrapper>
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
                </ButtonWrapper>
                <ButtonWrapper>
                  <ContainedButton
                    backgroundColor={MAIN_THEME.PRIMARY.color.background}
                    onClick={() => {
                      const { _id, ...dataProps } = data
                      const updateData = {
                        ...dataProps,
                        title: title || data.title,
                        description: description || data.description,
                        tags: tags || data.tags,
                        children: children ? children.filter(Boolean) : [],
                      }
                      update(
                        `${apiUrl}/wikis/${_id}`,
                        updateData,
                        "Unauthorized"
                      ).then(response => {
                        console.log({ response })
                        const index = wikiEntries.findIndex(
                          entry => entry._id === data._id
                        )
                        const newWikiEntries = [...wikiEntries]
                        newWikiEntries[index] = {
                          _id,
                          ...updateData,
                        }
                        setWikiEntries(newWikiEntries)
                        setShowEditor(false)
                      })
                    }}
                  >
                    Update
                  </ContainedButton>
                </ButtonWrapper>
              </>
            )}
          {children && children.length > 0 && (searchValue !== "" || selected) && (
            <Toggle>
              <ToggleSwitch
                backgroundColor={MAIN_THEME.PRIMARY.color.background}
                checked={showChildren}
                onClick={() => setShowChildren(!showChildren)}
              />
              <Label onClick={() => setShowChildren(!showChildren)}>
                Visa mer
              </Label>
            </Toggle>
          )}
          {children &&
            children
              .filter(c => c !== undefined)
              .map(child => (
                <Wiki
                  key={child}
                  onFoundMatch={onFoundMatch}
                  toggleStyle={toggleStyle}
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
          toggleStyle={toggleStyle}
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
