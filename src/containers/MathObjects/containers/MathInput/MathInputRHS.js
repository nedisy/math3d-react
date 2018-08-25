// @flow
import React, { PureComponent } from 'react'
import MathInput from './components/MathInput'
import { connect } from 'react-redux'
import { setPropertyAndError } from 'containers/MathObjects/actions'
import { setError } from 'services/errors'
import { getErrors } from 'services/errors/selectors'
import { getMathObjectProp } from './selectors'
import type { Props } from './MathInputLHS'

/**
 * @module MathInputRHS defines a connected version of MathInput for right-hand-
 * side expressions.
 */

class MathInputRHS extends PureComponent<Props> {

  constructor(props) {
    super(props)
    // $FlowFixMe
    this.onValidatedTextChange = this.onValidatedTextChange.bind(this)
    // $FlowFixMe
    this.onValidatorAndErrorChange = this.onValidatorAndErrorChange.bind(this)
  }

  onValidatedTextChange(prop, latex, error) {
    const { parentId, type } = this.props
    this.props.onValidatedTextChange(parentId, type, prop, latex, error)
  }

  onValidatorAndErrorChange(prop, error) {
    const { parentId } = this.props
    this.props.onValidatorAndErrorChange(parentId, prop, error)
  }

  render() {

    const {
      onValidatorAndErrorChange,
      onValidatedTextChange,
      parentId,
      type,
      ...otherProps
    } = this.props

    return (
      <MathInput
        {...otherProps}
        onValidatedTextChange={this.onValidatedTextChange}
        onValidatorAndErrorChange={this.onValidatorAndErrorChange}
      />
    )
  }

}

const mapStateToProps = ( { mathGraphics, mathSymbols, parseErrors, evalErrors }, ownProps) => {
  const { parentId, field } = ownProps
  const errors = getErrors(parentId, parseErrors, evalErrors)
  return {
    type: getMathObjectProp( [mathGraphics, mathSymbols], parentId, 'type'),
    latex: ownProps.latex
      ? ownProps.latex
      : getMathObjectProp( [mathGraphics, mathSymbols], parentId, field),
    errorMsg: errors[field]
  }
}

const mapDispatchToProps = {
  onValidatedTextChange: setPropertyAndError,
  onValidatorAndErrorChange: setError
}

export default connect(mapStateToProps, mapDispatchToProps)(MathInputRHS)