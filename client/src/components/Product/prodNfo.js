import React from 'react';
import MyButton from '../utils/button';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const ProdNfo = (props) => {

    const showProdTags = (detail) => (
        <div className="product_tags">
            { detail.productItem.shipping ?
                <div className="tag">
                    <div><FontAwesomeIcon icon={faTruck}/></div>
                    <div className="tag_text">
                        <div>Free shipping</div>
                        <div>And return</div>
                    </div>
                </div>
            :null
            }
            { detail.productItem.instock ?
                <div className="tag">
                    <div><FontAwesomeIcon icon={faCheck}/></div>
                    <div className="tag_text">
                        <div>Available</div>
                        <div>in store</div>
                    </div>
                </div>
            :
                <div className="tag">
                    <div><FontAwesomeIcon icon={faTimes}/></div>
                    <div className="tag_text">
                        <div>Not Available</div>
                        <div>Preorder only</div>
                    </div>
                </div>
            }
        </div>
    )

    const showProdActions = (detail) => (
        <div className="product_actions">
            <div className="price"> ₹ { detail.productItem.dimensions[0].amount }</div>
            <div className="cart">
                <MyButton
                    type="add_to_cart_link"
                    runAction={()=>{
                       props.addToCart(detail._id)
                    }}
                />
            </div>
        </div>
    )

    const showProdSpecifications = (detail) => (
        <div className="product_specifications">
            <h2>Item Model:</h2>
            <div>
                <div className="item">
                    <strong>Thread Type:</strong> {detail.productItem.model}
                </div>
                {/* <div className="item">
                    <strong>Wood:</strong> {detail.wood.name}
                </div> */}
            </div>
        </div>
    )


    const detail = props.detail;
    return (
        <div>
            <h1>{detail.productItem.name} {detail.productItem.standard}</h1>
            <p>
                {detail.productItem.description}
            </p>
            { showProdTags(detail)}
            { showProdActions(detail)} 
            { showProdSpecifications(detail)} 
        </div>
    );
};

export default ProdNfo;