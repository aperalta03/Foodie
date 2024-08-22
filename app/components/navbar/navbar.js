import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

import styles from './navbar.module.css';

import logo from '../../../public/logo.png';

import socials from '../../data/socials.json';

import UserButtons from '@/app/components/userButton/userButton';

import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const iconMap = {
    youtube: YouTubeIcon,
    instagram: InstagramIcon,
    email: EmailIcon,
    whatsapp: WhatsAppIcon,
    tiktok: LibraryMusicIcon,
};

const Navbar = () => {
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
        <Box className={`${styles.navbar} ${navbarVisible ? styles.navbarVisible : ''}`}>
            <Image 
                src={logo} 
                alt='Marina Espinoza' 
                className={`${styles.logoNavbar} ${sticky ? styles.sticky : ''}`} 
                width={100} 
                height={100}
            />
            <Box className={`${styles.socialsNavbarContainer} ${sticky ? styles.sticky : ''}`}>
                {socials.map((social) => {
                    const IconComponent = iconMap[social.platform];
                    return (
                        <a key={social.platform} href={social.link}>
                            <Box className={styles.socialBubble}>
                                <IconComponent className={styles.socialIcon} />
                            </Box>
                        </a>
                    );
                })}
            </Box>
            <Box className={styles.userButton}>
                <UserButtons />
            </Box>        
        </Box>
    );
};

export default Navbar;
