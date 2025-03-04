import React, { Component } from 'react';
import UserLayout from '../../hoc/user';
import UserProductBlock from '../utils/User/product_block';
import MyButton from '../utils/button';
import { connect } from 'react-redux';
import { getCartItems, removeCartItem } from '../../actions/user_actions';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'
import Paypal from '../utils/paypal';
class UserCart extends Component {

    state = {
        loading: true,
        total:0,
        showTotal: false,
        showSuccess: false,
    }

    componentDidMount(){
        let cartItems = [];
        let user = this.props.user;

        if(user.userData.cart){
            if(user.userData.cart.length > 0){
                user.userData.cart.forEach(item=>{
                    cartItems.push(item.id)
                });
                this.props.dispatch(getCartItems(cartItems,user.userData.cart))
                .then(()=>{
                    if(this.props.user.cartDetail.length > 0){
                        this.calculateTotal(this.props.user.cartDetail);
                    }
                })
            }
        }
    }

    calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.forEach(item=>{
            // total += parseInt(item.amount, 10) * item.quantity
            total += 1
        });

        this.setState({
            total,
            showTotal: true
        });
    }


    removeFromCart = (id) => {
        this.props.dispatch(removeCartItem(id))
        .then(()=>{
            if(this.props.user.cartDetail.length <= 0){
                this.setState({
                    showTotal: false
                })
            } else{
                this.calculateTotal(this.props.user.cartDetail)
            }
        })
    }

    showNoItemMessage = () =>(
        <div className="cart_no_items">
            <FontAwesomeIcon icon={faFrown}/>
            <div>
                You have no items
            </div>
        </div>
    )


    render() {
        return (
            <UserLayout>
                <div>
                    <h1>My cart</h1>
                    <div className="user_cart">
                        <UserProductBlock
                            products={this.props.user}
                            type="cart"
                            removeItem={(id)=> this.removeFromCart(id)}
                        />
                        { this.state.showTotal ?
                            <div>
                                <div className="user_cart_sum">
                                    <div>
                                        Total amount: $ {this.state.total}
                                    </div>
                                </div>
                            </div>
                            
                        :
                            this.state.showSuccess ?
                                <div className="cart_success">
                                    <FontAwesomeIcon icon={faSmile}/>
                                    <div>
                                        THANK YOU
                                    </div>
                                    <div>
                                        YOUR ORDER IS NOW COMPLETE
                                    </div>
                                </div>
                            :
                            this.showNoItemMessage()
                        }
                    </div>
                    {
                        this.state.showTotal ?
                        <div className="cart_link">
                         <MyButton
                        type="default"
                        title={'Chec Out'}
                        linkTo={'/user/payment'}
                        addStyles={{
                            margin: '10px 0 0 0'
                        }}
                    />
                        
                    </div>
                        :null

                    }

                </div>
            </UserLayout>
           
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserCart);