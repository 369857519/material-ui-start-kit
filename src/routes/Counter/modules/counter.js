// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const TABLE_ASYNC='TABLE_ASYNC'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

export const tableAsync=()=>{
	return (dispatch,getState)=>{
		setTimeout(()=>{
			dispatch({
				tableData:[
				  {
				    name: 'John Smith',
				    status: 'Employed',
				    selected: true,
				  },
				  {
				    name: 'Randal White',
				    status: 'Unemployed',
				  }
				],
				type:TABLE_ASYNC
			})
		})
	}
}

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().counter.num))
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  increment,
  doubleAsync,
  tableAsync
}



// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT] : (state, action) => Object.assign({},state,{num:state.num + action.payload}),
  [TABLE_ASYNC]:(state, action) => {
  	// {...state,{tableData:action.tableData}}
  	return Object.assign({},state,{tableData:action.tableData})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	num:0,
	tableData:[]
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
