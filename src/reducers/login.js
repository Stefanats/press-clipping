const initialState = {
  login: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        login: true
      }
    case "LOGOUT":
      return {
        login: false
      }
    default: 
      return {
        login: state.login
      }
  }
}

export default reducer;