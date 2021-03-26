import React, { useState, useEffect } from 'react';

const ContactForm = (props) => {
    const initialFieldValues = {
        fullname: '',
        mobile: '',
        email: '',
        address: ''
    }
    
    var [values, setvalues] = useState(initialFieldValues)

    useEffect(() => {
       if(props.currentId === '')
            setvalues({
                ...initialFieldValues
            })
       else
            setvalues({
                ...props.contactObjects[props.currentId]
            })
    }, [props.currentId, props.contactObjects])

    const handleInputChange = e => {
        var { name, value} = e.target
        setvalues({
            ...values,
            [name]: value
        })
    }

    const handleFormSubmit = e =>{
        e.preventDefault();
        props.addOrEdit(values)
      
    }

    return (
        <div>
            <form autoComplete="off" onSubmit={handleFormSubmit}>         
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fa fa-user"></i>
                        </div>
                    </div>
                    <input type="text" className="form-control" placeholder="Full Name" name="fullname" value={values.fullname} onChange={handleInputChange} />
                </div>       
                <div className="form-row">                    
                    <div className="form-group input-group col-md-6">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa fa-mobile-alt"></i>
                            </div>
                        </div>
                    <input type="text" className="form-control" placeholder="Mobile" name="mobile" value={values.mobile} onChange={handleInputChange} required/>
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fa fa-envelope"></i>
                        </div>
                    </div>
                    <input type="email"  className="form-control" placeholder="Email" name="email" value={values.email} onChange={handleInputChange} required/>
                </div>                    
                </div>
                <div className="form-group">
                        <textarea className="form-control" placeholder="Address" name="address" value={values.address} onChange={handleInputChange} required></textarea>
                </div>
                <div className="form-group">
                    <input type="submit" value={props.currentId === '' ? "Save" : "Update"} className="btn btn-primary btn-block" />
                </div>
            </form>
        </div>
    );
}
 
export default ContactForm;