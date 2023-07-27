import '../styles/bootstrapstyles.css';
import '../styles/styles.css';
import { Link } from "react-router-dom";
import { Card } from './context';
import Cleo from '../images/Cleo.JPG';
import Group from '../images/group.jpg';
import WA from '../images/wa.png';

export function Home(){
    return (
        <>
            <header className="masthead">
                <div className="container">
                    <h1 className="masthead-subheading">Welcome to the PNW Bank!</h1>
                        <Link className="btn btn-primary text-uppercase" to="/Components/login/">Log In</Link>
                    </div>
            </header>
            <section className="page-section" id="services">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Services</h2>
                        <h3 className="section-subheading text-muted">We keep it simple because life is complicated enough!</h3>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x" style={{color:'#01935b'}}></i>
                                <i className="fas fa-usd fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="my-3">Savings Account</h4>
                            <p className="text-muted">No minimum balance. Matching interest rates.</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x" style={{color: '#cc7ff5'}}></i>
                                <i className="fas fa-credit-card fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="my-3">Checking Account</h4>
                            <p className="text-muted">No minimum balance. Matching interest rates. Design options for ATM cards to match your interests.</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x" style={{color:'#05e0f0'}}></i>
                                <i className="fas fa-bank fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="my-3">Loans</h4>
                            <p className="text-muted">We offer Home, Personal, and Vehicle Loans. We are also happy to assist you in applying for government grants. </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className = "grid">
                <Card 
                    style={{backgroundColor: "lightskyblue"}}
                    header="The PNW Bank thanks you!"
                    title="Thank you for being a part of this vision."
                    text="We look forward to continue growing along side you!"
                    body={
                        <>
                        <br></br>
                        <img src={ Cleo } alt='Dog in wilderness' style={{width: '300px'}}></img>
                        </>
                    }
                />
                <Card
                    header="Where We Began"
                    title="Homegrown in the backyards of Western Washington."
                    text="While out hiking our founders began talking about a need
                    for a bank that offered simplicity and had the interests of their customers as a priority. From that
                    intial conversation spawned the idea of the PNW bank. A local bank that focused on community!"
                    body={
                        <img src={ WA } alt='Outline of Washington state' style={{width: '200px'}}></img>
                    }
                />
                <Card
                    header="Vision"
                    title="We dream of building a legacy of trust and transparency."
                    text=" We want to partner with our customers so that finanical stability and growth are possible for everyone!"
                    body={
                        <img src={ Group } alt='Five people standing in front of cabin' style={{width: '300px'}}></img>        
                }
                />
            </div>
        </>
    );  
}
