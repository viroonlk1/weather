import '../css/myStyle.css'
import React from 'react';
import Item from './Item';
const letter = {
        fontSize: '14px'
    }
function Trends() {
  return <div className='bar side-bar'>
    <h1>Trends</h1>
        <ul className='item-list'>
            <Item title = "book" price = "100"/>
            <Item title = "pen" price = "10"/>
            <Item title = "paper" price = "120"/>
            <Item title = "ruler" price = "5"/>
        </ul>
    </div>;
}

export default Trends;
