import PropTypes from "prop-types";
import styles from "./ProductInfo.module.css";
// import { useEffect, useState } from "react";
// import axios from "axios";

const ProductInfo = ({ results, formData }) => {
  let a = 0;

  // const [images, setImages] = useState([]);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await axios.get(`/api/image?search=${formData}`);
  //       setImages(response.data); // Assuming the API returns an array of image URLs
  //       console.log(response.data);   
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //     }
  //   };

  //   fetchImages();
  // }, [formData]);

  return (
    <section className={styles.container}>
      {results && (
        <div>
          <div className={styles.firstSection}>
            {/* {images.length > 0 && (
              <img
                src={images[0].productImage} // Display the first image
                height="200"
                width="100"
                alt="product image"
              />
            )} */}
            <img
                src="/images/iphones.jpg" // Display the first image
                height="200"
                width="100"
                alt="product image"
              />
            <h2>
              {formData.charAt(0).toUpperCase() +
                formData.slice(1).toLowerCase()}
            </h2>
          </div>
          <div className={styles.tableSection}>
            <table className={styles.table}>
              <thead className={styles.head}>
                <tr className={styles.th}>
                  <th>Sr. No.</th>
                  <th>Shop</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, idx) => (
                  <tr key={idx} className={styles.td}>
                    <td>{(a = a + 1)}</td>
                    <td>{item.shopName}</td>
                    <td>{item.productName}</td>
                    <td>{item.price}</td>
                    <td>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

ProductInfo.propTypes = {
  results: PropTypes.any.isRequired,
  formData: PropTypes.any.isRequired,
};

export default ProductInfo;
