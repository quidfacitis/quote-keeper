import React, { useContext, useState, useEffect } from 'react';
import hops from '../beers/hops.png';
import BeerLibraryContext from '../../context/beerLibrary/beerLibraryContext';
import Spinner from '../layout/Spinner';

const BeerLibraryItem = ({ beer }) => {
  const beerLibraryContext = useContext(BeerLibraryContext);
  const { beerLibrary, deleteBeer, updateBeer, setCurrentBeer, clearCurrentBeer, loadBeerImages, beerImages, clearBeerImages } = beerLibraryContext;

  const [showImgArrows, setShowImgArrows] = useState(false);
  const [currentBeerImage, setCurrentBeerImage] = useState(-1);
  const [thisBeersImages, setThisBeersImages] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [style, setStyle] = useState({
      display: 'none'
    });

  useEffect(() => {
    let beerHasImages = beerImages.filter(beerImage => beerImage._id === beer._id);
    if(beerHasImages[0]) {
      setThisBeersImages(beerHasImages[0].images);
    };
  }, [beerImages, beerLibrary, beer._id]);

  const {
    _id,
    name,
    type,
    abv,
    description,
    rating,
    imgURL
  } = beer;


  const onDelete = () => {
    deleteBeer(_id);
    clearCurrentBeer();
  };

  const onImgLoad = () => {
    setShowSpinner(false);
    setStyle({
      display: 'inline-block'
    });
  };

  const onLoadBeerImages = () => {
    setShowSpinner(true);
    setStyle({
      display: 'none'
    });
    if (currentBeerImage === -1) {
      console.log(`LOAD BEER IMAGES FOR ${name}`);
      loadBeerImages({ beerName: name }, beer._id);
      setCurrentBeerImage(0);
    } else {
      // const nextImage = currentBeerImage++;
      console.log(`RIGHT ARROW CLICKED AGAIN, NEXT BEER IMAGE IS ${currentBeerImage + 1}`);
      setCurrentBeerImage(currentBeerImage + 1);
    }
  }

  const onLeftArrowClick = () => {
    setShowSpinner(true);
    setStyle({
      display: 'none'
    });
    setCurrentBeerImage(currentBeerImage - 1);
  }

  const onSaveImg = () => {
    updateBeer({ _id, imgURL: thisBeersImages[currentBeerImage] });
    clearBeerImages(_id);
    setCurrentBeerImage(-1);
  };

  const ratingStars = [];

  for (let i=1; i <= 5; i++ ) {
    if (i <= rating) {
      ratingStars.push(<span key={i} className="material-icons" style={{color: '#14213D'}}>star_rate</span>);
    } else {
      ratingStars.push(<span key={i} className="material-icons" style={{color: '#E5E5E5'}}>star_rate</span>);
    }
  }

  return (
    <div className="beer-library-item-card">
      <div className="top-flex-container-beer-library-item">
        <div className="top-left-container-beer-library-item">
          {name && <p>{name}</p>}
          {type && <p>{type}</p>}
          {abv && <p>{abv}</p>}
          {<p>{ratingStars}</p>}
        </div>
        <div className="top-right-container-beer-library-item">
          {showSpinner && <Spinner />}
          {(thisBeersImages.length === 0 || currentBeerImage === -1) ? <img src={imgURL ? imgURL : hops} alt=''
            className={showImgArrows ? 'beer-library-item-img opaque' : 'beer-library-item-img'}
            style={style}
            onMouseEnter={() => setShowImgArrows(true)}
            onMouseLeave={() => setShowImgArrows(false)}
            onLoad={onImgLoad}/> :
            <img src={thisBeersImages[currentBeerImage]} alt=''
            className={showImgArrows ? 'beer-library-item-img opaque' : 'beer-library-item-img'}
            style={style}
            onMouseEnter={() => setShowImgArrows(true)}
            onMouseLeave={() => setShowImgArrows(false)}
            onLoad={onImgLoad}/>
          }
          {(currentBeerImage > -1 && showImgArrows) && <span
            onMouseEnter={() => setShowImgArrows(true)}
            onMouseLeave={() => setShowImgArrows(false)}
            onClick={onLeftArrowClick}
            className="material-icons left-img-arrow">keyboard_arrow_left</span>}
          {showImgArrows && <span
            onMouseEnter={() => setShowImgArrows(true)}
            onMouseLeave={() => setShowImgArrows(false)}
            onClick={onLoadBeerImages}
            className="material-icons right-img-arrow">keyboard_arrow_right</span>}
          {(currentBeerImage > -1 && !showSpinner) &&
            <div className="centered">
              <button
              onClick={onSaveImg} className="buttons-beer-library-item"
              >Save</button>
            </div>
          }
        </div>
      </div>
      <div className="middle-flex-container-beer-library-item">
        {description && <p><em>{description}</em></p>}
      </div>
      <div className="bottom-flex-container-beer-library-item">
        <button onClick={onDelete} className="buttons-beer-library-item">Delete </button>
        <span className="button-divider"> | </span>
        <button onClick={() => setCurrentBeer(beer)} className="buttons-beer-library-item">Edit</button>
      </div>
    </div>
  )
}

export default BeerLibraryItem;
