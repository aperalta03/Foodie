import React from 'react'
import { Box, Typography } from '@mui/material';

import Image from 'next/image';
import pfp from '../public/pfp2.jpg';

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
    return (
        <Box className={styles.mainContainer}>
            <Box className={styles.content}>
                <Typography className={styles.title}>Marina Espinoza</Typography>
                <Box className={styles.socials}>
                    {socials.map((social) => {
                        const IconComponent = iconMap[social.platform];
                        return (
                            <a key={social.platform} href={social.link}>
                                <Box className={styles.socialBubble}>
                                    <IconComponent />
                                </Box>
                            </a>
                        );
                    })}
                </Box>
            </Box>
            <Box className={styles.profilePicture}>
                <Image className={styles.pfp} src={pfp} alt="Marina Espinoza"></Image>
            </Box>
        </Box>
    )
}

export default Home;