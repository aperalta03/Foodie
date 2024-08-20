
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import Image from 'next/image';
import pfp from '../public/pfp2.jpg';
import logo from '../public/logo.png';

import styles from './home.module.css';

import socials from '../app/data/socials.json';

import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const iconMap = {
    'youtube': YouTubeIcon,
    'instagram': InstagramIcon,
    'email': EmailIcon,
    'whatsapp': WhatsAppIcon,
    'tiktok': LibraryMusicIcon,
}

const Home = () => {

    const [navbarVisible, setNavbarVisible] = useState(false);
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const triggerHeight = window.innerHeight * 0.8;
            if (window.scrollY > triggerHeight) {
                setSticky(true);
                setNavbarVisible(true);
            } else {
                setSticky(false);
                setNavbarVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Box className={styles.Page}>
            {/* Landing Page */}
            <Box className={styles.mainContainer}>  
                <Box className={styles.ribbon}></Box>
                <Box className={styles.contentContainer}>
                    <Image src={logo} alt='Marina Espinoza' className={styles.logo} width={100} height={100}/>
                    <Box className={styles.textContainer}>
                        <Box className={styles.title}>
                            <Box className={styles.line}>
                                {"Marina".split('').map((char, index) => (
                                    <Box key={index} className={styles.letter}>{char}</Box>
                                ))}
                            </Box>
                            <Box className={`${styles.line} ${styles.indented}`}>
                                {"Foodie".split('').map((char, index) => (
                                    <Box key={index} className={styles.letter}>{char}</Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    <Box className={styles.socialsContainer}>
                        {socials.map((social) => {
                            const IconComponent = iconMap[social.platform];
                            return (
                                <a key={social.platform} href={social.link}>
                                    <Box className={styles.socialBubble}>
                                        <IconComponent className={styles.socialIcon}/>
                                    </Box>
                                </a>
                            );
                        })}
                    </Box>
                </Box>
                <Box className={styles.profilePicture}>
                    <Image className={styles.pfp} src={pfp} alt="Marina Espinoza" />
                </Box>
            </Box>
            {/* Content */}
            <Box className={`${styles.navbar} ${navbarVisible ? styles.navbarVisible : ''}`}>
                <Image src={logo} alt='Marina Espinoza' className={`${styles.logoNavbar} ${sticky ? styles.sticky : ''}`} width={100} height={100}/>
                <Box className={`${styles.socialsNavbarContainer} ${sticky ? styles.sticky : ''}`}>
                    {socials.map((social) => {
                        const IconComponent = iconMap[social.platform];
                        return (
                            <a key={social.platform} href={social.link}>
                                <Box className={styles.socialBubble}>
                                    <IconComponent className={styles.socialIcon}/>
                                </Box>
                            </a>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;