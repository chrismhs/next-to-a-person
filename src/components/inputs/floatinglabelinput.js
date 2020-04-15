import React from "react"
import styled from "styled-components"

const Container = styled.div`
  height: 80px;
  margin-bottom: 32px;
`

const FloatingLabelInput = styled.div`
  width: 100%;
`

const FloatingLabelInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  height: 2em;
  font-size: inherit;
  /* border-bottom: 1px solid #1d1e3e; */
`

const FloatingLabel = styled.label`
  padding: 10px 0;
  margin: 0;
  border: 0;
  position: absolute;
  color: #9b9b9b;
  bottom: 0;
  transition: all 0.2s ease-in-out;
  transform-origin: left top;
  font-size: 1em;
  cursor: text;
  pointer-events: none;
  width: 66.6%;
  transform: ${props =>
    props.active ? "translate3d(0, -40%, 0) scale(0.70)" : "none"};
`

const FloatingInput = styled.input`
  padding: 10px 0;
  margin: 0;
  border: none;
  outline: none;
  font-size: 1em;
  &::placeholder {
    color: #9b9b9b;
    opacity: ${props => (props.active ? 1 : 0)};
    transition: opacity 0.2s cubic-bezier(0.6, 0.04, 0.98, 0.335);
  }
`

const MeasuringBar = styled.div`
  width: 100%;
  height: 8px;
  margin-top: -12px;
`

export default class TextInput extends React.PureComponent {
  constructor(props) {
    super(props)
    if (!props.id && !props.name) {
      throw new Error("expected id but none present")
    }

    this.state = {
      active: props.value && props.value.length > 0,
    }

    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  onFocus(event) {
    this.setState({ active: true })
    if (this.props.onFocus) {
      this.props.onFocus(event)
    }
  }

  onBlur(event) {
    this.setState({ active: event.target.value.length !== 0 })
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  }

  render() {
    const {
      id,
      label,
      onBlur,
      onFocus,
      type,
      refs,
      className,
      ...otherProps
    } = this.props
    const { active } = this.state

    return (
      <Container>
        <FloatingLabelInput>
          <FloatingLabelInputContainer className={className}>
            <FloatingLabel className={className} htmlFor={id} active={active}>
              {label}
            </FloatingLabel>
            <FloatingInput
              active={active}
              className={className}
              id={id}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              ref={refs}
              type={type}
              {...otherProps}
            />
          </FloatingLabelInputContainer>
        </FloatingLabelInput>
        <MeasuringBar>
          <svg width="100%" height="8px">
            <defs>
              <pattern
                id="polka-dots"
                x="0"
                y="0"
                width="16"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0.5"
                  y1="2.18557e-08"
                  x2="0.5"
                  y2="8"
                  stroke="#1D1E3E"
                />
                <line
                  x1="4.5"
                  y1="2.18557e-08"
                  x2="4.5"
                  y2="5"
                  stroke="#1D1E3E"
                />
                <line
                  x1="8.5"
                  y1="2.18557e-08"
                  x2="8.5"
                  y2="5"
                  stroke="#1D1E3E"
                />
                <line
                  x1="12.5"
                  y1="2.18557e-08"
                  x2="12.5"
                  y2="5"
                  stroke="#1D1E3E"
                />
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#polka-dots)"
            />
          </svg>
        </MeasuringBar>
      </Container>
    )
  }
}
