import logo from './logo.svg';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'


let productList = [
  {name: "HD SSD 512 GB", price: 200, info: "HD SSD 512GB - NOVO - ScanDisk"},
  {name: "MacBook", price: 500, info: "Produto Apple"},
  {name: "Office", price: 300, info: "Produto Microsoft"}
];

class Product extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      qty: 0
    };

    //Eventos
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.showInfo = this.showInfo.bind(this);
  }

  add(){
    this.setState({
      qty: this.state.qty + 1
    });

    this.props.handleTotal(this.props.price)
  }

  remove(){
    this.setState({
      qty: this.state.qty -1
    });
    
    this.props.handleTotal(-this.props.price)
  }

  showInfo(){
    alert(this.props.info);
  }

  render(){
    return(
      <div>
        <div className='row form-group'>
          <div className='col-sm-10'>
            <h4>{this.props.name}: R${this.props.price}</h4>
          </div>
          <div className='col-sm-2 text-right'>
            Quantidade: {this.state.qty}
          </div>

          <div className='row btn-toolbar'>

            <div className='col-6'>
              <button className='btn btn-outline-primary'onClick={this.showInfo}>Informações</button>
            </div>

            <div className='col-6 text-right'>
              <button className="btn btn-outline-primary" onClick={this.add}>+</button>&nbsp;
              <button className="btn btn-outline-primary" onClick={this.remove} disabled={this.state.qty < 1}>-</button>
            </div>

          </div>
        </div>
        <hr/>
      </div>
    );
  }
}

class Total extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let subTotal = this.props.total;
    let iva = (this.props.total * 0.20);
    let total = (subTotal + iva).toFixed(2);
    return(
      <div style={{"marginTop" : "30px", "backgroundColor" : "#c0c0c0", "padding" : "10px"}}>
        <h3 className="row" style={{fontWeight: 400}}>
          <span className='col-6'>Sub-Total:</span>
          <span className='col06'>R$ {subTotal}</span>
        </h3>
        <h3 className="row" style={{fontWeight: 400}}>
          <span className='col-6'>Iva:</span>
          <span className='col06'>R$ {iva}</span>
        </h3>
        <h3 className="row" style={{fontWeight: 400}}>
          <span className='col-6'>Valor Total:</span>
          <span className='col06'>R$ {total}</span>
        </h3>

      </div>
    );
  }
}

class ProductList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      productList: "",
      total: 0
    };

    this.calculateTotal = this.calculateTotal.bind(this);
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({ productList : productList})
    }, 1000);
  }

  calculateTotal(price){
    this.setState({
      total: this.state.total + price
    });
  }

  render(){
      if (!this.state.productList) return <p>Carregando...</p>

      var component = this;
      var products = this.state.productList.map(function(product){
        return (
          <Product name={product.name}
          price={product.price}
          info={product.info}
          handleTotal={component.calculateTotal}/>
        );
      });

      return(
        <div>
        {products}
        <Total total={this.state.total}/>
        </div>
      );
  }
}

function App() {
  return (
    <div className='container'>
     <ProductList/>
    </div>
  );
}

export default App;
