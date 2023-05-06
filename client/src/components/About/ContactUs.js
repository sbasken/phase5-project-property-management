import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Grid, Button } from 'semantic-ui-react';

const ContactUs = () => {
    const form = useRef();
    console.log(process.env.REACT_APP_EMAILJS_KEY);

    const sendEmail = (e) => {
        e.preventDefault();
        console.log(process.env.REACT_APP_EMAILJS_KEY);

        emailjs.sendForm('service_vod9gft', 'template_944s8hf', form.current, process.env.REACT_APP_EMAILJS_KEY)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
    };

    return (
        <div>
            <Grid.Row textAlign='center' style={{ marginTop:'6px'}}>
                <h2>Contact Form</h2>
                <p>If you would like to leave a feedback or any suggestion, please send us a message below.</p>
                <form className='ui form' ref={form} onSubmit={sendEmail}>
                    <label>Name</label>
                    <input type="text" name="user_name" style={{ marginBottom: '10px'}}/>
                    <label>Email</label>
                    <input type="email" name="user_email" style={{ marginBottom: '10px'}}/>
                    <label>Message</label>
                    <textarea name="message" />
                    <Button value="Send" color='teal' style={{ marginTop: '10px'}}>Submit</Button>
                </form>
            </Grid.Row>
        </div>
  )
}

export default ContactUs