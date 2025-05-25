import { createContext, useContext, useEffect, useReducer } from 'react';
import { User } from 'firebase/auth';

// @ts-ignore
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state: TAppState, action: TActions) => {
    switch (action.type) {
      case 'LOADING':
        return {
          ...state,
          isLoading: action.payload,
        };

      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
        };

      case 'START_GAME':
        return {
          ...state,
          time: 30,
          isStarted: true,
          isFinished: false,
        };

      case 'COUNTDOWN':
        return {
          ...state,
          time: state.time - 1,
        };

      case 'FINISH_GAME':
        return {
          ...state,
          isFinished: true,
          isStarted: false,
          score: action.payload.score,
        };

      default:
        return state;
    }
  }, defaultState);

  useEffect(() => {
    if (state.isStarted && state.time === 0) {
      dispatch({ type: 'FINISH_GAME', payload: { score: state.score } });
    }
  }, [state.time, state.isStarted]);

  const api: TAppApi = {
    setUser: (user: User | null) => {
      dispatch({ type: 'SET_USER', payload: user });
    },

    startGame: async () => {
      // dispatch({type: "LOADING", payload: true});
      //
      dispatch({ type: 'START_GAME' });
      //
      // dispatch({type: "LOADING", payload: false});
    },

    countdown: () => {
      dispatch({ type: 'COUNTDOWN' });
    },

    finishGame: (score: number) => {
      dispatch({ type: 'FINISH_GAME', payload: { score } });
    },
  };

  return <AppContext.Provider value={{ state, api }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};

type TActions =
  | {
      type: 'SET_USER';
      payload: User | null;
    }
  | {
      type: 'LOADING';
      payload: boolean;
    }
  | {
      type: 'START_GAME';
      // payload: TPlayer[]
    }
  | {
      type: 'FINISH_GAME';
      payload: { score: number };
    }
  | {
      type: 'COUNTDOWN';
    };

type TAppContext = {
  state: TAppState;
  api: TAppApi;
};

type TAppState = {
  user: User | null;
  isLoading: boolean;
  isStarted: boolean;
  isFinished: boolean;
  score: number;
  time: number;
};

type TAppApi = {
  setUser: (user: User | null) => void;
  startGame: () => void;
  countdown: () => void;
  finishGame: (score: number) => void;
};
const defaultState = {
  user: null,
  isLoading: false,
  isStarted: false,
  isFinished: false,
  score: 0,
  time: 30,
} satisfies TAppState;

const AppContext = createContext<TAppContext>({} as TAppContext);
