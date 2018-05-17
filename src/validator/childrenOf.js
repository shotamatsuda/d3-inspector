// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import PropTypes from 'prop-types'

export default function childrenOf (...types) {
  const fieldType = PropTypes.shape({
    type: PropTypes.oneOf(types)
  })
  return PropTypes.oneOfType([
    fieldType,
    PropTypes.arrayOf(fieldType)
  ])
}
