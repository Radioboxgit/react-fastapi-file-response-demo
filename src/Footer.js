import React from 'react'
import footerStyles from './Footer.module.css';

export default function Footer(){

    return(
        <div className={footerStyles.container}>
            <p className={footerStyles.attribution}>Product of <a target="_blank" rel="noreferrer"  href="https://anigbogu-resume.vercel">Codeclas </a></p>
        </div>
    )
}