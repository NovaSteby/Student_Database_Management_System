import React from 'react'
import ResponsiveAppBar from './components/ResponsiveAppBar'  
import LoginPage from './components/LoginPage'
import {  Routes , Route } from 'react-router-dom'
import DataTable from './components/ViewStudents'



const App = () => {
  return (
  <div>
    <ResponsiveAppBar />
 
    <Routes>

    <Route path="/add-student" element={<LoginPage />} />
    <Route path="/view" element={< DataTable />} />
    <Route path="/i" element={<LoginPage />} />
    

    </Routes>
  
    

     
</div>
  )
}

export default App
