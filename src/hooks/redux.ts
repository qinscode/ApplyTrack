import type { AppDispatch, RootState } from '@/store'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux'

export const useDispatch = () => useReduxDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
