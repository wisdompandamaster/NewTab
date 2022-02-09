import React from "react";
import useScript from "./useScript";
import "./plugin.js"

const url1 = "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0"
const Weather = () =>{
    useScript(url1);
    return (
        <div className="Weather">
            <div id = "he-plugin-standard"/>
        </div>
    )
}
export default Weather;