import { Component } from 'react'

const msg = " Bienvenue!"
class Home extends Component { 
    render() { 
        return (
            <div style={{ fontSize: 'xx-large', display: 'flex', justifyContent: '', alignItems: 'center', height: '100vh' }}>
                <h1>{msg}</h1>
            </div>
        );
    }
}
 
export default Home;