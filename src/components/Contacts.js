import React, { useState, useEffect } from 'react';
import ContactForm from "./ContactForm"
import firebaseDb from '../firbase';

const Contacts = () => {

    var [contactObjects, setcontactObjects] = useState({})
    var [currentId, setcurrentId] = useState('')

    useEffect(() => {
        firebaseDb.child('contacts').on('value', snapshop => {
            if(snapshop.val()!= null)
            setcontactObjects({
                ...snapshop.val()
            })
            else
            setcontactObjects({})
        })        
    }, [])
    

    const addOrEdit = obj =>{
        if(currentId === '')
            firebaseDb.child('contacts').push(
                obj,
                err => {
                    if (err)
                        console.log(err);
                    else
                        setcurrentId('')
                }
            )
        else
            firebaseDb.child(`contacts/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setcurrentId('')
                }
            )

    }

    const onDelete = key =>{
        if(window.confirm('Are you sure want to delete')){
            firebaseDb.child(`contacts/${key}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setcurrentId('')
                }
            )
        }
    }

    return ( 
        <div>
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-4 text-center">Contact Register</h1>
                </div>
            </div>
           <div className="container">
            <div className="row">
                    <div className="col-md-5"> 
                        <ContactForm {...({ addOrEdit, currentId, contactObjects})} />                    
                    </div>
                    <div className="col-md-7"> 
                    <div>                         
                        <table className="table table-borderless table-striped ">
                            <thead className="thead-light">
                                <tr>
                                    <td>FullName</td>
                                    <td>Mobile</td>
                                    <td>Email</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                { Object.keys(contactObjects).map(id =>
                                    { return <tr key={id}>                                        
                                                <td>{ contactObjects[id].fullname }</td>
                                                <td>{ contactObjects[id].mobile }</td>
                                                <td>{ contactObjects[id].email }</td>
                                                <td>
                                                    <a className="btn text-primary" href="#!" onClick={()=> {setcurrentId(id)}}>
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </a>
                                                    <a className="btn text-danger" href="#!" onClick={()=>{onDelete(id)}}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </a>
                                                </td>
                                             </tr>                                       
                                    })
                                }
                            </tbody>
                        </table>                     
                     </div> </div>
                </div>
           </div>
        </div>
     );
}
 
export default Contacts;