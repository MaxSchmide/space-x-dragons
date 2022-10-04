import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFav } from "../../slices/dataSlice";
import "./_favourites.scss";

const Favourites = () => {
  const { favourites } = useSelector((state) => state.data);

  const dispatch = useDispatch();
  const removeFromFavourite = (fav) => {
    dispatch(removeFromFav(fav));
  };

  return (
    <div className='box'>
      {favourites ? (
        <Accordion allowZeroExpanded>
          {favourites?.map((fav) => (
            <AccordionItem key={fav.id}>
              <AccordionItemHeading>
                <AccordionItemButton>{fav.name}</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>{fav.description}</p>
                <span
                  onClick={() => removeFromFavourite(fav)}
                  className='remove'
                >
                  <AiFillStar />
                  Remove
                </span>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p>No Favourites</p>
      )}
    </div>
  );
};

export default Favourites;
