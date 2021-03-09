require([
 "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/layers/GeoJSONLayer",
  "esri/views/MapView",
  "esri/WebMap",
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/Camera",
    "esri/widgets/Home",
    "esri/widgets/ScaleBar",
    "esri/widgets/Search",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "dojo/domReady!"
], function(Map,
         FeatureLayer,
         GeoJSONLayer,
         MapView,
         WebMap,WebScene, 
  SceneView, 
  Camera, 
  Home,
  ScaleBar,
  Search,
  BasemapGallery,
  Expand,
  LayerList,
  Legend) {


    var scene = new WebScene({
      portalItem:{
       id:"ac63a1ae787349a190197ee9ce975e72" 
      }
    });
    
    var home_btn = new Camera({
     position: [
         -90.2758677,
        38.6424007,
        100000// elevation in meters
      ],
      tilt:0,
      heading: 0
    })

   var camera = new Camera({
     position: [
         -90.1856552,
        38.624526,
        700// elevation in meters
      ],
      tilt:0,
      heading: 0
    })
    
    var camera2 = new Camera({
     position: [
         -90.2067486,
        38.625942,
        700// elevation in meters
      ],
      tilt:0,
      heading: 0
    })
    
    var camera3 = new Camera({
     position: [
         -90.2381968,
        38.6331672,
        1000// elevation in meters
      ],
      tilt: 75,
      heading: -50
    })

    var view = new SceneView({
      container: "viewDiv",
      map: scene,
      viewingMode:"global",
      camera: home_btn,
      environment: {
          lighting: {
            date: new Date(),
            directShadowsEnabled: true,
            // don't update the view time when user pans.
            // The clock widget drives the time
            cameraTrackingEnabled: false
          }
      },
  });
  
  var homeBtn = new Home({
      view: view
    });

    // Add the home button to the top left corner of the view
  view.ui.add(homeBtn, "top-left");
  
  // Create the scale bar
  var scaleBar = new ScaleBar({
      map: scene,
      unit: "dual"
    });
    
    // Add the scale bar
    view.ui.add(scaleBar, {
        position: "top-left"
    });
    
    view.ui.add(
        new Search({
            view: view
        }),
        "top-right"
        );
        
        var basemapGallery = new BasemapGallery({
            view: view,
            container: document.createElement("div")
        });
        
        // Create the expand widget
        var bgExpand = new Expand({
            view: view,
            content: basemapGallery
        });
        
        view.ui.add(bgExpand, "top-right");
        
        // close the expand whenever a basemap is selected
        basemapGallery.watch("activeBasemap", function() {
            var mobileSize = view.heightBreakpoint === "xsmall" || view.widthBreakpoint === "xsmall";
            if (mobileSize) {
                bgExpand.collapse();
            }
        });
        
        var layerList = new LayerList({
            container: document.createElement("div"),
            view: view
        });
        
        var layerListExpand = new Expand({
            expandIconClass: "esri-icon-layer-list",  
            view: view,
            content: layerList
        });
        view.ui.add(layerListExpand, "top-left");
        
        view.when(function() {
            // get the first layer in the collection of operational layers in the WebMap
            // when the resources in the MapView have loaded.
            var pop_featureLayer = scene.layers.getItemAt(0);
            var neighborhood_featureLayer = scene.layers.getItemAt(1);
            var road_featureLayer = scene.layers.getItemAt(2);
            var coffee_featureLayer = scene.layers.getItemAt(3);
            
            var legend = new Legend({
                view: view,
                layerInfos: [{
                    layer: pop_featureLayer,
                    title: "St. Louis Population 2000"},{
                        layer: neighborhood_featureLayer,
                        title: " St. Louis Neighborhoods"},{
                            layer: road_featureLayer,
                            title: " Highways"},{
                                layer: coffee_featureLayer,
                                title: " Coffee"
                            }]
                        });
                        
                        var layerList = new LayerList({
                            view: view
                        });
                        
                        view.ui.add(legend, "bottom-right");
                        [arch,union_station,SLU].forEach(function(button) {
                            button.style.display = 'flex';
                            view.ui.add(button, 'top-right');
                        });
                        
                        arch.addEventListener('click', function() {
                            // reuse the default camera position already established in the homeBtn
                            view.goTo({
                                target:camera
                            });
                        });
                        
                        union_station.addEventListener('click', function() {
                            // reuse the default camera position already established in the homeBtn
                            view.goTo({
                                target:camera2
                            });
                        });
                        
                        SLU.addEventListener('click', function() {
                            // reuse the default camera position already established in the homeBtn
                            view.goTo({
                                target:camera3
                            });
                        });
                    });
                });
