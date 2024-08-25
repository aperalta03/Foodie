import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import logo from '../../../public/logo.png';
import pfp from '../../../public/pfp3.png';

import socials from '../../data/socials.json';

import styles from './landingPage.module.css';

import Navbar from '../navbar/navbar';
import Recipes from '../recipes/recipes';

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
};

const LandingPage = () => {
    return (
        <Box className={styles.Page}>
            <Navbar />
            <Box className={styles.mainContainer}>
                <Box className={styles.ribbon}></Box>
                <Box className={styles.contentContainer}>
                    <Image src={logo} alt='Marina Espinoza' className={styles.logo} width={100} height={100}/>
                    <Box className={styles.textContainer}>
                        <Box className={styles.title}>
                            <Box className={styles.line}>
                                {"Marinas".split('').map((char, index) => (
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
                                        <IconComponent className={styles.socialIcon} />
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
            <Recipes />
        </Box>
    );
};

export default LandingPage;