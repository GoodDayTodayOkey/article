const initialTabsState = {
  data: {
    tree: ['explorer', 'json'],
    modal: ['children', 'attributes'],
  }
}

const initialUsersState = {
  data: null
}

const users = (state = initialUsersState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const tabs = (state = initialTabsState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export { tabs, users }

