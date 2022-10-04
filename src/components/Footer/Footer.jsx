import React from "react";
import "./_footer.scss";
import { SiGmail } from "react-icons/si";
import { FaTelegramPlane } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <footer id='contacts'>
        <p>Contact us</p>
        <div className='icons'>
          <a
            href='mailto:kuznetsov.max.v@gmailcom'
            target='_blank'
            rel='noreferrer'
          >
            <SiGmail color='#ca3a2d' size={20} />
          </a>

          <a
            href='https://telegram.me/maxschmide'
            target='_blank'
            rel='noreferrer'
          >
            <FaTelegramPlane size={20} color='#27a6e7' />
          </a>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://www.linkedin.com/in/maxschmide/'
          >
            <AiFillLinkedin size={20} color='#0a66c2' />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
