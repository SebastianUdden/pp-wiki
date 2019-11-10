import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import { ToggleSwitch, Chips, Table } from "project-pillow-components"
import { DP_TYPES, MAIN_THEME } from "../../constants/theme"
import { Toggle, Label } from "../main"
import Heading from "./Heading"
import { MEDIA_MIN_MEDIUM } from "../../constants/sizes"
import Breadcrumbs from "./Breadcrumbs"

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
const P = styled.p`
  margin: 0;
  padding-bottom: 0.5rem;
`

const A = styled.a`
  color: ${MAIN_THEME.PRIMARY.color.background};
  font-weight: 800;
  text-decoration: none;
  :hover {
    color: brown;
  }
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
      data.tags.find(tag =>
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
  //   useEffect(() => {
  //     setTimeout(() => {
  //       setCreated(true)
  //     }, 100)
  //   }, [])

  return isSelectedMatch || isSearchMatch || parentIsMatch ? (
    <Wrapper toggleStyle={toggleStyle} created={created}>
      {data && (
        <>
          <Heading
            level={lvl}
            primaryColor={MAIN_THEME.PRIMARY.color.background}
          >
            {data.title}
          </Heading>
          {newCrumbs.length > 1 && (
            <Breadcrumbs crumbs={newCrumbs} setSelected={setSelected} />
          )}
          {data.tags && (
            <Chips
              chips={data.tags.map(t => ({ title: t }))}
              onChange={value => value[0] && setSearchValue(value[0])}
            />
          )}
          {data.description && <P>{data.description}</P>}
          {data.link && (
            <A href={data.link.href} target="_blank">
              {data.link.title}
            </A>
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
