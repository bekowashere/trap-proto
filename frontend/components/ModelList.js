import React from 'react'
import ModelDetail from './ModelDetail'

function ModelList({ models, brand_name }) {
  return (
    <div className="mt-5 mb-5 space-y-2">
      {models.map((model) => (
        <ModelDetail key={model.id} model_element={model} brand_name={brand_name} />
      ))}
    </div>
  )
}

export default ModelList
