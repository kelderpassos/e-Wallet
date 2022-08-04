import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Table() {
  const { expenses } = useSelector(({wallet}) => wallet);
  console.log(expenses);

  return (
    <div>
      <table>
        <colgroup span="4" />
        <tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </tbody>
        {expenses.map((expense) => (
          <tbody key={expense.id}>
            <tr>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>
                {
                Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
              }
              </td>
              <td>
                {
                expense.exchangeRates[expense.currency].name
              }
              </td>
              <td>
                {
                (expense.exchangeRates[expense.currency].ask * Number(expense.value))
                  .toFixed(2)
              }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  onClick={() => dispatch(actionEditExpenses(expense.id))}
                  data-testid="edit-btn"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(actionRemoveExpenses(expense.id))}
                  data-testid="delete-btn"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default Table;
