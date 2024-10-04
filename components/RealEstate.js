import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient';
import dynamic from 'next/dynamic';


const stateAbbreviations = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const MapComponent = dynamic(() => import('../components/MapComponent'), {
    ssr: false, // This disables server-side rendering for this component
  });

const RealEstate = () => {
    const [selectedState, setSelectedState] = useState("");
    const [regions, setRegions] = useState([]);

    const handleChange = (event) => {
        setSelectedState(event.target.value);
    };

    useEffect(() => {
        const fetchRegions = async () => {
            if (selectedState) {
                const { data, error } = await supabase
                    .from('regions')
                    .select('*')
                    .eq('state', selectedState); // Assuming 'state' is the column name

                if (error) {
                    console.error('Error fetching regions:', error);
                } else {
                    console.log(data)

                    setRegions(data);
                }
            } else {
                setRegions([]); // Clear regions if no state is selected
            }
        };

        fetchRegions();
    }, [selectedState]);

    return (
        <div className='real-estate-container'>
            <div>
                {/* <MapComponent /> */}
            <label htmlFor="states">Select a state:</label>
            <select id="states" value={selectedState} onChange={handleChange}>
                <option value="">--Please choose an option--</option>
                {stateAbbreviations.map((state) => (
                    <option key={state} value={state}>
                        {state}
                    </option>
                ))}
            </select>
            {selectedState && (
                <div>
                    <h2>Regions in {selectedState}:</h2>
                    {regions.length > 0 ? (
                        <ul className='regions-menu'>
                            {regions.map((region) => (
                                <li key={region.regionid}>{region.city && region.city}, {region.state && region.state} {region.regionname && region.regionname.length > 4 && region.regionname}{region.regionname && region.regionname.length <= 4 && '0' + region.regionname} </li> // Assuming 'id' and 'name' are columns in your table
                            ))}
                        </ul>
                    ) : (
                        <p>No regions found for this state.</p>
                    )}
                </div>
                
            )}
        </div>
        </div>

    )}

export default RealEstate