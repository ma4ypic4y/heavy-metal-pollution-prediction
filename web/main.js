window.onload = init;
//alert("Hello");

var vectorSource = new ol.source.Vector({});


function init(){
    const map = new ol.Map({
        view: new ol.View({
            center: [1570255.1874815999, 9732542.932957485],
            zoom: 5
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        
        target:'js-map' 
    })

    //getting (x,y) coordinates
    map.on('click', function(e){
        console.log(e.coordinate);
    })

    // circle style
    const circleStyle = new ol.style.Circle({
        fill: new ol.style.Fill({
            color: [0, 255, 0, 1]
        }),
        radius: 5

    })

    var styleFunction = function (feature) {
        return styles[feature.getGeometry().getType()];
      };

    var styleFunction = function(feature) {
        
      //now you can use any property of your feature to identify the different colors
      //I am using the ID property of your data just to demonstrate
       var color;
       if (feature.get("ID")==1){
       color = "red";
       } else if (feature.get("ID")==2){
       color = "green";
       } else {
        color = "black"; 
       }
 
       var retStyle =   new ol.style.Style({
           stroke: new ol.style.Stroke({ 
             color: color,
             width: 5
           })
         });
         
        return retStyle;
 
       };



       var myDom = {
        points: {
          color: document.getElementById('marker-color'),
        }};

    




    var styles = {};

    // Add a Vector Layer
    const dataLayer = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url: './data/circle_color.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        style: new ol.style.Style({
        
            image: circleStyle
            
        })
    })
    map.addLayer(dataLayer);
    
    
    
    
    //var id = feature.get('Sb')
    console.log(myDom.color)
    // Drag BOX
    // var dragBox = new ol.interaction.DragBox({})
    // dragBox.on('boxstart',function(evt){
    //     console.log('Box event started')
    // })
    // map.addInteraction(dragBox);


















    // Drag and drop Interaction
    var dragSource = new ol.source.Vector()

    var dragLayer = new ol.layer.Vector({
        source: dragSource
    })
    map.addLayer(dragLayer)

    var dragnDrop = new ol.interaction.DragAndDrop({
        formatConstructors:[ol.format.GeoJSON],
        source:dragSource
    })

    dragnDrop.on('addfeatures', function(evt){
        console.log('added new features')
    })
    map.addInteraction(dragnDrop) 



    //console.log(styleFunction)
    // Draw Interaction
    // var drawSource = new ol.source.Vector()

    // var drawLayer = new ol.layer.Vector({
    //     source:drawSource
    // })

    // var draw = new ol.interaction.Draw({
    //     source:drawSource,
    //     type:'Polygon',
    //     freehand: true
    // })
    // map.addInteraction(draw)

    // Vector feature Popup Logic
    const overlayContainerElement = document.querySelector('.overlay-container');
    const overlayLayer = new ol.Overlay({
        element: overlayContainerElement
    })
    map.addOverlay(overlayLayer);

    const overlayFeatureName = document.getElementById('feature-name')
    const overlayFeatureCd = document.getElementById('Cd')
    const overlayFeatureCr = document.getElementById('Cr')
    const overlayFeatureCu = document.getElementById('Cu')
    const overlayFeatureAl = document.getElementById('Al')
    const overlayFeatureSb = document.getElementById('Sb')

    map.on('click', function(e){
        overlayLayer.setPosition(undefined);
        map.forEachFeatureAtPixel(e.pixel,function(feature,layer){
            let clickedCoordinate = e.coordinate;
            let clickedFeatureName = feature.get('name');
            let clickedFeatureCd = feature.get('Cd');
            let clickedFeatureCr = feature.get('Cr');
            let clickedFeatureCu = feature.get('Cu');
            let clickedFeatureAl = feature.get('Al');
            let clickedFeatureSb = feature.get('Sb');
            console.log(e.coordinate);
            //console.log(clickedFeatureName);
            overlayLayer.setPosition(clickedCoordinate);
            overlayFeatureName.innerHTML = "Cd: " + clickedFeatureCd + "<br \/>"+ "Cr: " + clickedFeatureCr + "<br \/>"+ "Cu: " 
                + clickedFeatureCu + "<br \/>"+ "Al: " + clickedFeatureAl + "<br \/>"+ "Sb: " + clickedFeatureSb
            //overlayFeatureName.innerHTML = clickedFeatureCd;
            
            
        })
        

    })
}
