import React, { useState } from 'react'

const ExpenseForm = ({ setExpenses, expense, setExpense, editingRowId, setEditingRowId }) => {
    

    const addExpense = (e) => {
        e.preventDefault()

        if(editingRowId){
            setExpenses((prevState) =>
                prevState.map((exp) => {
                    if(exp.id === editingRowId){
                        return {...expense, id: editingRowId}   
                    }
                    return exp
                })
            )
            setExpense({ 
                title: '',
                category: '',
                amount: '',
            })
            setEditingRowId('')
            return
        }


        if(expense.title != '' && expense.category != '' && expense.amount != ''){
    
            setExpenses((prevState) => [...prevState, {...expense, id: crypto.randomUUID()}])
            
        }

        setExpense({ 
            title: '',
            category: '',
            amount: '',
        })
    }

  return (
    <form className="expense-form" onSubmit={addExpense}>
        <div className="input-container">
            <label htmlFor="title">Title</label>
            <input id="title" name='title' value={expense.title} onChange={(e) => setExpense((prevState) => ({...prevState, title: e.target.value}))} />
        </div>
        <div className="input-container">
            <label htmlFor="category">Category</label>
            <select id='category' name='category' value={expense.category} onChange={(e) => setExpense((prevState) => ({...prevState, category: e.target.value}))}>
                <option value="" hidden>Select Category</option>
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
            
        </div>
        <div className="input-container">
            <label htmlFor="amount">Amount</label>
            <input type='number' id="amount" name='amount' value={expense.amount} onChange={(e) => setExpense((prevState) => ({...prevState, amount: e.target.value}))} />
        </div>
        <button className="add-btn">{editingRowId ? 'Save' : 'Add'}</button>
    </form>
  )
}


export default ExpenseForm