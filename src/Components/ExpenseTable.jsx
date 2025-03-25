import React, { useState } from 'react'
import { useFilter } from '../hooks/useFilter'
import ContextMenu from './ContextMenu'

const ExpenseTable = ({ expenses, setExpenses, setExpense, setEditingRowId }) => {

  const [filteredData, setFilteredData] = useFilter(expenses)
  const [contextPosition, setContextPosition] = useState({})
  const [rowId, setRowId] = useState('')

  const total = filteredData.reduce((accumulator, current) => Number(accumulator) + Number(current.amount), 0)
  
  return (
    <>
      <ContextMenu contextPosition={contextPosition} setContextPosition={setContextPosition} setExpenses={setExpenses} rowId={rowId} setExpense={setExpense} expenses={expenses} setEditingRowId={setEditingRowId} />
      <table className="expense-table" onClick={() => {
        if(contextPosition.left){
          setContextPosition({})
        }
      }}>
          <thead>
            <tr>
              <th className='title'>Title</th>
              <th className='category'>
                  <select onChange={(e) => setFilteredData(e.target.value.toLowerCase())}>
                      <option value="">All</option>
                      <option value="Food">Food</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Education">Education</option>
                      <option value="Miscellaneous">Miscellaneous</option>
                      <option value="Others">Others</option>
                  </select>
              </th>
              <th className="amount-column">
                <div>
                    <span>Amount</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 384 512"
                      className="arrow up-arrow"
                      onClick={() => {
                        setExpenses((prevState) => [...prevState.sort((a, b) => a.amount - b.amount)])
                      }}
                    >
                      <title>Ascending</title>
                      <path
                        d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      viewBox="0 0 384 512"
                      className="arrow down-arrow"
                      onClick={() => {
                        setExpenses((prevState) => [...prevState.sort((a, b) => b.amount - a.amount)])
                      }}
                    >
                      <title>Descending</title>
                      <path
                        d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                      />
                    </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
              {filteredData.map(({id, title, category, amount}) => {
                    return <tr key={id} onContextMenu={(e) => {
                      e.preventDefault()

                      setContextPosition({left: e.clientX, top: e.clientY})
                      setRowId(id)
                    }}>
                      <td>{title.charAt(0).toUpperCase() + title.slice(1)}</td>
                      <td>{category.charAt(0).toUpperCase() + category.slice(1)}</td>
                      <td>₹{amount}</td>
                  </tr>
              })}
              <tr className='total-tr'>
                <th>Total</th>
                <th></th>
                <th>₹{total}</th>
              </tr>
          </tbody>
      </table>
    </>
  )
}

export default ExpenseTable
