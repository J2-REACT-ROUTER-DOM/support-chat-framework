import React from 'react'
import type { Route } from './+types/product'

export const loader =async ({params}:Route.LoaderArgs)=>{
    const {name} = params
    console.log(name)
    return {name: name.toUpperCase()}
}


const Product = ({loaderData}:Route.ComponentProps) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Details</h1>
        <div className="text-xl text-gray-600">
          Name: <span className="font-semibold text-blue-600">{loaderData.name}</span>
        </div>
      </div>
    </div>
  )
}

export default Product