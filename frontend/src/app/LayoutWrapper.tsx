'use client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/store'
import BookLoader from '@/lib/BookLoader'
import { Toaster } from 'react-hot-toast'

// LayoutWrapper component to wrap the application with Redux and PersistGate

export default function LayoutWrapper({children}: {children: React.ReactNode}) {
  return (
	<Provider store={store}>
		<PersistGate loading={<BookLoader/>} persistor={persistor}>
			<Toaster />
				{/* Render children components */}
				{children}

		</PersistGate>
	</Provider>
  )
};
