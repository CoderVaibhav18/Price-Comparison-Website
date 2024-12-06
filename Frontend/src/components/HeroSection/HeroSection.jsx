import { useState } from "react";
import styles from "./HeroSection.module.css";
import axios from "axios";
import ProductInfo from "./ProductInfo/ProductInfo";
import { ThreeDots } from "react-loader-spinner";

const HeroSection = () => {
  const [results, setResults] = useState(null);
  const [formData, setFormData] = useState("");
  const [error, setError] = useState(null);
  // const [img, setImg] = useState(null)
  const [loading, setLoading] = useState(false); // Add loading state

  const handleForm = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading before fetching data
    console.log("Searching for:", formData);
    try {
      const response = await axios.get(
        `/api/product?search=${formData.split(" ").join("+")}`
      );
      setResults(response.data); // Update results with API data
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again."); // Display error message
    } finally {
      setLoading(false); // Stop loading after the API call completes
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData(e.target.value);
  };

  return (
    <section className={styles.hero} id="Home">
      <h1>Find the Best Gadgets at the Best Prices</h1>
      <p className={styles.para}>
        Compare prices from multiple retailers and save money!
      </p>
      <div className={styles.searchContainer}>
        <p>Save big with exclusive offers from top retailers!</p>
        <form className={styles.searchForm} onSubmit={handleForm}>
          <input
            type="text"
            placeholder="Search for gadgets..."
            onChange={handleChange}
            value={formData}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div>
        {error && (
          <p style={{ color: "red", fontSize: ".9rem", margin: "10px 0" }}>
            {error}
          </p>
        )}
        {loading && (
          <div className={styles.loader}>
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="red"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}{" "}
        {/* Loader message */}
        {!loading && <ProductInfo results={results} formData={formData} />}
      </div>
    </section>
  );
};

export default HeroSection;
