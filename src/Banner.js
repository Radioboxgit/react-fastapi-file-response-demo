import React from 'react';
import bannerStyles from './Banner.module.css';

export default function Banner(){
    
    return(
        <div className={bannerStyles.container}>
            <p className={bannerStyles.title}> TTS</p>
        </div>
    )
}