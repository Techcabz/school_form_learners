// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = "Nunito"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';

Chart.defaults.global.defaultFontColor = "#858796";
const pathx = "./ajax/ajax-get.php";
fetch(pathx, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: "fetch_total_users=''",
})
  .then((response) => {
    return response.text();
  })
  .then((result) => {
    let data = JSON.parse(result);

    let user = [];
    for (let count = 0; count < data.length; count++) {
      if (data[count].user_type == data[count].user_type) {
        user.push(data[count].user_type);
      }
    }

    let counts = {};
    user.forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });

    let usertypes = [];
    let usertypescount = [];
    let userobj = Object.entries(counts);

    userobj.forEach((da) => {
      usertypes.push(da[0]);
      usertypescount.push(da[1]);
    });

    var ctxPie = document.getElementById("myPieChartUsers");
    if (ctxPie) {
      new Chart(ctxPie, {
        type: 'pie',
        data: {
          labels: usertypes,
          datasets: [{
            label: '# of Votes',
            data: usertypescount,
            borderWidth: 1,
            backgroundColor: ["#36b9cc", "#1cc88a", "#FFCB6B"],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
          }]
        },
        options: {

          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: "#dddfeb",
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
          },
          legend: {
            display: true,
          },
        },
      });
    }

  });
