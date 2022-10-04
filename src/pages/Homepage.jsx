/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsComponent from "../components/Cards/Cards";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { dataRequest, dataSuccess } from "../slices/dataSlice";

const Homepage = () => {
  const dispatch = useDispatch();
  const { loading, dragons } = useSelector((state) => state.data);

  const fetchData = async () => {
    dispatch(dataRequest());
    await fetch("https://api.spacexdata.com/v4/dragons")
      .then((res) => res.json())
      .then((data) => {
        dispatch(dataSuccess(data));
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navbar />

      <CardsComponent>
        {!loading &&
          dragons.map((item, index) => {
            return <CardsComponent.Card key={index} item={item} />;
          })}
      </CardsComponent>
      <Footer />
    </>
  );
};

export default Homepage;
