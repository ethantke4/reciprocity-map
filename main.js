import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

// Create root and chart
let root = am5.Root.new("chartdiv");

root.setThemes([
  am5themes_Animated.new(root)
]);

let chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "rotateX",
  panY: "rotateY",
  projection: am5map.geoMercator()
}));

// Create main polygon series for countries
let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  interactive: true
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x677935)
});

// Reciprocity data
const reciprocityData = [
  { id: "US", name: "United States", value: 10 },
  { id: "CA", name: "Canada", value: 5 },
  // Add more data points here
];

// Add reciprocity data to map polygons
polygonSeries.mapPolygons.template.setAll({
  fill: am5.color(0x74C2E1)
});

polygonSeries.data.setAll(reciprocityData);

// Add bullets for reciprocity points
let pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

pointSeries.bullets.push(function() {
  let circle = am5.Circle.new(root, {
    radius: 5,
    tooltipText: "{name}: {value}",
    fill: am5.color(0xFF6F61),
    strokeWidth: 2,
    stroke: am5.color(0xffffff)
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});

pointSeries.data.setAll(reciprocityData);
