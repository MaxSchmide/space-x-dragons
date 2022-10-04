import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToFav, removeFromFav } from "../../../slices/dataSlice";
import Slider from "../../Slider/Slider";
import "./_card.scss";
import { Toaster, toast } from "react-hot-toast";

const Card = ({ item }) => {
  const {
    name,
    description,
    flickr_images,
    first_flight,
    dry_mass_kg,
    height_w_trunk: { meters },
    wikipedia,
  } = item;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { favourites } = useSelector((state) => state.data);
  const [isFav, setIsFav] = useState(
    favourites?.some((e) => e.name === item.name)
  );

  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };
  const addToFavourite = () => {
    if (user) {
      dispatch(addToFav(item));
      setIsFav(true);
      toast.success("Added!");
    } else {
      toast.error("Need autorization!");
    }
  };
  const removeFromFavourite = () => {
    dispatch(removeFromFav(item));
    setIsFav(false);
    toast("Deleted!");
  };

  return (
    <>
      <Toaster />
      <div className='card'>
        <div className='card__photo'>
          {showDetails ? (
            <Slider width={250} height={200} gap={5}>
              {flickr_images.map((img) => {
                return <Slider.Slide>{img}</Slider.Slide>;
              })}
            </Slider>
          ) : (
            <img className='logo' src={item.flickr_images[0]} alt='logo' />
          )}
        </div>
        <div className='card__title'>
          {name}
          <div className='favourites'>
            {isFav ? (
              <AiFillStar onClick={removeFromFavourite} />
            ) : (
              <AiOutlineStar onClick={addToFavourite} />
            )}
          </div>
        </div>
        <div className='card__details'>
          <div className='date'>
            <p>First flight:</p>
            {first_flight}
          </div>
          <div className='weight'>
            <p>Mass:</p>
            {dry_mass_kg} kg
          </div>
          <div className='height'>
            <p>Height:</p>
            {meters} m
          </div>
        </div>
        <div className='card__link'>
          See on &nbsp;
          <a href={wikipedia}>Wikipedia</a>
        </div>
        {showDetails && <div className='card__description'>{description}</div>}
        <div className='card__button'>
          {!showDetails ? (
            <button className='btn' onClick={handleShowDetails}>
              Show details
            </button>
          ) : (
            <button className='btn' onClick={handleShowDetails}>
              Hide
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
