import React from 'react';
import './moneycard.css';

interface MoneyCardInterface {
  title: string,
  date: Date,
  amount: number
}

const MoneyCard: React.FC<MoneyCardInterface> = ({ title, date, amount }) => {
// function MoneyCard(props:MoneyCardInterface){
  return (
    <div className="moneycard-container">
      <div className="moneycard-left-details-container">
        <p className="moneycard-expense-title">{title}</p>
        <p className="moneycard-expense-date">{date.toString()}</p>
      </div>
      <div className="moneycard-right-details-container">
        <p className="moneycard-expense-amount">{amount}</p>
      </div>
    </div>
  )
};

export default MoneyCard;
