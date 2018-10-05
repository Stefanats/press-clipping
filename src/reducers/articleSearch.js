const initialState = {
  period: {
    from: "from",
    to: "to"
  },
  pressType: "presstye",
  publisher: 'publisher',
  edition: "edition",
  keywordArray: ["jedan", "dva"]
}

const reducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case "SET_FROM":
      newState.period.from = action.from
      return newState
    case "SET_TO":
      newState.period.to = action.to
      return newState
    case "SET_PRESSTYPE":
      newState.pressType = action.pressType
      return newState
    case "SET_PUBLISHER":
      newState.publisher = action.publisher
      return newState
    default:
      return newState
  }
}

export default reducer;