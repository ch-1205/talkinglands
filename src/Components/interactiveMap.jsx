import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import "leaflet/dist/leaflet.css";

import geoJsonData from "../mockData.json";

export default function InteractiveMap() {
  const [activeFeatureId, setActiveFeatureId] = useState(null);

  // Custom style for GeoJSON features
  const style = (feature) => ({
    color: activeFeatureId === feature.id ? "red" : "blue",
    weight: activeFeatureId === feature.id ? 3 : 1,
    fillOpacity: 0.2,
  });

  const onEachFeature = (feature, layer) => {
    const popupContent =
      Object.keys(feature.properties).length > 0
        ? Object.entries(feature.properties)
            .map(([key, value]) => `<strong>${key}</strong>: ${value}`)
            .join("<br>")
        : "No properties available";

    layer.bindPopup(popupContent);

    layer.on("click", () => {
      setActiveFeatureId(feature.id);
    });

    // custom marker for popup
    if (feature.geometry.type === "Point") {
      const iconHtml = renderToStaticMarkup(
        <div
          style={{
            fontSize: "32px",
            color: "blue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaMapMarkerAlt />
        </div>
      );

      const icon = new L.DivIcon({
        className: "custom-icon",
        html: iconHtml,
        iconSize: [30, 30],
      });

      layer.setIcon(icon);
    }
  };

  return (
    <div className="p-6 space-y-6 h-full">
      <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
          Part 1 of the Assessment
        </h2>
        <MapContainer
          center={[12.941588276786788, 77.57621623884938]}
          zoom={14}
          className="w-full rounded-lg h-[80vh]"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GeoJSON
            data={geoJsonData}
            style={style}
            onEachFeature={onEachFeature}
          />
        </MapContainer>
      </div>
    </div>
  );
}
