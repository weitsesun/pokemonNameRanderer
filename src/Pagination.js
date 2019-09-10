import React from 'react'

export default function Pagination({ gotoPreviousPage, gotoNextPage }) {
  return (
    <div className="button_box">
      {gotoPreviousPage && <button onClick={gotoPreviousPage}>Previous</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  )
}
