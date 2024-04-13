"use client";
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

//MUST PASS LOCATION COORDINATES FROM INSTRUMENT LISTING TO THIS MAP.

const Map = ({ address }) => {

    const mapRef = useRef(null);
    console.log('address successfully made it', address); 
    const [locationCoordinates, setLocationCoordinates] = useState(null);


    useEffect(() => {

        const encodeAddressToUrl = () => {
            if (!address) {
                console.log("no address");
                return "";
            }
            const { streetAddress, city, state, postalCode } = address;
            const addressString =
                `${streetAddress} ${city} ${state} ${postalCode}`.trim();
            return encodeURIComponent(addressString);
        };
        
        const fetchLocation = async () => {
            const encodedAddress = encodeAddressToUrl();
            // console.log("encoded address", encodedAddress);
            if (!encodedAddress) return;

            try {
                // encodeAddressToUrl();
                const res = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`
                );
                const data = await res.json();
                if (data.results && data.results[0]) {
                    setLocationCoordinates(data.results[0].geometry.location);
                }
            } catch (error) {
                console.log("Location fetch error", error);
            }
        };
        fetchLocation();
        // console.log('location object', locationCoordinates);
    }, [address]);

    useEffect(() => {
        if (locationCoordinates) {
            const initMap = async () => {
                // console.log('map init');
                const loader = new Loader({
                    apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
                    version: "weekly",
                });

                const { Map } = await loader.importLibrary("maps");

                //USE LOCATION COORDINATES HERE

                const position = {
                    lat: locationCoordinates.lat,
                    lng: locationCoordinates.lng,
                };
                //map options
                const mapOptions = {
                    center: position,
                    zoom: 15,
                    mapId: "MY_NEXTJS_MAPID",
                };

                // set up the map

                const map = new Map(mapRef.current, mapOptions);

                //add the map marker
                new google.maps.Marker({
                    position: position,
                    map: map,
                    title: "Hello Toronto!", // Customize the marker title
                });
            };

            initMap();
        }
    }, [locationCoordinates]);

    return (
        <div>
            <h1>Location</h1>
            <div style={{ height: "400px" }} ref={mapRef}></div>
        </div>
    );
};

export default Map;
