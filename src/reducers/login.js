const initialState = {
  login: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return ({
        login: true,
        user: action.user
      })
    case "LOGOUT":
      return {
        login: false
      }
    default: 
      return {
        login: state.login,
        user: state.user
      }
  }
}

export default reducer;