
import { useState } from 'react';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  function handleSubmit(event) {
    event.preventDefault();

    const parsedAmount = Number(amount);

    if (!description.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      alert('Enter a description and a valid amount greater than zero.');
      return;
    }

    const newExpense = {
      id: crypto.randomUUID(),
      description: description.trim(),
      amount: Math.round(parsedAmount * 100) / 100,
      category,
      date: new Date().toLocaleDateString()
    };

    setExpenses((current) => [newExpense, ...current]);
    setDescription('');
    setAmount('');
  }

  return (
    <main style={{
      maxWidth: '800px',
      margin: '40px auto',
      padding: '24px',
      fontFamily: 'Arial, sans-serif',
      color: '#1f2937'
    }}>
      <h1>MERN Expense Tracker</h1>
      <p>Track your spending in one place.</p>

      <section style={{
        background: '#eff6ff',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '24px'
      }}>
        <p>Total expenses</p>
        <h2>₹{total.toFixed(2)}</h2>
        <p>{expenses.length} expense(s) recorded in this session</p>
      </section>

      <section>
        <h2>Add an expense</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="description">Description</label>
            <br />
            <input
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="e.g. Lunch"
              maxLength={100}
              required
              style={{ padding: '10px', width: '100%', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="amount">Amount (₹)</label>
            <br />
            <input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="e.g. 150"
              required
              style={{ padding: '10px', width: '100%', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="category">Category</label>
            <br />
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              style={{ padding: '10px', width: '100%' }}
            >
              <option value="food">Food</option>
              <option value="transportation">Transportation</option>
              <option value="entertainment">Entertainment</option>
              <option value="shopping">Shopping</option>
              <option value="bills">Bills</option>
              <option value="healthcare">Healthcare</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" style={{
            padding: '12px 18px',
            background: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Add expense
          </button>
        </form>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>Recent expenses</h2>

        {expenses.length === 0 ? (
          <p>No expenses yet. Add your first expense above.</p>
        ) : (
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {expenses.map((expense) => (
              <li
                key={expense.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: '14px 0',
                  borderBottom: '1px solid #e5e7eb'
                }}
              >
                <div>
                  <strong>{expense.description}</strong>
                  <div style={{ color: '#6b7280', fontSize: '14px' }}>
                    {expense.category} · {expense.date}
                  </div>
                </div>
                <strong>₹{expense.amount.toFixed(2)}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
