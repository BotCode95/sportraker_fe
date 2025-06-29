import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

interface Props {
	redirectTo?: string
}

export const ProtectedRoute = ({ redirectTo = '/' }: Props) => {
	const { status, isLoading } = useContext(UserContext)

	if (isLoading) {
		return <div>Cargando...</div>
	}
	if (status !== 'AUTHENTICATED') {
		return <Navigate to={redirectTo} />
	}
	return <Outlet />
}
