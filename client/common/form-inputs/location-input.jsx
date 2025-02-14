"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useMemo, useRef, useState, useCallback } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const center = {
  lat: 51.505,
  lng: -0.09,
};

export default function DraggableMarker({ position = center, setPosition }) {
  const [draggable, setDraggable] = useState(true);
  //   const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  console.log("Position: ", position);

  return (
    <div className="w-full h-full relative">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormDescription>{desc}</FormDescription>
            <FormControl className="h-full w-full">
              <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  draggable={draggable}
                  eventHandlers={eventHandlers}
                  position={position}
                  ref={markerRef}
                >
                  <Popup minWidth={90}>
                    <span>Marker is draggable</span>
                  </Popup>
                </Marker>
              </MapContainer>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
