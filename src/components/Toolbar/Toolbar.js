import React, { Component } from 'react';
import classes from './Toolbar.module.scss';
import Logo from '../../assets/logo.png';
import searchIcon from '../../assets/search.png';
import { NavLink }  from 'react-router-dom';
import Aux from '../../hoc/Auxx';

class Toolbar extends Component {

    constructor(props) {
        super(props);
        this.dropDownStyle = null;
        this.state = {
            value: '',
            isSticky: false,
            showDropDown: true,
            showFullMenu: false
        }

    }

    componentDidMount() {
        var headerDetail = this.header;
        window.addEventListener('scroll', () => {
            headerDetail.classList.toggle("sticky", window.scrollY > 0);
            if(window.scrollY > 0) {
                this.setState({
                    isSticky: true
                });
            } else if (window.scrollY === 0) {
                this.setState({
                    isSticky: false
                });
            }
        });
    }

    // componentDidUpdate(prevProps , prevState) {
    //     console.log('prevProps', prevProps);
    //     console.log('prevStae', prevState);
    // }

    onInptChangeHandler = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    openFullMenu = () => {
        console.log('here');
        this.setState({
            showFullMenu: true
        })
    }

    closeModal = () => {
        this.setState({
            showFullMenu: false
        })
    }

    closeModalWithLogOff = () => {
        sessionStorage.clear();
        this.setState({
            showFullMenu: false
        })
    }

    render () {
        console.log('Props in toolbar', this.props);
        // console.log('session', sessionStorage.getItem('accessToken') , sessionStorage.getItem('username') );
        let userToken = sessionStorage.getItem('accessToken');
        let name = sessionStorage.getItem('username');
        let profilePic = sessionStorage.getItem('profilePic');
        let userNav = null;
        let fullContainer = null;
        let authOption = null;

        if(userToken !== null) {
            authOption = (
                <NavLink to={{pathname: '/auth'}}>
                                <li className={classes.List}><button onClick={this.closeModalWithLogOff}>Sign Out</button></li>
                </NavLink>
            )
            userNav=(
                <Aux>
                    <p style={{fontSize: '20px', fontWeight:'500' ,marginRight: '5px', display:'flex', alignSelf:'center'}}>Hey, {name} </p>
                    <div style={{display: 'flex' , flexDirection: "column"}}>
                        <button className={classes.Image__Button} onClick={this.openFullMenu} >
                            <img src={profilePic} alt={""} className={classes.Image}></img>
                        </button>
                    </div>
                </Aux>
            )
        } else  {
            authOption = (
                <NavLink to={{pathname: '/auth'}}>
                    <li className={classes.List}><button onClick={this.closeModal}>Sign In</button></li>
                </NavLink>
            )
            userNav = (
                <div className={classes.Hamburger} onClick={this.openFullMenu}><div></div></div>
            )
        } 

        if(this.state.showFullMenu) {
            fullContainer = (
                <div className={classes.FullMenu}> 
                    <div className={classes.Content}>
                        <ul className={classes.PageMenu}>
                            <NavLink to={{pathname: '/'}}>
                                <li className={classes.List}><button>Home</button></li>
                            </NavLink>
                            <li className={classes.List}><button>Your Post</button></li>
                            <li className={classes.List}><button>Adopt a Pet</button></li>
                            {authOption}
                            <li className={classes.List}><button>Contact Us</button></li>
                            {/* <li className={classes.Social}>
                                <button><i class="fa fa-facebook" aria-hidden="true"></i></button>
                                <button><i class="fa fa-instagram" aria-hidden="true"></i></button>
                            </li> */}
                            {/* <li className={classes.Social}></li> */}
                        </ul>
                    </div>
                    <button onClick={this.closeModal} className={classes.ModalClose}>X</button>
                </div>
            )
        } else {
            fullContainer = (
                <header className={(this.state.isSticky) ? classes.sticky : ''} ref={header => this.header = header}> 
                    <NavLink style={{textDecoration: 'none'}}  to={{pathname: '/'}}>
                        {/* <img src={Logo} alt={"Logo"} className={classes.Logo}></img> */}
                        <div style={{fontSize: '20px' , marginLeft:'10px', textDecoration: 'underline', color: 'black' , fontWeight: 'bold'}}>𝓟𝓮𝓽 𝓢𝓱𝓪𝓻𝓮</div>
                    </NavLink>
                
                    <div className={classes.Search}>
                        <input placeholder="Search" type="text" className={classes.Search__Input} value={this.state.value} onChange={this.onInptChangeHandler} ></input>
                        <button className={classes.Search__Button}>
                            <img src={searchIcon} alt={""} className={classes.Search__Icon}></img>
                        </button>
                    </div>

                    <div className={classes.UserNav}>
                        {userNav}
                        
                    </div>
                </header>

            )
        }

        return(
            <Aux>
                {fullContainer}
            </Aux>
        );
    }
    
}

export default Toolbar;

// {/* <div className={classes.NavIcon}>
//                         <button className={classes.Button}><i className="fa fa-user-circle" style={{color: '#191919'}} aria-hidden="true"></i></button>
//                     </div> */}



// {/* {`${classes.User} ${classes.SignIn}`} */}

//                 {/* <div className={`${classes.User} ${classes.SignIn}`}>

//                 </div> */}




//             {/* </Aux> */}






















// {/* <div className={classes.Menu}></div>
// {/* <div> */}
//     <div className={classes.Content}>
//         <ul className={classes.PageMenu}>
//             <li className={classes.List}><button>Blog Post</button></li>
//             <li className={classes.List}><button>Adopt a Pet</button></li>
//             <li className={classes.List}><button>Sign In</button></li>
//             <li className={classes.List}><button>Contact Us</button></li>

//             {/* <li className={classes.Social}>
//                 <button><i class="fa fa-facebook" aria-hidden="true"></i></button>
//                 <button><i class="fa fa-instagram" aria-hidden="true"></i></button>
//             </li> */}
//             {/* <li className={classes.Social}></li> */}
//         </ul>
//     </div>
// {/* </div> */}

// <button onClick={this.closeModal} className={classes.ModalClose}>X</button> */}