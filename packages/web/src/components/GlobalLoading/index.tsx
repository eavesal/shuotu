import React, { useCallback, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

import styles from './index.module.css'
import Loading from '../Loading'

const LOADING_ROOT = document.getElementById('loading')!

type LoadingItems = string[]
enum ActionTypes {
  ON,
  OFF,
}
type Action = {
  type: ActionTypes
  payload: string
}

function reducer(state: LoadingItems, action: Action) {
  const i = state.indexOf(action.payload)
  switch (action.type) {
    case ActionTypes.ON:
      if (i >= 0) {
        return state
      } else {
        return [...state, action.payload]
      }
    case ActionTypes.OFF:
      if (i >= 0) {
        return [...state.slice(0, i), ...state.slice(i + 1)]
      } else {
        return state
      }
    default:
      return state
  }
}

export const LoadingContext = React.createContext({
  on(id: string) {},
  off(id: string) {},
})

interface GlobalLoadingProps {
  children?: React.ReactNode
}

const INITIAL_ARRAY = []

export default function GlobalLoading({ children }: GlobalLoadingProps) {
  const [state, dispatch] = useReducer(reducer, INITIAL_ARRAY)

  const on = useCallback((id: string) => {
    dispatch({
      type: ActionTypes.ON,
      payload: id,
    })
  }, [])
  const off = useCallback((id: string) => {
    dispatch({
      type: ActionTypes.OFF,
      payload: id,
    })
  }, [])

  return (
    <>
      {ReactDOM.createPortal(
        <AnimatePresence>
          {state.length > 0 && (
            <motion.div
              key="mask"
              className={styles.mask}
              initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
              animate={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
              exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                key="dialog"
                className={styles.main}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onMouseDown={e => e.stopPropagation()}
              >
                <Loading type="large" apperance="orange" className={styles.loading} />
                <div className={styles.text}>传送中，请耐心等待....</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        LOADING_ROOT,
      )}
      <LoadingContext.Provider value={{ on, off }}>{children}</LoadingContext.Provider>
    </>
  )
}
