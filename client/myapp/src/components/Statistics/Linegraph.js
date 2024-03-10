import * as d3 from "d3"
import axios from "axios"
import {useRef, useEffect} from "react";

export default function Linegraph() {
    const ref = useRef();

    useEffect(() => {
        axios.post("http://localhost:5000/getMyMood", {
            user: "Jack"
        }).then((resM) => {
            console.log("succssfully sent")
            axios.post("http://localhost:5000/getSleep", {
            user: "Jack"
            }).then((resS) => {
                console.log("succssfully sent")

                // Setup
                let mood = resM.data.mood
                let sleep = resS.data.sleep
                console.log(sleep)
                let svg = d3.select(ref.current)
                    .append("svg")
                    .attr("width", 700)
                    .attr("height", 700)
                    .append("g")
                    .attr("transform", `translate(${10},${10})`)
                
                // Mood
                let xM = d3.scaleTime()
                    .domain(d3.extent(mood, (m) => d3.isoParse(m.date)))
                    .range([30, 670])

                let yM = d3.scaleLinear()
                    .domain([0, 100])
                    .range([300, 50])
                svg.append("g")
                    .attr("transform", `translate(0, 300)`)
                    .call(d3.axisBottom(xM).ticks(8))
                svg.append("g")
                    .attr("transform", `translate(30, 0)`)
                    .call(d3.axisLeft(yM))
                    .call(g => g.append("text")
                        .attr("x", 0)
                        .attr("y", 40)
                        .attr("fill", "black")
                        .attr("text-anchor", "start")
                        .text("Mood Score"))
                    .call(g => g.append("text")
                        .attr("x", 350)
                        .attr("y", 330)
                        .attr("fill", "black")
                        .attr("text-anchor", "start")
                        .text("Date"))
                
                svg.append("path")
                    .datum(mood)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 2)
                    .attr("d", d3.line()
                      .x((d) => xM(d3.isoParse(d.date)))
                      .y((d) => yM(d.mood)))
                
                svg.append("text")
                    .attr("class", "chart-title")
                    .attr("transform", `translate(${350},${40})`)
                    .attr("text-anchor", "middle")
                    .text("Your Mood")
                    .style("font-size", "18px")
                
                // Sleep
                let xS = d3.scaleTime()
                    .domain(d3.extent(sleep, (s) => d3.isoParse(s.date)))
                    .range([30, 670])

                let yS = d3.scaleLinear()
                    .domain([0, d3.max(sleep, (s) => s.hours)])
                    .range([650, 400])
                svg.append("g")
                    .attr("transform", `translate(0, 650)`)
                    .call(d3.axisBottom(xS).ticks(8))
                svg.append("g")
                    .attr("transform", `translate(30, 0)`)
                    .call(d3.axisLeft(yS))
                    .call(g => g.append("text")
                        .attr("x", 0)
                        .attr("y", 375)
                        .attr("fill", "black")
                        .attr("text-anchor", "start")
                        .text("Hours Slept"))
                    .call(g => g.append("text")
                        .attr("x", 350)
                        .attr("y", 680)
                        .attr("fill", "black")
                        .attr("text-anchor", "start")
                        .text("Date"))
                
                svg.append("path")
                    .datum(sleep)
                    .attr("fill", "none")
                    .attr("stroke", "purple")
                    .attr("stroke-width", 2)
                    .attr("d", d3.line()
                      .x((d) => xS(d3.isoParse(d.date)))
                      .y((d) => yS(d.hours)))
                
                svg.append("text")
                    .attr("class", "chart-title")
                    .attr("transform", `translate(${350},${365})`)
                    .attr("text-anchor", "middle")
                    .text("Your Sleep")
                    .style("font-size", "18px")
                
            })
            .catch((error) => {console.log(error)})
        })
          .catch((error) => {console.log(error)})
    });

    return <svg width={700} height={700} id="linegraph" ref={ref} />;
}