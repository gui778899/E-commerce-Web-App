/* global Redoc */
import React, { useEffect, useState } from 'react';
import './ApiDocs.css';
import yaml from 'js-yaml'; // You will need to install js-yaml package

const ApiDocs = () => {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    // Fetch the OpenAPI spec from the backend and set it in the state
    fetch('http://localhost:3000/openapi.yaml')
      .then((response) => response.text())
      .then((yamlText) => {
        console.log('YAML Text:', yamlText); // Check the fetched YAML text
        const jsonSpec = yaml.load(yamlText);
        console.log('JSON Spec:', jsonSpec); // Check the converted JSON spec
        setSpec(jsonSpec);
      })
      
      .catch((error) => {
        console.error('Error fetching the OpenAPI spec:', error);
      });
  }, []);

  useEffect(() => {
    if (spec) {
      // Initialize Redoc with the JSON spec
      Redoc.init(spec, {}, document.getElementById('redoc-container'));
    }
  }, [spec]); // This effect runs when the `spec` state changes

  // Cleanup function to run when the component unmounts
  useEffect(() => {
    return () => {
      const redocContainer = document.getElementById('redoc-container');
      if (redocContainer) {
        redocContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="page-container">
      <h1 className="welcome-title">API Documentation</h1>
      <div className="api-content">
        <div id="redoc-container"></div>
      </div>
    </div>
  );
  
};

export default ApiDocs;
