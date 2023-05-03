import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Grid, Button, Form } from 'semantic-ui-react';

const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_yg2iutf', 'template_944s8hf', form.current, process.env.REACT_APP_EMAILJS_KEY)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

    return (
        <div>
            <Grid.Row textAlign='center'>
                <h2>Contact</h2>
                <p>If you would like to leave a feedback or any suggestion, please send us a message below.</p>
                <form className='ui form' ref={form} onSubmit={sendEmail}>
                    <label>Name</label>
                    <input type="text" name="user_name" />
                    <label>Email</label>
                    <input type="email" name="user_email" />
                    <label>Message</label>
                    <textarea name="message" />
                    <Button value="Send">Submit</Button>
                </form>
            </Grid.Row>
        </div>
  )
}

export default ContactUs