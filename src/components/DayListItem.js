import React from 'react';
import className from 'classnames'; 
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const formatSpots = spots => {
    let spotsText = "";
    if (spots === 0) {
      spotsText = "no spots remaining";
    } else if (spots === 1) {
      spotsText = "1 spot remaining";
    } else {
      spotsText = `${spots} spots remaining`;
    }
    return spotsText;
  }

  const dayClass = className("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}


