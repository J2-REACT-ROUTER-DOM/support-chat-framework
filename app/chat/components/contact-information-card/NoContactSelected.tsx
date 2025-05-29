import React from 'react'

export const NoContactSelected = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 text-center text-muted-foreground">
      <div className="mb-4">
        <div className="h-20 w-20 rounded-full bg-muted/20 flex items-center justify-center">
          <svg className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>
      <h3 className="text-lg font-medium mb-2">No hay contacto seleccionado</h3>
      <p className="text-sm">
        Selecciona un contacto de la lista para ver sus detalles y comenzar una conversación
      </p>
    </div>
  )
}