const initialState = {
  login: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return ({
        login: true,
        user: action.user,
        rola: action.rola,
        id: action.id
      })
    case "LOGOUT":
      return {
        login: false
      }
    default:
      return {
        login: state.login,
        user: state.user,
        rola: state.rola,
        id: state.id
      }
  }
}

export default reducer;