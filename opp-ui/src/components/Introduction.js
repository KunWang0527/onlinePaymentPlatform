import React from "react";

function Introduction() {
  return (
    <section className="introduction">
      {/* Introduction boxes */}
      <div className="intro-container">
        <div className="intro-box">
          <h2 className="box-title">Left Introduction Box</h2>
          <p className="box-content">
            This is the content of the left introduction box.
          </p>
          <figure className="box-figure"></figure>
        </div>
      </div>

      <div className="intro-container">
        <div className="intro-box">
          <h2 className="box-title">Right Introduction Box</h2>
          <p className="box-content">
            This is the content of the right introduction box.
          </p>
          <figure className="box-figure"></figure>
        </div>
      </div>
    </section>
  );
}

export default Introduction;
