const initialState = { tasks: [], totalTasks: 0 };
import {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK,
  CALCULATE_TOTAL_TASKS,
} from "./actions.js";

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, completed: false }],
      };

    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };

    case TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    case CALCULATE_TOTAL_TASKS:
      return {
        ...state,
        totalTasks: state.tasks.length,
      };

    default:
      return state;
  }
};

export default taskReducer;
