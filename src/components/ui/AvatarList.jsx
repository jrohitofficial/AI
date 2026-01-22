import React from 'react';

const colors = ['#38bdf8', '#22c55e', '#f59e0b', '#818cf8'];

const AvatarList = ({ people }) => (
    <div style={{ display: 'flex', gap: 8 }}>
        {people.map((person, index) => (
            <div
                key={person.name}
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: colors[index % colors.length],
                    color: '#0b1221',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 700
                }}
                aria-label={person.name}
            >
                {person.name.slice(0, 1)}
            </div>
        ))}
    </div>
);

export default AvatarList;
