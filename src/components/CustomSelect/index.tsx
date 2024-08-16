import React, { useState } from 'react';
import Arrow from '../../assets/arrow.svg'

import styled from './select.module.scss'

export interface IArr{
  _id: string,
  title: string
}

interface ISelectProps {
    arr: IArr[];
    selected: string;
    setSelected: (option: string)=>void
}


const CustomSelect: React.FC<ISelectProps> = ({ arr = [], selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styled.select}>
            <div
                className={styled.main}
                onClick={() => setIsActive(!isActive)}
            >
                <span>{selected}</span>
                <img src={Arrow} alt="arrow" className={`${styled.img} ${isActive && styled.img_active}`}/>
            </div>

            {isActive && (
                <div className={styled.options}>
                {arr &&
                    arr.map((option) => (
                    <div
                        key={option._id}
                        onClick={() => {
                        setSelected(option.title);
                        setIsActive(!isActive);
                        }}              
                    >
                        {option.title}
                    </div>
                    ))}
                </div>
            )}
    </div>  
  );
};

export default CustomSelect;