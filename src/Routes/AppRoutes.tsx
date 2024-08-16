import React, { lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom'
import AdminRoute from './AdminRoute';
import AddAdminForm from '../components/AddAdminForm';
import PetitionPage from '../pages/PetitionPage';

const Auth = lazy(()=>import('../components/Auth'))
const HomePage = lazy(()=>import('../pages/HomePage'))
const AdminPage = lazy(()=>import('../pages/AdminPage'))
const SinglePetitionPage = lazy(()=>import('../pages/SinglePetitionPage'))
const SinglePetitionAdminPage = lazy(()=>import('../pages/SinglePetitionAdminPage'))


interface IAppRouteProps {
    addRef: React.RefObject<HTMLDivElement>
}

const AppRoutes:React.FC<IAppRouteProps> = ({addRef}) => {
    const location = useLocation();
    return (
        <AnimatePresence mode='wait'>
            <Routes key={location.pathname} location={location}>
                <Route index element={
                    <HomePage addRef = {addRef}/>
                }/>
                <Route path='petition/:id' element={<SinglePetitionPage/>}/>
                <Route path='auth_admin' element={<Auth/>}/>
                <Route path='petition' element={<PetitionPage/>}/>

                <Route path='admin' element={
                    <AdminRoute>
                        <AdminPage/>
                    </AdminRoute>
                }/>

                <Route path='admin/petition-admin/:id' element={
                    <AdminRoute>
                        <SinglePetitionAdminPage/>
                    </AdminRoute>
                }/>
                <Route path='admin/add_admin' element={
                    <AdminRoute>
                        <AddAdminForm/>
                    </AdminRoute>
                }/>

            </Routes>
        </AnimatePresence>
    )
}

export default AppRoutes