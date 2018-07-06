export const countShouldFetchData = (props, prevProps) => {
  const { line, bar } = props

  if (line.brush && line.brush.length) {
    if (!prevProps.line.brush) {
      return true
    } else if (
      prevProps.line.brush &&
      (line.brush[0] !== prevProps.line.brush[0] ||
        line.brush[1] !== prevProps.line.brush[1])
    ) {
      return true
    }
  }

  if (
    prevProps.bar.selected.key0 !== bar.selected.key0 ||
    prevProps.bar.selected.key1 !== bar.selected.key1
  ) {
    return true
  }

  return false
}

export const lineShouldFetchData = (props, prevProps) => {
  const { bar: { selected } } = props
  const { key0, key1 } = selected

  if (key0 !== prevProps.bar.selected.key0 || key1 !== prevProps.bar.selected.key1) {
    return true
  }

  return false
}
