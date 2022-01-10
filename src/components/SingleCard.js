
import React from 'react'
import './SingleCard.css';

export default function SingleCard({card, handleChoice, flipped, disabled}) {

    const handleClick = (e) => {
		if(!disabled) {
			handleChoice(card)
		}
    }
    return (
			<div className="card">
				<div id="inner-card" className={flipped ? "flipped" : ""}>
					<img src={card.src} className="front" alt="card front" />
						<img
							src="/img/confused.png"
							alt="confused"
							className="back"
							onClick={handleClick}
						/>
						
					
				</div>
			</div>
		);
}
