import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_TYPES,
    ADD_BRAND,
    ADD_TYPE,
    GET_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL
} from './types';

import { PRODUCT_SERVER } from '../components/utils/misc';


export function getProductDetail(id){
console.log(id);
    const request = axios.get(`${PRODUCT_SERVER}/item/${id}`)
    .then(response=>{
        return response.data[0]
    });

    return {
        type: GET_PRODUCT_DETAIL,
        payload: request
    }

}


export function clearProductDetail(){
    return {
        type: CLEAR_PRODUCT_DETAIL,
        payload:''
    }
}

export function getProductsBySell(){
    //?sortBy=sold&order=desc&limit=100
    const request = axios.get(`${PRODUCT_SERVER}/items`)
                    .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request
    }

}

export function getProductsByArrival(){
    const request = axios.get(`${PRODUCT_SERVER}/items`)
    .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}

export function getProductsToShop(skip, limit,filters =[], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${PRODUCT_SERVER}/shop`,data)
                .then(response => {
                    let newState = [
                        ...previousState,
                        ...response.data.articles
                    ];
                    return {
                        size: response.data.size,
                        articles: newState
                    }
                });

    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request
    }

}

export function addProduct(datatoSubmit){

    const request = axios.post(`${PRODUCT_SERVER}/pro_item`,datatoSubmit)
                    .then(response => response.data);

    return {
        type: ADD_PRODUCT,
        payload: request
    }
}

export function clearProduct(){
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}




////////////////////////////////////
//////        CATEGORIES
////////////////////////////////////

export function addBrand(dataToSubmit, existingBrands){
    const request = axios.post(`${PRODUCT_SERVER}/brand`,dataToSubmit)
    .then(response=>{
        let brands = [
            ...existingBrands,
            response.data.brands
        ];
        return {
            success: response.data.success,
            brands
        }
    });
    return {
        type: ADD_BRAND,
        payload: request
    }
}


export function addProType(dataToSubmit, existingProType){
    const request = axios.post(`${PRODUCT_SERVER}/pro_type`,dataToSubmit)
    .then(response=>{
        let types = [
            ...existingProType,
            response.data.types
        ];
        return {
            success: response.data.success,
            types
        }
    });
    return {
        type: ADD_TYPE,
        payload: request
    }
}

export function getBrands(){

    const request = axios.get(`${PRODUCT_SERVER}/brands`)
                .then(response => response.data );

    return {
        type: GET_BRANDS,
        payload: request
    }

}

export function getTypes(){
    const request = axios.get(`${PRODUCT_SERVER}/types`)
    .then(response => response.data );

    return {
        type: GET_TYPES,
        payload: request
    }
}