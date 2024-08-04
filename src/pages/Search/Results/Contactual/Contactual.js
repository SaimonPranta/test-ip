import React from "react";
import "./Contactual.css";

function Contactual({ input }) {
  const link = "https://www.onetrust.com/products/cookie-consent/";

  //keyword wise eikhane database theke search hoye ekta deta asheb jeitay maintag hishabe "keyword ta thakbe and shudu ekta result e dekhabe eikhane"

  return (
    <div>
      <div className="contactMianDiv">
        <span>
          <b style={{ padding: "0px 4px" }}>Ad: </b> https:skrill.com{" "}
        </span>

        <a target="_blank" href={`${link}`}>
          <p style={{ margin: "5px 0 0 0" }} className="title">
            Skrill – Your Wallet Online - Your Powerful Online Wallet
          </p>
        </a>
        <p style={{ margin: "0px" }} className="description">
          Whether you're paying online or sending money to a friend, Skrill
          makes it quick and easy. Join Skrill and discover a better way to make
          money, move money, send it and spend it. 20 Million Customers. Fast
          and Secure. Open a Free Account. Register In Minutes.
        </p>
      </div>
    </div>
  );
}

export default Contactual;
