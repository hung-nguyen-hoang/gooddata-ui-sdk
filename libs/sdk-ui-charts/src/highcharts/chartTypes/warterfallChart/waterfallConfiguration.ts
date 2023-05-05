// (C) 2007-2023 GoodData Corporation
import { IChartConfig } from "../../../interfaces";
import { HighchartsOptions, SeriesWaterfallOptions } from "../../lib";
import { alignChart } from "../_chartCreators/helpers";
// import { getPieResponsiveConfig } from "../_chartCreators/responsive";
import { getCommonResponsiveConfig } from "../_chartCreators/responsive";

export function getWaterfallConfiguration(config: IChartConfig): HighchartsOptions {
    const waterfallConfiguration = {
        chart: {
            type: "waterfall",
            events: {
                load() {
                    // const distance = -((this.series[0].points?.[0]?.shapeArgs?.r ?? 30) / 3);
                    const options: SeriesWaterfallOptions = {
                        type: "waterfall",
                        // dataLabels: {
                        //     distance,
                        // },
                        dataLabels: {
                            enabled: true,
                            style: {
                                fontWeight: "bold",
                            },
                        },
                    };
                    this.series[0].update(options);
                    alignChart(this, config.chart?.verticalAlign);
                },
            },
        },
        plotOptions: {
            waterfall: {
                size: "100%",
                allowPointSelect: false,
                dataLabels: {
                    enabled: false,
                },
                showInLegend: true,
            },
        },
        legend: {
            enabled: false,
        },
    };

    if (config?.enableCompactSize) {
        return {
            ...waterfallConfiguration,
            // responsive: getPieResponsiveConfig(),
            responsive: getCommonResponsiveConfig(),
        };
    }

    return waterfallConfiguration;
}
