import GoogleMapReact from 'google-map-react';
import React,{ useState} from 'react'

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '25px' }}>&#9995;</div>;
export default function GoogleMap({fromData,toData}) {
    const [data, setData] = useState({
        center:{
            lat: 24.17,
            lng: 90.71
        },
        zoom:7
    })
  return (
    <>
    <div className="my-3" style={{ width  : '100%', height : '90vh'}}>
    <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCgNBbbl3jKKMvFuANjOdMBKJcLQJmanDY' }}
          defaultCenter={data.center}
          defaultZoom={data.zoom}
        >
          <AnyReactComponent
            lat={fromData.lat}
            lng={fromData.lng}
            text="My Marker"
          />

<AnyReactComponent
            lat={toData.lat}
            lng={toData.lng}
            text="My Marker"
          />
        </GoogleMapReact>
        </div>
    </>
  )
}
