import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { FaEye } from "react-icons/fa";
import RatingBar from "../../../../../components/RatingBar";
import { calculatePercentage } from "../../../../../shared/functions/getPercentageValue";
import { getMedia } from "../../../../../shared/functions/getMedia";
import { getRatioHeight } from "../../../../../shared/functions/getRatioHeight";
function Store({ store }) {
  const cardRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (cardRef.current) {
      setHeight(getRatioHeight(cardRef?.current?.clientWidth));
    }
  }, [cardRef]);

  return (
    <div className="store-products-content-section">
      <div
        style={{
          height: `${height}px`,
        }}
        className="product-image"
        ref={cardRef}
      >
        <img
          src={getMedia(
            store?.media[0]?.mediaId?.name,
            store?.commercialId?.userName,
            "stores"
          )}
          alt=""
        />

        {store?.discount > 0 && <p className="offer">{store?.discount}% OFF</p>}
      </div>

      <div className="store-products-content">
        <h6 className="title">{store?.productTitle}</h6>

        <div className="rating-bar-wrapper">
          <RatingBar rating={store?.averageRating} />{" "}
          <span className="rating-number">({store?.averageRating})</span>
        </div>

        <div className="price-section">
          <div className="price-item">
            {store?.discount > 0 ? (
              <p className="discount-price">
                ${calculatePercentage(store?.price, store?.discount)}
              </p>
            ) : (
              <></>
            )}
            <p className={`${store?.discount ? "discount" : ""} price`}>
              ${store?.price}
            </p>
          </div>
          <div className="stock-item">
            <p>
              {store?.stock > 0 ? (
                <p className="stock">• In Stock</p>
              ) : (
                <p className="out">Out of stock</p>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="add-cart-section">
        {/* <button
          onClick={() => handleAddToCart(store)}
          type="button"
          className="view-btn btn"
          disabled={store.stock === 0}
        >
          <IoCartOutline className="icon" />
          Add To Cart
        </button> */}

        <button
          type="button"
          className="cart-btn btn"
          // onClick={() => handleProductDetails(store._id)}
        >
          <FaEye /> View
        </button>
      </div>
    </div>
  );
}

export default Store;
