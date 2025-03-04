import React, { Component } from 'react';
import MyButton from './button';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/user_actions';
class Card extends Component {

    renderCardImage(image_s){
        if(image_s.length > 0){
            return image_s[0].url
        } else {
            return '/images/image_not_availble.png'
        }
    }


    render() {
        const props = this.props;
        return (
            <div className={`card_item_wrapper ${props.grid}`}>
                <div
                    className="image"
                    style={{
                        background:`url(${this.renderCardImage(props.image_s)}) no-repeat`
                    }}
                >  </div>
                    <div className="action_container">
                        <div className="tags">
                            {/* <div className="brand">{props.poduct.name}</div> */}
                            <div className="name">{props.name}</div>
                            <div className="brand">{props.standard}</div>
                        </div>
                    
                    { props.grid ?
                        <div className="description">
                            <p>
                                {props.description}
                            </p>    
                        </div>
                        :null
                    }
                    <div className="actions">
                        <div className="button_wrapp">
                            <MyButton
                                type="default"
                                altClass="card_link"
                                title="View product"
                                linkTo={`/product_detail/${props._id}`}
                                addStyles={{
                                    margin: '10px 0 0 0'
                                }}
                            />
                        </div>
                        <div className="button_wrapp">
                            <MyButton
                                type="bag_link"
                                runAction={()=>{
                                    props.user.userData.isAuth ?
                                    this.props.dispatch(addToCart(props._id))
                                :
                                    console.log('you need to log in')
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Card);