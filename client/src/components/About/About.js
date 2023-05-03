// import { useRef } from 'react';
import { Grid, Image } from 'semantic-ui-react'
// import video from '../banner.mp4'
import banner from './banner.png'
import Contact from './ContactUs'
const About = () => {

    // const videoRef = useRef(null);

    // const handleVideoEnd = () => {
    //     videoRef.current.currentTime = 0; // Resets the video to the beginning
    //     videoRef.current.play(); // Starts playing the video again
    // };

    return (
        <Grid celled='internally'>
            <Grid.Row >
                {/* <video 
                    controls
                    autoPlay
                    onEnded={handleVideoEnd}
                    ref={videoRef}
                    style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                    }}>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video> */}
                <Image src={banner} />
            </Grid.Row>

            <Grid.Row>
                <Grid columns={3} divided textAlign='center'>
                    <Grid.Column>
                    <h2>Location</h2>
                    <p>777 Flatiron St.</p>
                    <p>Seattle, WA 98100</p>
                    <h2>Phone Number</h2>
                    <p>☎ 123-456-7890</p>
                    </Grid.Column>
                    <Grid.Column>
                        <Contact />
                    </Grid.Column>
                    <Grid.Column>
                    <Image src='https://images.unsplash.com/photo-1570288685369-f7305163d0e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80' />
                    </Grid.Column>
                </Grid>
            </Grid.Row>

        </Grid>
    )
}

export default About