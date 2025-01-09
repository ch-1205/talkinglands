import React from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import usaMockData from "../mockDataUsa.json";

const center = [40.63463151377654, -97.89969605983609];

export default function UsaMap() {
  return (
    <div className="p-6 space-y-6 h-full">
      <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
          Part 2 of the Assessment
        </h2>
        <MapContainer
          center={center}
          zoom={5}
          className="w-full rounded-lg h-[80vh]"
        >
          <TileLayer
            url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=mPJSVh0z40dTPvlY8RA8"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          />
          {usaMockData.features.map((state) => {
            const coordinates = state.geometry.coordinates[0].map((item) => [
              item[1],
              item[0],
            ]);

            return (
              <Polygon
                key={state.id}
                pathOptions={{
                  fillColor: "#FD8D3C",
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  dashArray: 3,
                  color: "white",
                }}
                positions={coordinates}
                eventHandlers={{
                  mouseover: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                      dashArray: "",
                      fillColor: "#BD0026",
                      fillOpacity: 0.7,
                      weight: 2,
                      opacity: 1,
                      color: "white",
                    });
                  },
                  mouseout: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                      fillOpacity: 0.7,
                      weight: 2,
                      dashArray: "3",
                      color: "white",
                      fillColor: "#FD8D3C",
                    });
                  },
                }}
              >
                <Popup>
                  <div className="text-center">
                    <h4 className="font-bold text-lg">
                      {state.properties.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Density: {state.properties.density}
                    </p>
                  </div>
                </Popup>
              </Polygon>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
