import preprocessMathQuill, { fracToDivision, convertSubscript } from './preprocessMathQuill'

describe('fracToDivision', () => {
  test('converts zero fractions correctly', () => {
    const input = 'a + b'
    const expected = 'a + b'
    expect(fracToDivision(input)).toBe(expected)
  } )

  test('converts a single fraction correctly', () => {
    const input = '1 + \\frac{1 + \\cos{x}}{1 - \\cos{x}}'
    const expected = '1 + {1 + \\cos{x}}/{1 - \\cos{x}}'
    expect(fracToDivision(input)).toBe(expected)
  } )

  test('converts multiple fractions correctly', () => {
    const input = 'x + \\frac{a + \\frac{b + c}{d - e}}{f + g}'
    const expected = 'x + {a + {b + c}/{d - e}}/{f + g}'
    expect(fracToDivision(input)).toBe(expected)
  } )
} )

describe('convertSubscript', () => {
  test('does nothing to single character subscripts', () => {
    const input = 'x_1 + x_2'
    const expected = 'x_1 + x_2'
    expect(convertSubscript(input)).toBe(expected)
  } )

  test('converts multi-character subscripts', () => {
    const input = 'x_{12foo} + y_{bar123}'
    const expected = 'x_12foo + y_bar123'
    expect(convertSubscript(input)).toBe(expected)
  } )

  test('converts nested subscripts', () => {
    const input = 'x_{12foo_{bar123_{evenlower}}}'
    const expected = 'x_12foo_bar123_evenlower'
    expect(convertSubscript(input)).toBe(expected)
  } )
} )

describe('preprocessMathQuill', () => {
  test('fractions converted', () => {
    const input = 'a + \\frac{b + \\frac{c+d}{e+f}}{g+h}'
    const expected = 'a + (b + (c+d)/(e+f))/(g+h)'
    expect(preprocessMathQuill(input)).toBe(expected)
  } )

  test('backslashes are removed', () => {
    const input = '1 + 3\\sin{\\pi x}'
    const expected = '1 + 3 sin( pi x)'
    expect(preprocessMathQuill(input)).toBe(expected)
  } )

  test('multi-character subscripts converted', () => {
    const input = 'x_{12}'
    const expected = 'x_12'
    expect(preprocessMathQuill(input)).toBe(expected)
  } )

  test('nested subscripts converted', () => {
    const input = 'x_{12foo_{bar123_{evenlower}}}'
    const expected = 'x_12foo_bar123_evenlower'
    expect(preprocessMathQuill(input)).toBe(expected)
  } )

  test('integral converted', () => {
    const input = '\\int _0^1xdx'
    const expected = ' integrate( x, 0, 1, x)'
    expect(preprocessMathQuill(input)).toBe(expected)
  })

  test('implicit integrand', () => {
    const input = '\\int _0^1dx'
    const expected = ' integrate( 1, 0, 1, x)'
    expect(preprocessMathQuill(input)).toBe(expected)
  })

  test('integral with dot symbol converted', () => {
    const input = '\\int _0^xx\\cdot udu'
    const expected = ' integrate( x *  u, 0, x, u)'
    expect(preprocessMathQuill(input)).toBe(expected)
  })

  test('integral with norm converted', () => {
    const input = '\\int _0^1\\left|u\\right|du'
    const expected = ' integrate( norm(u), 0, 1, u)'
    expect(preprocessMathQuill(input)).toBe(expected)
  })

  test('edge case integral ddd converted', () => {
    const input = '\\int _0^1ddd'
    const expected = ' integrate( d, 0, 1, d)'
    expect(preprocessMathQuill(input)).toBe(expected)
  })

  test('nested integral converted', () => {
    const input = '5 + \\int_0^{\\alpha}2\\int_{\\beta}^1xd\\gamma d\\eta'
    const expected = '5 +  integrate( 2 integrate( x, ( beta), 1,  gamma) , 0, ( alpha),  eta)'
    expect(preprocessMathQuill(input)).toBe(expected)
  })
} )
