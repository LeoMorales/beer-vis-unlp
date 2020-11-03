import { useD3 } from "../hooks/useD3";
import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./ParallelCoordinatesChart.css";

function ParallelCoordinatesChart() {
  let [recipes, setRecipes] = useState([]);
  // let [isPaintedCompleted, setIsPaintedCompleted] = useState(false);

  useEffect(() => {
    d3.json(
      "https://raw.githubusercontent.com/LeoMorales/beer-vis-unlp/master/beervisapp/src/data/recipeData.json",
      (res) => {
        setRecipes(res);
      }
    );
  }, []);

  const makeParallel = (mainSvg) => {
    const margin = { top: 30, right: 30, bottom: 30, left: 30 };
    const width = 1060 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    let x = d3.scale.ordinal().rangePoints([0, width], 1);
    let y = {};
    let dragging = {};

    let line = d3.svg.line();
    let axis = d3.svg.axis().orient("left");
    let background;
    let foreground;
    let dimensions;

    mainSvg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
    let svg = mainSvg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const transition = (g) => g.transition().duration(500);

    const position = (d) => {
      var v = dragging[d];
      return v == null ? x(d) : v;
    };

    const path = (d) => line(dimensions.map((p) => [position(p), y[p](d[p])]));

    const brushstart = () => {
      d3.event.sourceEvent.stopPropagation();
    };

    // Handles a brush event, toggling the display of foreground lines.
    const brush = () => {
      var actives = dimensions.filter((p) => !y[p].brush.empty()),
        extents = actives.map((p) => y[p].brush.extent());
      foreground.style("display", (d) => {
        return actives.every(
          (p, i) => extents[i][0] <= d[p] && d[p] <= extents[i][1]
        )
          ? null
          : "none";
      });
    };
    x.domain(
      (dimensions = d3.keys(recipes[0]).filter(
        (d) =>
          d !== "UserId" &&
          (y[d] = d3.scale
            .linear()
            .domain(d3.extent(recipes, (p) => +p[d]))
            .range([height, 0]))
      ))
    );

    // Add grey background lines for context.
    background = svg
      .append("g")
      .attr("class", "background")
      .selectAll("path")
      .data(recipes)
      .enter()
      .append("path")
      .attr("d", path);

    // Add blue foreground lines for focus.
    foreground = svg
      .append("g")
      .attr("class", "foreground")
      .selectAll("path")
      .data(recipes)
      .enter()
      .append("path")
      .attr("d", path);

    // Add a group element for each dimension.
    var g = svg
      .selectAll(".dimension")
      .data(dimensions)
      .enter()
      .append("g")
      .attr("class", "dimension")
      .attr("transform", (d) => "translate(" + x(d) + ")")
      .call(
        d3.behavior
          .drag()
          .origin(function (d) {
            return { x: x(d) };
          })
          .on("dragstart", function (d) {
            dragging[d] = x(d);
            background.attr("visibility", "hidden");
          })
          .on("drag", function (d) {
            dragging[d] = Math.min(width, Math.max(0, d3.event.x));
            foreground.attr("d", path);
            dimensions.sort(function (a, b) {
              return position(a) - position(b);
            });
            x.domain(dimensions);
            g.attr("transform", function (d) {
              return "translate(" + position(d) + ")";
            });
          })
          .on("dragend", function (d) {
            delete dragging[d];
            transition(d3.select(this)).attr(
              "transform",
              "translate(" + x(d) + ")"
            );
            transition(foreground).attr("d", path);
            background
              .attr("d", path)
              .transition()
              .delay(500)
              .duration(0)
              .attr("visibility", null);
          })
      );

    // Add an axis and title.
    g.append("g")
      .attr("class", "axis")
      .each(function (d) {
        d3.select(this).call(axis.scale(y[d]));
      })
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text((d) => d);

    // Add and store a brush for each axis.
    g.append("g")
      .attr("class", "brush")
      .each(function (d) {
        d3.select(this).call(
          (y[d].brush = d3.svg
            .brush()
            .y(y[d])
            .on("brushstart", brushstart)
            .on("brush", brush))
        );
      })
      .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);

    // setIsPaintedCompleted(true);
  };

  const ref = useD3(makeParallel, [recipes.length]);

  return recipes.length === 0 ? (
    <p> Recibiendo datos...</p>
  ) : (
    <svg ref={ref}></svg>
  );
}

export default ParallelCoordinatesChart;
