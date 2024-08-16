import TransitionPage from '../components/TransitionPage'
import Petitions from '../components/Petitions'
import React from 'react'
import AddPetition from '../components/AddPetition'

interface IHomePageProps {
  addRef: React.RefObject<HTMLDivElement>
}

const HomePage:React.FC<IHomePageProps> = ({addRef}) => {
  return (
    <TransitionPage>
        <Petitions/>
        <div ref={addRef}>
          <AddPetition/>
        </div>
    </TransitionPage>
  )
}

export default HomePage