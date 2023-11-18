//Visitor Count

import React, { useEffect } from 'react'
import ReactGA from 'react-ga';


const VC = () => {
    useEffect(() => {
        ReactGA.initialize('Your-Tracking-Code');
        ReactGA.pageview(window.location.pathname + window.location.search);
        console.log('vc#')
    }, []);

      
  return (
    <div>VC</div>
  )
}

export default VC