import React from 'react'
import { SyncLoader } from 'react-spinners'

export default function Carregando() {
  return (
    <div className="flex justify-center items-center min-h-screen">
    <SyncLoader size={60} color="#F59E0B" />
  </div>
  )
}
