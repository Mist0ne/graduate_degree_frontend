import {AppBar, Box, Container, Switch, Toolbar, Typography} from "@mui/material";
import {useContext} from "react";
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import PestControlRoundedIcon from '@mui/icons-material/PestControlRounded';
import {ThemeContext} from "../../App";
import {NavLink} from "react-router-dom";
import { useTranslation } from 'react-i18next';


const Header = () => {
    const [theme, toggleTheme] = useContext(ThemeContext);
    const { t, i18n } = useTranslation();

    const pages = [
        {
            'text': t('header./form'),
            'url': '/form',
        },
        {
            'text': t('header./checks'),
            'url': '/checks',
        }
    ];

    const toggleLang = () => i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');

    return (
        <AppBar position="static">
            <Container maxWidth="xxl">
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', mr: 8}}>
                            <PestControlRoundedIcon sx={{display: {xs: 'none', sm: 'none', md: 'flex'}, mr: 1}}/>
                            <NavLink to="/" style={{textDecoration: 'none', color: 'inherit'}}>
                                <Typography
                                    variant="h4"
                                    noWrap
                                >
                                    {t('header.appTitle')}
                                </Typography>
                            </NavLink>
                        </Box>
                        <Box sx={{display: 'flex'}}>
                            {pages.map((page) => (
                                <NavLink
                                    key={page.url}
                                    to={page.url}
                                    style={{textDecoration: 'none', color: 'inherit'}}
                                >
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        sx={{
                                            mr: 4,
                                        }}
                                    >
                                        {page.text}
                                    </Typography>
                                </NavLink>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', gap: 4}}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            {t('header.light')}
                            <Switch
                                checked={theme.palette.mode === 'dark'}
                                onChange={() => toggleTheme()}
                                inputProps={{'aria-label': 'controlled'}}
                                icon={<LightModeRoundedIcon sx={{marginTop: -0.3}}/>}
                                checkedIcon={<DarkModeRoundedIcon sx={{marginTop: -0.5}}/>}
                            />
                            {t('header.dark')}
                        </Box>
                        <Box>
                            {t('header.ru')}
                            <Switch
                                checked={i18n.language === 'en'}
                                onChange={() => toggleLang()}
                                inputProps={{'aria-label': 'controlled'}}
                                icon={<LanguageRoundedIcon fontSize="small" sx={{marginTop: -0.1}}/>}
                                checkedIcon={<LanguageRoundedIcon sx={{marginTop: -0.4}}/>}
                                color={theme.palette.mode === 'light' ? 'default' : 'primary'}
                            />
                            {t('header.en')}
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;