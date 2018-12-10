import React, { Component } from 'react';

class Header extends Component {
  
    render() {
    return (
      <header>
        <div className='wrapper'>
        
            <div className="logo-title">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" aria-labelledby="mec-logo-title" role="img">
                            <title id="mec-logo-title">MEC</title>
                            <path d="M0 0v60h60V0H0z M24.6 40.8H21V24.7l-0.9 4.9l-2.3 11.2h-3.5l-2.2-11.3l-0.7-4.8v16.1H7.2V18.6h5.9 l2.3 11.3l0.7 4.1l0.7-4.1l2.3-11.3h5.5V40.8z M38.4 22.2h-6.6v5.4h5.4v3.6h-5.4v6h6.6v3.6H27.6V18.6h10.8V22.2z M52.8 26.4h-3.6 v-2.5c0-1.3-0.6-2.2-2.1-2.2S45 22.6 45 23.9v11.7c0 1.3 0.6 2.2 2.1 2.2s2.1-0.9 2.1-2.2V33h3.6v2.5c0 3.4-1.9 5.8-5.8 5.8 s-6.2-2.6-6.2-6.1v-11c0-3.4 2.2-6.1 6.2-6.1s5.8 2.5 5.8 5.8V26.4z"></path>
                        </svg>
                <p><span className="h1span">crew</span></p>
            </div>
            <p>Save the details of you friends, family or dog and know your always buying the right thing</p>
        </div>
      </header>  
    );
  }
}
export default Header;