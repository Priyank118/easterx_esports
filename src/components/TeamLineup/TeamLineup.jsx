import React from 'react';
import Section from '../Section/Section';
import useScrollReveal from '../../hooks/useScrollReveal';

const TeamLineup = () => {
    const teamMembers = [
        { id: '5166918930', name: 'easTeRxPriyank', ig: 'Priyank619_', role: 'Manager/ Assaulter', avatar: '/images/priyank.png', quote: '"Peak, spray, down — repeat."' },
        { id: '5166931482', name: 'easTeRxPranay', ig: 'Pranay_ab17', role: 'In-Game Leader / Support', avatar: '/images/pranay.png', quote: '"Others play the zone. I play the mind."' },
        { id: '5958582008', name: 'easTeRxShaniii', ig: 'i.am_shani_shrivastav', role: 'Entry Fragger', avatar: '/images/shani.png', quote: '"If there’s a first bullet, it’s mine."' },
        { id: '55542390783', name: 'easTeRxAnish', ig: '_anish_433', role: 'Support Assaulter', avatar: '/images/anish.png', quote: '"Their rush is loud. My cover is louder."' },
        { id: '5274207839', name: 'easTeRxVasu', ig: 'moksha._.18', role: 'Support / Scout', avatar: '/images/vasu.png', quote: '"They rotate blind — we rotate wise."' },
        { id: '8568564564', name: 'easTeRxKrishna', ig: 'krishnaa_1312', role: 'Support / Freeman', avatar: '/images/krishna.png', quote: '"Not all heroes hold the most kills — some hold the team."' },
    ];
    const { observeElement } = useScrollReveal(0.05);

    return (
        <Section id="team-lineup" title="Meet Our BGMI Squad" className="bg-lighter-surface">
            <div className="card-grid player-grid">
                {teamMembers.map((member, index) => (
                    <div
                        key={member.name}
                        ref={el => el && observeElement(el)}
                        className="card player-card reveal-on-scroll"
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <img
                            src={member.avatar}
                            alt={`${member.name} - BGMI Player`}
                            className="player-avatar"
                            style={{width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 20px auto', border: '3px solid var(--primary-color)'}}
                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x150/242424/00aaff?text=${member.name.replace('easTeRx', '')}&font=orbitron`; }}
                        />
                        <h3>{member.name}</h3>
                        <p className="player-role" style={{color: 'var(--primary-color)', fontWeight: 'bold', margin: '5px 0 15px 0'}}>{member.role}</p>
                        <p className="description" style={{fontStyle: 'italic', color: 'var(--text-color-muted)', minHeight: '60px'}}>
                           {member.quote}
                        </p>
                        <div style={{marginTop: 'auto'}}>
                            <a href={`https://www.instagram.com/${member.ig}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{display: 'block', width: 'fit-content', margin: '20px auto 0 auto'}}>
                                {member.ig ? `Follow @${member.ig}` : 'Instagram Not Available'}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default TeamLineup;
