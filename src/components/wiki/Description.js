import React from "react"
import styled from "styled-components"

const Wrapper = styled.p`
  white-space: ${p => (p.summary ? "inherit" : "pre-wrap")};
`

const Link = styled.a`
  color: ${p => p.linkColor};
  text-decoration: none;
  margin-left: ${p => (p.marginLeft ? "0.3rem" : "inherit")};
  margin-right: ${p => (p.marginRight ? "0.3rem" : "inherit")};
`

const Description = ({ description, summary, linkColor = "orange" }) => {
  const linkRegexp = /\[(.+)\]\(([^ ]+?)( "(.+)")?\)/gm
  const desc =
    summary && description.length > 79
      ? `${description.substring(0, 80)}...`
      : description
  const splitDesc = desc.split(linkRegexp).filter(d => d)
  return (
    <Wrapper summary={summary}>
      {splitDesc.map((d, i) => {
        if (d.startsWith("http")) {
          return (
            <Link
              href={d}
              rel="noopener noreferer"
              target="_blank"
              linkColor={linkColor}
            >
              {splitDesc[i - 1]}
            </Link>
          )
        } else if (splitDesc[i + 1] && splitDesc[i + 1].startsWith("http")) {
          return ""
        } else {
          return <span>{d}</span>
        }
      })}
    </Wrapper>
  )
}

export default Description
