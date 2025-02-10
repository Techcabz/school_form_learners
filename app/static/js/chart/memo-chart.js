var allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Create an empty data array with all months and initial values of 0
var chartInData = [];
var chartOutData = [];

for (var i = 0; i < allMonths.length; i++) {
    chartInData.push({
        name: allMonths[i],
        y: 0
    });

    chartOutData.push({
        name: allMonths[i],
        y: 0
    });
}

const path_in = "./ajax/ajax-get.php";
fetch(path_in, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "incomingreport=''",
}).then((response) => {
    return response.text();
}).then((result) => {
    let data = JSON.parse(result);

    $.each(data, function (index, item) {
        var monthIndex = allMonths.indexOf(item.month);

        if (monthIndex !== -1) {
            chartInData[monthIndex].y = parseInt(item.count);
        }
    });

    // Update the chart with the retrieved data
    if (chartIn) {
        chartIn.series[0].setData(chartInData);
    }

}).catch(console.error);

// incoming
fetch(path_in, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "outgoingsreport=''",
}).then((response) => {
    return response.text();
}).then((result) => {
    let data = JSON.parse(result);

    $.each(data, function (index, item) {
        var monthIndex = allMonths.indexOf(item.month);

        if (monthIndex !== -1) {
            chartOutData[monthIndex].y = parseInt(item.count);
        }
    });

    // Update the chart with the retrieved data
    if (chartOut) {
        chartOut.series[0].setData(chartOutData);
    }


}).catch(console.error);




let reportIncoming = document.getElementById('reportIncoming');
if (reportIncoming) {
    var chartIn = Highcharts.chart(reportIncoming, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'INCOMING MEMORANDUM REPORT',
            align: 'left'
        },
        subtitle: {
            text: 'Overall Incoming Memorandum Total',
            align: 'left'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
                showInLegend: true
            }
        },
        exporting: {
            menuItemDefinitions: {
                printChart: {
                    onclick: function () {
                        this.print();
                    },
                    text: 'PRINT CHART'
                }
            },
            buttons: {
                contextButton: {
                    menuItems: ['printChart', 'separator', 'downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
                }
            }
        },
        series: [{
            name: 'Memo file by month',
            colorByPoint: true,
            data: chartInData
        }]
    });
}

let reportOutgoing = document.getElementById('reportOutgoing');
if (reportOutgoing) {
    var chartOut = Highcharts.chart(reportOutgoing, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'OUTGOING MEMORANDUM REPORT',
            align: 'left'
        },
        subtitle: {
            text: 'Overall Outgoing Memorandum Total',
            align: 'left'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
                showInLegend: true
            }
        },
        exporting: {
            menuItemDefinitions: {
                printChart: {
                    onclick: function () {
                        this.print();
                    },
                    text: 'PRINT CHART'
                }
            },
            buttons: {
                contextButton: {
                    menuItems: ['printChart', 'separator', 'downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
                }
            }
        },
        series: [{
            name: 'Memo file by month',
            colorByPoint: true,
            data: chartOutData
        }]
    });

}

// userslet chartUsers;

let chartUsers;
let userTypes = [];
let userData = [];

function convertToTitleCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

fetch(path_in, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "usersreport=''",
}).then((response) => {
    return response.text();
}).then((result) => {
    let data = JSON.parse(result);

    const counts = [];

    data.forEach(item => {
        userTypes.push(item.user_type);
        counts.push(parseInt(item.count));
    });

    userTypes.forEach((userType, index) => {
        userData.push({
            name: convertToTitleCase(userType),
            data: [counts[index]],
        });
    });

    // Convert userTypes to title case
    let convertedUserTypes = userTypes.map(convertToTitleCase);

    // Updating the chart with the retrieved data
    let reportUsers = document.getElementById('reportUsersGraph');
    if (reportUsers) {
        chartUsers = Highcharts.chart(reportUsers, {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Users Report'
            },
            subtitle: {
                text: 'Overall Users Total'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                    }
                }
            },
            exporting: {
                menuItemDefinitions: {
                    printChart: {
                        onclick: function () {
                            this.print();
                        },
                        text: 'PRINT CHART'
                    }
                },
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'separator', 'downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
                    }
                }
            },
            xAxis: {
                categories: convertedUserTypes,
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: userData
        });
    }
}).catch(console.error);
