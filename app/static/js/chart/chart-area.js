// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = "Nunito"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#858796";

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + "").replace(",", "").replace(" ", "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

// Bar Chart Out
const path = "./ajax/ajax-get.php";
fetch(path, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: "fetch_memos=''",
})
  .then((response) => {
    return response.text();
  })
  .then((result) => {
    let data = JSON.parse(result);

    const monthNames = [];
    const countsByMonth = [];

    for (const dataPoint of data) {
      const timestamp = new Date(dataPoint.timestamp);
      const monthName = timestamp.toLocaleString('default', { month: 'long' });

      const monthIndex = monthNames.indexOf(monthName);
      if (monthIndex === -1) {
        monthNames.push(monthName);
        countsByMonth.push(1);
      } else {
        countsByMonth[monthIndex]++;
      }
    }

    var ctxArea = document.getElementById("chartOutMemo");
    if (ctxArea) {
      const myChart = new Chart(ctxArea, {
        type: 'bar',
        data: {
          labels: monthNames,
          datasets: [{
            label: 'Incoming memorandum',
            data: countsByMonth,
            backgroundColor: ["#70CAC6", "#0094DE", "#F25A1D", "#F70000"],
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 1
              }
            }]
          }
        }
      });
    }
  })
  .catch(console.error);


// Bar Char In
fetch(path, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: "fetch_Inmemos=''",
})
  .then((response) => {
    return response.text();
  })
  .then((result) => {
    let data = JSON.parse(result);
    const monthNames = [];
    const countsByMonth = [];

    for (const dataPoint of data) {
      const timestamp = new Date(dataPoint.timestamp);
      const monthName = timestamp.toLocaleString('default', { month: 'long' });

      const monthIndex = monthNames.indexOf(monthName);
      if (monthIndex === -1) {
        monthNames.push(monthName);
        countsByMonth.push(1);
      } else {
        countsByMonth[monthIndex]++;
      }
    }


    const ctx = document.getElementById('chartInMemo');
    if (ctx) {

      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: monthNames,
          datasets: [{
            label: 'Incoming memorandum',
            data: countsByMonth,
            backgroundColor: ["#00953B", "#0094DE", "#F25A1D", "#F70000"],
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 1
              }
            }]
          }
        }
      });
    }
  })
  .catch(console.error);

