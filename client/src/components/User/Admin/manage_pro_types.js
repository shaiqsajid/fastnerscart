import React, { Component } from 'react';

import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid,resetFields} from '../../utils/Form/formActions';

import { connect } from 'react-redux';
import { getTypes,addProType } from '../../../actions/products_actions';
import FileUpload from '../../utils/Form/fileupload';

class ManageTypes extends Component {

    state = {
        formError:false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter the type'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            image:{
                value:[],
                validation:{
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: false
            }
        }
    }

    showCategoryItems = () => (
        this.props.products.types ?
            this.props.products.types.map((item,i)=>(
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            ))
        :null
    )

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'types');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    }

    resetFieldsHandler = () =>{
        const newFormData = resetFields(this.state.formdata,'types');

        this.setState({
            formdata: newFormData,
            formSuccess:true
        });
    }

    submitForm= (event) =>{
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata,'types');
        let formIsValid = isFormValid(this.state.formdata,'types')
        let existingTypes = this.props.products.types;

        if(formIsValid){
            this.props.dispatch(addProType(dataToSubmit,existingTypes)).then(response=>{
                if(response.payload.success){
                    this.resetFieldsHandler();
                }else{
                    this.setState({formError:true})
                }
            })
        } else {
            this.setState({
                formError: true
            })
        }
    }


    componentDidMount(){
        this.props.dispatch(getTypes());
    }
    imagesHandler = (images) => {
        const newFormData = {
            ...this.state.formdata
        }
        newFormData['image'].value = images;
        newFormData['image'].valid = true;

        this.setState({
            formdata:  newFormData
        })
    }

    render() {
        return (
            <div className="admin_category_wrapper">
            <h1>Product Types</h1>
            <div className="admin_two_column">
                <div className="left">
                    <div className="brands_container">
                        {this.showCategoryItems()}
                    </div>
                </div>
                <div className="right">
                    
                <form onSubmit={(event)=> this.submitForm(event)}>
                <FileUpload
                            imagesHandler={(images)=> this.imagesHandler(images)}
                            reset={this.state.formSuccess}
                        />
                     <FormField
                        id={'name'}
                        formdata={this.state.formdata.name}
                        change={(element) => this.updateForm(element)}
                    />


                    {this.state.formError ?
                        <div className="error_label">
                            Please check your data
                        </div>
                        : null}
                    <button onClick={(event) => this.submitForm(event)}>
                        Add type
                    </button>

                </form>

                </div>

            </div>
        </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}


export default connect(mapStateToProps)(ManageTypes);
