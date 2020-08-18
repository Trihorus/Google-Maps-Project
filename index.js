var map;
var markers = [];
var infoWindow;


function initMap() {
  // Create the map with no initial style specified.
  // It therefore has default styling.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.063380, lng: -118.358080},
    zoom: 8,
    mapTypeControl: false
  });

  // Add a style-selector control to the map.
  var styleControl = document.getElementById('style-selector-control');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);

  // Set the map's style to the initial value of the selector.
  var styleSelector = document.getElementById('style-selector');
  map.setOptions({styles: styles[styleSelector.value]});

  // Apply new JSON when the user selects a different style.
  styleSelector.addEventListener('change', function() {
    map.setOptions({styles: styles[styleSelector.value]});
  });

  infoWindow = new google.maps.InfoWindow();
  searchStores();

}


var styles = {
  default: null,
  silver: [
    {
      elementType: 'geometry',
      stylers: [{color: '#f5f5f5'}]
    },
    {
      elementType: 'labels.icon',
      stylers: [{visibility: 'off'}]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{color: '#616161'}]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{color: '#f5f5f5'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [{color: '#bdbdbd'}]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{color: '#eeeeee'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#757575'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#e5e5e5'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9e9e9e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#ffffff'}]
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [{color: '#757575'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#dadada'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#616161'}]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9e9e9e'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{color: '#e5e5e5'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [{color: '#eeeeee'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#c9c9c9'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9e9e9e'}]
    }
  ],

  night: [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
  ],

  retro: [
    {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{color: '#c9b2a6'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.stroke',
      stylers: [{color: '#dcd2be'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [{color: '#ae9e90'}]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#93817c'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{color: '#a5b076'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#447530'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#f5f1e6'}]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{color: '#fdfcf8'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#f8c967'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#e9bc62'}]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [{color: '#e98d58'}]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry.stroke',
      stylers: [{color: '#db8555'}]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{color: '#806b63'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.fill',
      stylers: [{color: '#8f7d77'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#ebe3cd'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{color: '#b9d3c2'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#92998d'}]
    }
  ],

  hiding: [
    {
      featureType: 'poi.business',
      stylers: [{visibility: 'off'}]
    },
    {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [{visibility: 'off'}]
    }
  ]

};
  

function searchStores(){
      var foundStores = [];
      var zipCode = document.getElementById('zip-code-input').value;
      if(zipCode){
      stores.forEach(function(store){
        var postal =store.address.postalCode.substring(0,5);
        if(postal == zipCode){
           foundStores.push(store);
         }
      });
    } else {
             foundStores = stores;
           }
      clearLocations();
      displayStores(foundStores);
      showStoresMarkers(foundStores);
      setOnClickListener();

}

function clearLocations(){
  infoWindow.close();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;

}

function setOnClickListener(){

   var storeElements = document.querySelectorAll('.store-container');
    storeElements.forEach(function(elem, index){
      elem.addEventListener('click', function(){
      google.maps.event.trigger(markers[index], 'click');
    });
  });
}


function displayStores(stores) {
    var storesHtml = "";
    stores.forEach(function(store, index){
      var address = store.addressLines;
      var phone = store.phoneNumber;
      storesHtml += `
      <div class="store-container">
       <div class ="store-container-background">
       <div class="store-info-container">
         <div class="store-address">
            <span>${address[0]}</span>
            <span>${address[1]}</span>
         </div>
         <div class="store-phone-number">${phone}</div>
     </div>  
       <div class="store-number-container">
           <div class="store-number">
               ${index+1}
           </div>
         </div>
       </div>
     </div>`
    });
    document.querySelector('.stores-list').innerHTML = storesHtml;
  }


  function showStoresMarkers(stores){
    var bounds = new google.maps.LatLngBounds();
    stores.forEach(function(store, index){
      var latlng = new google.maps.LatLng(
        store.coordinates.latitude,
        store.coordinates.longitude);
        
      var name = store.name;
      var address = store.addressLines[0];
      var openStatusText = store.openStatusText;
      var phoneNumber = store.phoneNumber;
      bounds.extend(latlng);
      createMarker(latlng, name, address, openStatusText, phoneNumber, index+1);
    })
    map.fitBounds(bounds);

  }


function createMarker(latlng, name, address, openStatusText, phoneNumber, index){
  
   var html = "";   
  
        html += `
                  <div class='store-info-window'>
                    <div class= 'store-info-name'>
                        ${name}
                    </div>
                    <div class='store-info-status'>
                       ${openStatusText}
                    </div>
                    <div class="store-info-address">
                    <div class="circle">
                        <i class="fas fa-location-arrow"></i>
                    </div>
                       <a href = "https://www.google.com/maps/dir/?api=1&destination=${address}" target="_blank">  ${address} </a>
                    </div>
                    <div class="store-info-phone">
                    <div class="circle">
                       <i class="fas fa-phone-alt"></i>
                    </div>
                      ${phoneNumber}
                   </div>
                   </div>
          `
          
      var marker = new google.maps.Marker({
      map: map,
      draggable: true,
      position: latlng,
      animation: google.maps.Animation.DROP,
      label: `${index}`,
	    icon : {
	         	url: "images/markers/cup8.png",
            scaledSize: new google.maps.Size(64, 64)
          }
      });
      marker.addListener('click', toggleBounce);
              
      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }

      google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
      
    });
      
      markers.push(marker);
  }

  