import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  todos: [],
  patchData: null
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_TODOS:
      return {
        ...state,
        loading: true
      };

    case actionTypes.GET_ALL_TODOS_SUCCESS: {
      const todos = action.payload;

      return {
        ...state,
        todos,
        loading: false
      };
    };

    case actionTypes.CREATE_TODO:
      return {
        ...state,
        loading: true
      };

    case actionTypes.CREATE_TODO_SUCCESS: {
      const newTodo = action.payload;

      return {
        ...state,
        todos: [...state.todos, newTodo],
        loading: false
      };
    };

    case actionTypes.PATCH_TODO:
      return {
        ...state,
        loading: true
      };

    case actionTypes.PATCH_TODO_SUCCESS: {
      const updatedTodo = action.payload;

      return {
        ...state,
        todos: state.todos.map(el => {
          return el._id === updatedTodo._id ? updatedTodo : el
        }),
        loading: false
      };
    };

    case actionTypes.DELETE_TODO:
      return {
        ...state,
        loading: true
      };

    case actionTypes.DELETE_TODO_SUCCESS: {
      const removedId = action.payload;

      return {
        ...state,
        loading: false,
        todos: state.todos.filter(({ _id }) => _id !== removedId)
      };
    };

    case actionTypes.DELETE_ALL_TODOS:
      return {
        ...state,
        loading: true
      };

    case actionTypes.DELETE_ALL_TODOS_SUCCESS: {
      return {
        ...state,
        loading: false,
        todos: []
      };
    };
    
    case actionTypes.SET_PATCH_ON: {
      const patchData = action.payload;

      return {
        ...state,
        patchData
      };
    };
    
    case actionTypes.SET_PATCH_OFF: 
      return {
        ...state,
        patchData: null
      };
    
    case actionTypes.STOP_LOADER: 
      return {
        ...state,
        loading: false
      };


    default:
      return state;
  };
};

export default todosReducer;
