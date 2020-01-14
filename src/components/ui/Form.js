import React, { PureComponent } from "react"
import styled from "styled-components"
import Input from "./Input"

const Subtitle = styled.label`
  text-align: center;
  margin: 1rem 0;
`

const FieldsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

class Form extends PureComponent {
  inputRefs = []

  constructor(props) {
    super(props)
    this.inputRefs = props.formFields.map(() => React.createRef())
  }

  validate = () =>
    this.inputRefs.reduce((isValid, ref) => {
      const c = ref.current
      if (c.validate()) {
        this.props.setFieldValue(
          c.props.field.fieldName,
          ref.current.state.value
        )
        return isValid
      }
      return false
    }, true)

  render() {
    const { section, title, formFields, setFieldValue } = this.props

    return (
      <>
        <Subtitle section={section}>{title}</Subtitle>
        <FieldsWrapper>
          {formFields &&
            formFields.map((field, index) => (
              <Input
                ref={this.inputRefs[index]}
                section={section}
                field={field}
                onValue={value => {
                  setFieldValue(field.fieldName, value)
                }}
              />
            ))}
        </FieldsWrapper>
      </>
    )
  }
}

export default Form
