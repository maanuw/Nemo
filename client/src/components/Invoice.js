import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../css/Invoice.css"


function Invoice({ data }) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type' ,  'application/json');
    myHeaders.append('token' ,  localStorage.token);
   
    const [invoice, setInvoiceDetails] = useState([]);
    async function getInvoiceDetails(branch) {
        try {
            const invoiceResponse = await fetch("http://localhost:3001/invoice/getDetails", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    appointment_id: data.appointment_id
                })
            });
            const invoiceRes = await invoiceResponse.json();
            setInvoiceDetails(invoiceRes);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getInvoiceDetails()
    }, [])


  
    return (
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="invoice-title">
                            <h2>Invoice</h2><h3 class="pull-right">Order id {invoice.invoice_id}</h3>
                        </div>
                        <hr/>
                            <div class="row">
                                <div class="col-xs-6">
                                    <address>
                                        <strong>Billed To:</strong><br/>
                                            {data.u_name}<br/>
                                                1234 Main<br/>
                                                    Apt. 4B<br/>
                                                        Springfield, ST 54321
                                                    </address>
                                                </div>
                                                <div class="col-xs-6 text-right">
                                                    <address>
                                                        <strong>Shipped To:</strong><br/>
                                                            Jane Smith<br/>
                                                                1234 Main<br/>
                                                                    Apt. 4B<br/>
                                                                        Springfield, ST 54321
                                                                    </address>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xs-6">
                                                                    <address>
                                                                        <strong>Payment Method:</strong><br/>
                                                                            Visa ending **** 4242<br/>
                                                                                jsmith@email.com
                                                                            </address>
                                                                        </div>
                                                                        <div class="col-xs-6 text-right">
                                                                            <address>
                                                                                <strong>Order Date:</strong><br/>
                                                                                    March 7, 2014<br/><br/>
                                                                                    </address>
                                                                                    </div>
                                                                                </div>
                                                                        </div>
                                                                </div>

                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="panel panel-default">
                                                                            <div class="panel-heading">
                                                                                <h3 class="panel-title"><strong>Order summary</strong></h3>
                                                                            </div>
                                                                            <div class="panel-body">
                                                                                <div class="table-responsive">
                                                                                    <table class="table table-condensed">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <td><strong>Item</strong></td>
                                                                                                <td class="text-center"><strong>Price</strong></td>
                                                                                                <td class="text-center"><strong>Quantity</strong></td>
                                                                                                <td class="text-right"><strong>Totals</strong></td>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td>BS-200</td>
                                                                                                <td class="text-center">$10.99</td>
                                                                                                <td class="text-center">1</td>
                                                                                                <td class="text-right">$10.99</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>BS-400</td>
                                                                                                <td class="text-center">$20.00</td>
                                                                                                <td class="text-center">3</td>
                                                                                                <td class="text-right">$60.00</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>BS-1000</td>
                                                                                                <td class="text-center">$600.00</td>
                                                                                                <td class="text-center">1</td>
                                                                                                <td class="text-right">$600.00</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td class="thick-line"></td>
                                                                                                <td class="thick-line"></td>
                                                                                                <td class="thick-line text-center"><strong>Subtotal</strong></td>
                                                                                                <td class="thick-line text-right">$670.99</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td class="no-line"></td>
                                                                                                <td class="no-line"></td>
                                                                                                <td class="no-line text-center"><strong>Shipping</strong></td>
                                                                                                <td class="no-line text-right">$15</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td class="no-line"></td>
                                                                                                <td class="no-line"></td>
                                                                                                <td class="no-line text-center"><strong>Total</strong></td>
                                                                                                <td class="no-line text-right">$685.99</td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>                            
    )
}
 export default Invoice;