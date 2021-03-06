var pref     = JSON.parse($("#prefectures_json").text());
var branches = JSON.parse($("#branches_json").text());
var width = 900, height = 960;

var svg = d3.select("#japan_map")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

var projection = d3.geo.mercator()
    .center([136, 35.5])
    .scale(2000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
  .projection(projection);

d3.json("/assets/japan.json", function(error, japan) {
  var topo = topojson.feature(japan, japan.objects.pref).features;
  svg.selectAll(".pref")
     .data(topo)
     .enter()
     .append("path")
     .style("fill", function(d) {
      return branches[d.properties.name_local+"_color"];
     })
     .attr("class", function(d) {
      return "pref pref_" + d.properties.name;
     })
     .attr("d", path)
     .append("title")
    .text(function(d){
      if (d.properties.name_local in branches) {
        var num_branches = branches[d.properties.name_local]
      } else {
        var num_branches = 0
      }
      return d.properties.name_local + ": "+num_branches+"店舗"; 
    });

  $(".pref").tipsy({
    gravity: 'w',
    fade: true,
    delayOut: 500
  })
});

