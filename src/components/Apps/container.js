import { useState, useCallback } from 'react';
import { Card } from './card';
import update from 'immutability-helper';
import Test from './test';

const style = {
    width: '700px',
    display: 'flex',
    flexWrap: 'wrap',
};

export const Container = () => {
    const [cards, setCards] = useState([
        {
            id: 1,
            component: <Test />,
        },
        {
            id: 2,
            component: <Test />,
        },
        {
            id: 3,
            component: <Test />,
        },
        {
            id: 4,
            component: <Test />,
        },
        {
            id: 5,
            component: <Test />,
        },
        {
            id: 6,
            component: <Test />,
        },
    ]);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setCards((prevCards) => update(prevCards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, prevCards[dragIndex]],
            ],
        }));
    }, []);

    const renderCard = useCallback((card, index) => {
        return (
            <Card key={card.id} index={index} id={card.id} moveCard={moveCard} component={card.component} />
        );
    }, [moveCard]);

    return (
        <>
            <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
        </>
    );
};
