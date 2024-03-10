import * as d3 from "d3"
import axios from "axios"
import {useRef, useEffect} from "react";

export default function Linegraph() {
    const ref = useRef();

    useEffect(() => {
        axios.post("http://localhost:5000/getSupervisorMood", {
            supervisor: "Lara"
        }).then((resM) => {
            console.log("succssfully sent")

            // Setup
            let mood = resM.data.mood
            console.log(mood)
            let svg = d3.select(ref.current)
                .append("svg")
                .attr("width", 1000)
                .attr("height", 500)
                .append("g")
                .attr("transform", `translate(${10},${10})`)
                
            // Mood
            let xM = d3.scaleTime()
                .domain(d3.extent(mood, (m) => d3.isoParse(m.date)))
                .range([30, 970])

            let yM = d3.scaleLinear()
                .domain([0, 100])
                .range([450, 50])
            svg.append("g")
                .attr("transform", `translate(0, 450)`)
                .call(d3.axisBottom(xM).ticks(8))
            svg.append("g")
                .attr("transform", `translate(30, 0)`)
                .call(d3.axisLeft(yM))
                .call(g => g.append("text")
                    .attr("x", 0)
                    .attr("y", 40)
                    .attr("fill", "black")
                    .attr("text-anchor", "start")
                    .text("Average Mood Score"))
                .call(g => g.append("text")
                    .attr("x", 500)
                    .attr("y", 480)
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
                    .y((d) => yM(d.avgMood)))
        
        })
          .catch((error) => {console.log(error)})
    });

    return <svg width={1000} height={500} id="linegraph" ref={ref} />;
}