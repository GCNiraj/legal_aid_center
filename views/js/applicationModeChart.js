(async function () {
  const data = {
    labels: ["Online Application", "Referrals", "Walk In"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  new Chart(document.getElementById("acquisitions"), {
    type: "pie",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
          text: "Chart.js Pie Chart",
        },
      },
    },
  });
})();

(async function () {
  const data = {
    labels: [
      "Criminal",
      "Civil",
      "Settled",
      "Active",
      "Eligible",
      "Ineligible",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100, 20, 10, 20],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 105, 86)",
          "rgb(255, 205, 186)",
          "rgb(155, 205, 86)",
          "rgb(235, 105, 186)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  new Chart(document.getElementById("case-types-pie"), {
    type: "pie",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
          text: "Chart.js Pie Chart",
        },
      },
    },
  });
})();

(async function () {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  new Chart(document.getElementById("cases-line-graph"), {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
          text: "Chart.js Line Chart",
        },
      },
    },
  });
})();
