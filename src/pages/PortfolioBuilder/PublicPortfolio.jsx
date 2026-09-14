import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PortfolioPreview from "./PortfolioPreview";

function PublicPortfolio() {

  const [portfolioData, setPortfolioData] =
    useState(null);

  const [selectedTheme, setSelectedTheme] =
    useState("aurora");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);


  // ==========================================
  // URL-SAFE BASE64 DECODER
  // ==========================================

  const decodePortfolioData = (encodedData) => {

    try {

      // Restore Base64 characters
      let base64 = encodedData
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      // Restore missing padding
      while (base64.length % 4 !== 0) {
        base64 += "=";
      }

      // Decode Base64
      const binaryString =
        atob(base64);

      // Convert binary to encoded Unicode
      let encodedUnicode = "";

      for (
        let i = 0;
        i < binaryString.length;
        i++
      ) {

        encodedUnicode +=
          "%" +
          ("00" +
            binaryString
              .charCodeAt(i)
              .toString(16))
            .slice(-2);

      }

      // Decode Unicode
      const jsonString =
        decodeURIComponent(
          encodedUnicode
        );

      // Convert JSON
      return JSON.parse(jsonString);

    } catch (error) {

      console.error(
        "Portfolio URL decoding failed:",
        error
      );

      return null;
    }
  };


  // ==========================================
  // LOAD PORTFOLIO
  // ==========================================

  useEffect(() => {

    try {

      const hash =
        window.location.hash;


      // ========================================
      // CASE 1:
      // SHARED PORTFOLIO LINK
      // ========================================

      if (
        hash.includes("?data=")
      ) {

        const questionMarkIndex =
          hash.indexOf("?");


        if (
          questionMarkIndex !== -1
        ) {

          const queryString =
            hash.substring(
              questionMarkIndex + 1
            );


          const params =
            new URLSearchParams(
              queryString
            );


          const encodedData =
            params.get("data");


          if (encodedData) {

            const decodedData =
              decodePortfolioData(
                encodedData
              );


            if (
              decodedData &&
              decodedData.data
            ) {

              setPortfolioData(
                decodedData.data
              );


              if (
                decodedData.theme
              ) {

                setSelectedTheme(
                  decodedData.theme
                );

              }


              setLoading(false);

              return;
            }

          }

        }

      }


      // ========================================
      // CASE 2:
      // OPEN PORTFOLIO BUTTON
      // USE LOCAL STORAGE
      // ========================================

      const savedData =
        localStorage.getItem(
          "careerforgePortfolioData"
        );


      const savedTheme =
        localStorage.getItem(
          "careerforgePortfolioTheme"
        );


      if (savedData) {

        const parsedData =
          JSON.parse(savedData);

        setPortfolioData(
          parsedData
        );

      } else {

        setError(true);

      }


      if (savedTheme) {

        setSelectedTheme(
          savedTheme
        );

      }


      setLoading(false);

    } catch (error) {

      console.error(
        "Unable to load portfolio:",
        error
      );

      setError(true);

      setLoading(false);

    }

  }, []);


  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {

    return (

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f7ff",
          fontFamily:
            "Arial, sans-serif",
        }}
      >

        <div
          style={{
            textAlign: "center",
          }}
        >

          <div
            style={{
              fontSize: "50px",
              marginBottom: "15px",
            }}
          >
            ✨
          </div>

          <h2>
            Loading Portfolio...
          </h2>

          <p>
            Please wait...
          </p>

        </div>

      </div>

    );

  }


  // ==========================================
  // ERROR SCREEN
  // ==========================================

  if (
    error ||
    !portfolioData
  ) {

    return (

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          background: "#f5f7ff",
          fontFamily:
            "Arial, sans-serif",
        }}
      >

        <div
          style={{
            maxWidth: "500px",
            width: "100%",
            background: "#ffffff",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow:
              "0 15px 40px rgba(0,0,0,0.1)",
          }}
        >

          <div
            style={{
              fontSize: "50px",
              marginBottom: "15px",
            }}
          >
            😕
          </div>

          <h1>
            Portfolio Not Found
          </h1>

          <p
            style={{
              color: "#666",
              lineHeight: "1.6",
            }}
          >
            We couldn't find the portfolio
            data in this link.
          </p>

          <Link
            to="/portfolio-builder"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "12px 22px",
              borderRadius: "10px",
              background:
                "linear-gradient(135deg, #667eea, #764ba2)",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            ← Back to Portfolio Builder
          </Link>

        </div>

      </div>

    );

  }


  // ==========================================
  // PUBLIC PORTFOLIO
  // ==========================================

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7ff",
        padding: "30px 20px",
      }}
    >

      {/* TOP BAR */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 20px",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >

        <div
          style={{
            fontWeight: "700",
            fontSize: "18px",
          }}
        >
          CareerForge AI
        </div>


        <Link
          to="/portfolio-builder"
          style={{
            textDecoration: "none",
            padding: "9px 16px",
            borderRadius: "8px",
            background: "#ffffff",
            color: "#555",
            fontWeight: "600",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          ← Edit Portfolio
        </Link>

      </div>


      {/* SAME PREVIEW AS BUILDER */}

      <PortfolioPreview
        portfolioData={
          portfolioData
        }
        selectedTheme={
          selectedTheme
        }
      />

    </div>

  );

}

export default PublicPortfolio;