import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const socialLinks = [
        { title: 'Discord', icon: '👾', href: 'https://discord.gg/YWgJJ4cSCa' },
        { title: 'YouTube', icon: '▶️', href: 'https://www.youtube.com/@easterx_esports' }, // Replace with actual link
        { title: 'Instagram', icon: '📸', href: 'https://www.instagram.com/easterx_esports?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    ];

    return (
        <footer className="footer">
            <div className="container">
                <p>© {currentYear} Easterx Esports. All Rights Reserved.</p>
                <p>Your Ultimate Destination for Battlegrounds Mobile India Action.</p>
                <div className="social-links">
                    {socialLinks.map(link => (
                        <a
                            key={link.title} href={link.href} title={link.title}
                            target="_blank" rel="noopener noreferrer" aria-label={link.title}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;