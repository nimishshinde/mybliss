import React, { useState } from "react";
import { useEffect } from "react";
import _  from "lodash";

import ProductsData from "./Data/products.json";
import Card from "./Component/Card";
import "./style/app.css";

function App() {
  const cat = [
    "Blue",
    "Pink",
    "Black",
    "Orange",
    "Green",
    "Grey",
    "Purple",
    "Yellow",
    "White",
    "Lavender",
    "Maroon",
    "Violet",
    "Turquoise",
    "Multicolour",
  ];
  const [colorWiseProduct, setColorWiseProduct] = useState([]);
  const [originalDataColorWise, setOriginalDataColorWise] = useState();
  const [displayArr, setDisplayArr] = useState([]);
  const [selectedColor, setSelectedColor] = useState(false);

  function sortByColor(color) {
    if (cat.includes(color) == false) {
      setDisplayArr(colorWiseProduct);
      setSelectedColor(false);
    } else {
      for(let i = 0; i < originalDataColorWise.length; i++) {
        if(originalDataColorWise[i][0].title.includes(color) == true) {
          setDisplayArr(originalDataColorWise[i].slice());
        }
      }
    }

    // for(let i=13; i<selectedColor.length; i++){
    //   if(selectedColor[i].title.includes(color) == true){
    //   }
    // }


  }

  function shuffleArr(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  useEffect(() => {
    let mainArr = [];
    for (let i = 0; i < ProductsData.length; i++) {
      for (let j = 0; j < cat.length; j++) {
        if (ProductsData[i].title.includes(cat[j]) == true) {
          if (mainArr[j] == undefined || mainArr.length == 0) {
            mainArr[j] = [];
            mainArr[j].push(ProductsData[i]);
          } else {
            mainArr[j].push(ProductsData[i]);
          }
        }
      }
    }
    console.log(mainArr);
    let newArr = []; 
    newArr = _.cloneDeep(mainArr);
    // newArr = mainArr.slice();
    // setOriginalDataColorWise(mainArr.slice());
    setOriginalDataColorWise(newArr.slice());
    for (let i = 0; i < mainArr.length; i++) {
      shuffleArr(mainArr[i]);
    }
    shuffleArr(mainArr);
    
    for(let i=0; i<mainArr.length; i++){
      for(let j=0; j<mainArr[i].length; j++){
        if(mainArr[i][j].variants[0].inventory_quantity == 0){
          mainArr.push(mainArr[i][j])
          mainArr[i].splice(j, 1);
        }
      }
    }
    console.log(mainArr);
    setColorWiseProduct(mainArr);

  }, []);

  useEffect(() => {
    if (selectedColor != false) {
      sortByColor(selectedColor);
    }
  }, [selectedColor]);

  const colorSelected = (event) => {
    let selectedCol = event.target.value;

    if (cat.includes(selectedCol) === true) {
      let idx = cat.indexOf(selectedCol);
      setSelectedColor(selectedCol);
    } else {
      setSelectedColor(false);
    }
  };

  return (
    <div className="bgcolor">
      <div className="navbar">
        <div className="subnavbar">
          <div className="halfflex">
            <div>
              <div className="glasstext"> 100mm Glass Beads </div>
              <div className="subglasstext">
                {" "}
                Explore our 10mm Glass Beads collection{" "}
              </div>
            </div>
            <div className="subnavbartwo">
              {" "}
              Use these beads for Jewellery making, embroidery, accessories,
              dreamcatchers, home decor, macrame and other art and craft
              projects.{" "}
            </div>
          </div>
          <div className="halfflextwo">
            <div>
              <div className="subnavbartwo"> Sort By </div>
              <select
                onChange={colorSelected}
                className="dropstyle"
                name="colour"
              >
                <option>Show All </option>
                <option> Blue </option>
                <option> Pink </option>
                <option> Black </option>
                <option> Orange </option>
                <option> Green </option>
                <option> Grey </option>
                <option> Purple </option>
                <option> Yellow </option>
                <option> White </option>
                <option> Lavender </option>
                <option> Maroon </option>
                <option> Violet </option>
                <option> Turquoise </option>
                <option> Multicolour </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="mainStyle">
        {selectedColor == false ? (
          <>
            {colorWiseProduct.map((data, idx) => (
              <>
                {idx <= 13 ? (
                  <>
                    { console.log(idx) }
                    {data.map((product) => (
                      <Card key={data.id} data={product} />
                    ))}
                  </>
                ) : (
                  <>
                    { console.log(idx) }
                    <Card key={data.id} data={data} />
                  </>
                )}
              </>
            ))}
          </>
        ) : (
          <>
            {displayArr.map((product) => (
              <>
                {console.log("from displayArr")}
                <Card data={product} />
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
