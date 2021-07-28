import React from 'react';
import { createServer, Model } from 'miragejs';
import ReactDOM from 'react-dom';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Desenvolvimento de app',
          type: 'deposit',
          category: 'Development',
          amount: 12800,
          createdAt: new Date('2021-04-29'),
        },
        {
          id: 2,
          title: 'Parcela carro',
          type: 'withdraw',
          category: 'Carro',
          amount: 1230.88,
          createdAt: new Date('2021-05-10'),
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      
      return schema.create('transactions', data)
    })

  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
