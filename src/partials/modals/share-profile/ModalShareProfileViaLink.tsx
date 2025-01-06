import { KeenIcon } from '@/components'
import React from 'react'

const ModalShareProfileViaLink = () => {
  return (
    <div className="flex flex-col px-5 gap-2.5">
      <div className="flex flex-center gap-1">
        <label className="text-gray-900 font-semibold text-2sm">Share read-only link</label>
        <KeenIcon icon="information-2" className="text-gray-500 text-2sm" />
      </div>

      <label className="input">
        <input type="text" value="/ " onChange={() => {}} />
        <button className="btn btn-icon">
          <KeenIcon icon="copy" />
        </button>
      </label>
    </div>
  )
}

export { ModalShareProfileViaLink }
