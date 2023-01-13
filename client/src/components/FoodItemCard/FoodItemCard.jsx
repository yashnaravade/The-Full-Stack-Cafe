import React from 'react'

function FoodItemCard({category, title, price, description, imgURL}) {


  return (
    <div className="card" style={{width: "18rem"}}>
        <img src={imgURL} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">{price}</p>
            <a href="#" className="btn btn-primary">Add to Cart</a>
        </div>
    </div>
    
  )
}

export default FoodItemCard