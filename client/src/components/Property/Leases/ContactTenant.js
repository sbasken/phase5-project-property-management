import emailjs from '@emailjs/browser';
import { Grid, Button } from 'semantic-ui-react';
import { useState } from 'react';

const ContactTenant = ({ tenant }) => {
    const [emailObj, setEmailObj] = useState({
        from_name: null,
        to_name: tenant.name,
        to_email: tenant.email,
        message: null
    });

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.send('service_vod9gft', 'template_y8b6lon', emailObj, process.env.REACT_APP_EMAILJS_KEY)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
    };

    const handleNameChange = (e) => {
        setEmailObj({
            ...emailObj,
            from_name: e.target.value
        });
    };

    const handleMessageChange = (e) => {
        setEmailObj({
            ...emailObj,
            message: e.target.value
        });
    };

    return (
        <div>
            <Grid.Row textAlign='center' style={{ marginTop:'6px'}}>
                <br></br>
                <h2>Email Form</h2>
                <form className='ui form' onSubmit={sendEmail}>
                    <label>Your Name</label>
                    <input 
                        type="text" 
                        name="from_name" 
                        style={{ marginBottom: '10px'}}
                        onChange={handleNameChange}
                    />
                    <label>Message</label>
                    <textarea name="message" onChange={handleMessageChange} />
                    <Button value="Send" color='teal' style={{ marginTop: '10px'}}>Submit</Button>
                </form>
            </Grid.Row>
        </div>
    )
}

export default ContactTenant
