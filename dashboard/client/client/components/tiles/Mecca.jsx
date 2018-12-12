


export default class Contents_Mecca extends React.Component {
    constructor(props) {
        super(props);

        this.width = 400;
        this.height = 200;

        this.svgId = 'mecca_coverage';
    }

    drawBarGraph(dataset, parent, width, height) {
        var barWidth = (width / dataset.length);
        parent.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("y", (d) => height - d)
            .attr("height", (d) => d)
            .attr("width", barWidth)
            .attr("transform", function (d, i) {
                 var translate = [barWidth * i, 0];
                 return "translate("+ translate +")";
            })
            .attr("fill", (d) => {
                const badNumber = 100;
                const red = Math.min(255 * (d/badNumber), 255);
                const green = Math.min(255 / (d/badNumber), 255);

                // Send a muted version so our eyes don't bleed
                return `rgb(${red * 0.7}, ${green * 0.7}, 20)`;
            })
    }

    drawLineGraph(dataset, parent, width, height) {
        var x = d3.scaleTime().rangeRound([0, width]);
        var y = d3.scaleLinear().rangeRound([height, 0]);

        var line = d3.line()
           .x(function(d) { return x(d.date)})
           .y(function(d) { return y(d.value)})

           x.domain(d3.extent(dataset, function(d) { return d.date }));
           y.domain(d3.extent(dataset, function(d) { return d.value}));

        parent.append("path")
            .datum(dataset)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 2)
            .attr("d", line);
    }

    componentDidMount() {
        var svg = d3.select('#' + this.svgId);
        this.drawBarGraph(this.props.lint, svg, this.width, this.height);
        this.drawLineGraph(this.props.coverage, svg, this.width, this.height);
    }

    render() {
        return <div>
            <svg id={this.svgId} width={this.width} height={this.height} style={{
                    backgroundColor: '#FFF',
                }}>
            </svg>
        </div>;
    }
}
