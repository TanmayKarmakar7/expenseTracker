import React from 'react'

const ContextMenu = ({contextPosition, setContextPosition, setExpenses, rowId, setExpense, expenses, setEditingRowId}) => {
  if(!contextPosition.left) return
  return (
    <div className="context-menu" style={contextPosition}>
        <div onClick={() => {
          
          setContextPosition({})
          setEditingRowId(rowId)

          const foundExp = expenses.find((exp) => exp.id === rowId)        
                    
          setExpense(foundExp)

        }}>Edit</div>
        <div onClick={() => {

          setContextPosition({})
          setExpenses((prevState) => prevState.filter(expense => expense.id !== rowId))


        }}>Delete</div>
    </div>
  )
}

export default ContextMenu
