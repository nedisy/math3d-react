import { MathScopeProvider } from './components/MathScopeContext'
import { connect } from 'react-redux'
import { getParseableSymbols } from './selectors'
import { setError } from 'services/errors'

const mapStateToProps = ( { mathSymbols, sliderValues, parseErrors }, ownProps) => {
  const { symbols, idsByName } = getParseableSymbols(mathSymbols, sliderValues, parseErrors)
  const evaluationResult = ownProps.scopeEvaluator.evalScope(symbols)
  return {
    idsByName,
    ...evaluationResult
  }
}

const mapDispatchToProps = { setError }

export default connect(mapStateToProps, mapDispatchToProps)(MathScopeProvider)
