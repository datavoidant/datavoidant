var yourVlSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {"url": "../data/seattle-weather.csv"},
    "mark": "bar",
    "encoding": {
      "x": {
        "timeUnit": "month",
        "field": "date",
        "type": "ordinal"
      },
      "y": {
        "aggregate": "count",
        "type": "quantitative"
      },
      "color": {
        "field": "weather",
        "type": "nominal"
      }
    }
};
vegaEmbed('#vis', yourVlSpec);
