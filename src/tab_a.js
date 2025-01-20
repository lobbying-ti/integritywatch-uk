// Import necessary libraries and stylesheets

// jQuery and related plugins
const jquery = require('jquery');
window.$ = window.jQuery = jquery;

require('jquery-ui-bundle');
require('jquery-ui-bundle/jquery-ui.css');
require('datatables.net')(window, $);
require('datatables.net-dt')(window, $);

// Underscore
import underscore from 'underscore';
window.underscore = window._ = underscore;

// Bootstrap and Popper.js
import '../public/vendor/js/popper.min.js';
import '../public/vendor/js/bootstrap.min.js';

// D3 for data fetching
import { csv, json } from 'd3-request';

// Stylesheets
import '../public/vendor/css/bootstrap.min.css';
import '../public/vendor/css/dc.css';
import '/scss/main.scss';

// Vue.js components
import Vue from 'vue';
import Loader from './components/Loader.vue';
import ChartHeader from './components/ChartHeader.vue';

// Vue Data Object
// This object is also used by the Vue instance to manage the application state.
var vuedata = {
  page: 'tabA',
  loader: true,
  readMore: false,
  showInfo: true,
  showShare: true,
  showAllCharts: true,
  chartMargin: 40,
  travelFilter: 'all',
  charts: {
    level: {
      title: 'Role',
      info: 'This pie chart shows the proportion of meetings hosted by political role. Click on the pie chart to filter the rest of the tool by role.'
    },
    department: {
      title: 'Top 10 Public offices',
      info: 'This bar chart shows the hosts which public offices have had the most contact with lobby organisations. Click on the bar chart to filter the rest of the tool by public office. Note: Due to issues with the source data, when UK Government hosts meet several lobby organisations in a single meeting, the tool counts it as one single meeting. The number of contacts with individual lobbyists can therefore be higher than the number of meetings diplayed on this portal.'
    },
    hosts: {
      title: 'TOP 10 HOSTS',
      info: 'This bar chart shows the hosts who have had the most contact with lobby organisations. Click on the bar chart to filter the rest of the tool by host.\n\n Note: Due to issues with the source data, when UK Government hosts meet several lobby organisations in a single meeting, the tool counts it as one single meeting. The number of contacts with individual lobbyists can therefore be higher than the number of meetings diplayed on this portal.'
    },
    organizations: {
      title: 'Top 10 Lobbyists',
      info: 'This bar chart shows lobby organisations who have had the most contact with hosts in the UK Government, Scottish Government, and Scottish Parliament. Click on the bar chart to filter the rest of the tool by lobby organisation.\n\n Note: Due to issues with the source data, this is only a rough figure for exploring the data. When UK Government hosts meet several lobby organisations in a single meeting, the tool counts it as one single meeting. The number of contacts between lobbyists and hosts can therefore be higher than the number of meetings diplayed on this portal. Conversely, when lobbyists meet multiple hosts in the Scottish Government or Parliament at the same time, we have split them out into individual rows.'
    },
    mainTable: {
      chart: null,
      type: 'table',
      title: 'Results',
      info: 'This table presents a list of meetings based on the filters you apply. Use the filters above to refine this view.For meetings with multiple hosts, each host is listed separately in the Scotland registry with all other meeting details remaining unchanged. You can see other hosts (if there are any) of the same meeting by clicking on the row'
    }
  },
  selectedElement: { "P": "", "Sub": "" },
  modalShowTable: '',
  colors: {
    generic: ["#981b48", "#b7255a", "#d73771", "#ec5189", "#ec7ca6"],
    default: "#d73771",
    default1: "#3694d1",
    colorSchemeCloud: ["#981b48", "#b7255a", "#d73771", "#ec5189", "#ec7ca6", "#f9b41b", "#e77a31", "#ffc138"]
  }
};

// Vue Components and App Initialization
Vue.component('chart-header', ChartHeader);
Vue.component('loader', Loader);

new Vue({
  el: '#app',
  data: vuedata,
  methods: {
    // Method to open a new window to download the dataset
    downloadDataset: function () {
      window.open('./data/iw_uk.csv');
    },
    // Method to share the current page on social media platforms
    share: function (platform) {
      if (platform == 'twitter') {
        var thisPage = window.location.href.split('?')[0];
        var shareText = 'Who’s lobbying ministers and legislators across the UK, when and why? ' + thisPage;
        var shareURL = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText);
        window.open(shareURL, '_blank');
        return;
      }
      if (platform == 'facebook') {
        var toShareUrl = 'https://openaccess.transparency.org.uk/';
        var shareURL = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(toShareUrl);
        window.open(shareURL, '_blank', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250,top=300,left=300');
        return;
      }
    },
    // Method to copy text to the clipboard
    copyToClipboard: function (elId) {
      var textToCopy = document.getElementById(elId);
      textToCopy.select();
      textToCopy.setSelectionRange(0, 99999);
      document.execCommand("copy");
      console.log("Copied: " + textToCopy.value);
    }
  }
});

// Initialize Bootstrap Popovers
$(function () {
  $('[data-toggle="popover"]').popover();
});

// Chart Definitions
// This section defines the configuration for each chart used in the application.
var charts = {
  level: { chart: dc.pieChart("#level_chart"), type: 'pie', divId: 'level_chart' },
  department: { chart: dc.rowChart("#department_chart"), type: 'row', divId: 'department_chart' },
  hosts: { chart: dc.rowChart("#hosts_chart"), type: 'row', divId: 'hosts_chart' },
  organizations: { chart: dc.rowChart("#organizations_chart"), type: 'row', divId: 'organizations_chart' },
  mainTable: { chart: null, type: 'table', divId: 'dc-data-table' }
};

// Utility Functions for Chart Responsiveness
// These functions calculate the appropriate dimensions for charts based on the container size.
var recalcWidth = function (divId) {
  return document.getElementById(divId).offsetWidth - vuedata.chartMargin;
};

var recalcCharsLength = function (width) {
  return parseInt(width / 8);
};

var calcPieSize = function (divId) {
  var newWidth = recalcWidth(divId);
  var sizes = {
    'width': newWidth,
    'height': 0,
    'radius': 0,
    'innerRadius': 0,
    'cy': 0,
    'legendY': 0
  };
  if (newWidth < 270) {
    sizes.height = newWidth + 170;
    sizes.radius = newWidth / 2;
    sizes.innerRadius = newWidth / 4;
    sizes.cy = newWidth / 2;
    sizes.legendY = newWidth + 30;
  } else {
    sizes.height = newWidth * 0.75 + 170;
    sizes.radius = (newWidth * 0.75) / 2;
    sizes.innerRadius = (newWidth * 0.75) / 4;
    sizes.cy = (newWidth * 0.75) / 2;
    sizes.legendY = (newWidth * 0.75) + 30;
  }
  return sizes;
};

// Function to Resize Graphs Responsively
// Iterates through each chart and updates its dimensions based on the current container size.
var resizeGraphs = function () {
  for (var c in charts) {
    if ((c == 'subject') && vuedata.showAllCharts == false) {
      continue;
    }
    var sizes = calcPieSize(charts[c].divId);
    var newWidth = recalcWidth(charts[c].divId);
    var charsLength = recalcCharsLength(newWidth);
    if (charts[c].type == 'row') {
      charts[c].chart.width(newWidth);
      charts[c].chart.label(function (d) {
        var thisKey = d.key;
        if (thisKey.indexOf('###') > -1) {
          thisKey = thisKey.split('###')[0];
        }
        if (thisKey.length > charsLength) {
          return thisKey.substring(0, charsLength) + '...';
        }
        return thisKey;
      });
      charts[c].chart.redraw();
    } else if (charts[c].type == 'bar') {
      charts[c].chart.width(newWidth);
      charts[c].chart.rescale();
      charts[c].chart.redraw();
    } else if (charts[c].type == 'pie') {
      charts[c].chart
        .width(sizes.width)
        .height(sizes.height)
        .cy(sizes.cy)
        .innerRadius(sizes.innerRadius)
        .radius(sizes.radius)
        .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function (d) {
          var thisKey = d.name;
          if (thisKey.length > charsLength) {
            return thisKey.substring(0, charsLength) + '...';
          }
          return thisKey;
        }));
      charts[c].chart.redraw();
    }
  }
};

// Function to Add Commas to Numbers for Better Readability
function addcommas(x) {
  if (parseInt(x)) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return x;
}

// Custom Date Sorting for DataTables
// Extends DataTables to handle European date format (dd/mm/yyyy).
var dmy = d3.timeParse("%d/%m/%Y");
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
  "date-eu-pre": function (date) {
    if (date.indexOf("Cancelled") > -1) {
      date = date.split(" ")[0];
    }
    return dmy(date);
  },
  "date-eu-asc": function (a, b) {
    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
  },
  "date-eu-desc": function (a, b) {
    return ((a < b) ? 1 : ((a > b) ? -1 : 0));
  }
});

// Function to Extract URL Parameters
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Generate a Random Parameter to Prevent Caching of Dynamically Loaded Data
var randomPar = '';
var randomCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for (var i = 0; i < 5; i++) {
  randomPar += randomCharacters.charAt(Math.floor(Math.random() * randomCharacters.length));
}

// Data Loading and Chart Generation
// This section fetches the main dataset and a supplementary dataset, processes them, and sets up the data visualization.
var lobbyist_typeList = {};

fetch('./data/iw_uk.json?' + randomPar)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(events => {
    csv('./data/wdtk_departments.csv?' + randomPar, (err, wdtkDepartments) => {
      var downloadStart = performance.now();

      // Data Preprocessing
      var parseDate = d3.timeParse("%d/%m/%Y");
      var now = Date.now();
      _.each(events, function (d) {
        d.purpose = d.purpose || "";
        d.date1 = d.date;
        d.date = d.date ? parseDate(d.date) : null;
        d.portfolio = '';
        d.ministerialLevel = "Others";
        switch (d.policy_level) {
          case 1:
            d.ministerialLevel = 'Minister';
            break;
          case 2:
            d.ministerialLevel = 'MSP';
            break;
          case 3:
            d.ministerialLevel = 'Special advisor';
            break;
          case 4:
            d.ministerialLevel = 'Senior civil servant';
            break;
        };
        var thisWdtkDep = _.find(wdtkDepartments, function (x) { return x.dep == d.department });
        d.department_wdtk = thisWdtkDep ? thisWdtkDep.wdtk_name : '';
        var requestBaseUrl = 'https://www.whatdotheyknow.com/new/';
        var orgString = d.organisation;
        if (orgString.length > 400) {
          orgString = orgString.slice(0, 400);
          var lastWord = orgString.lastIndexOf(' ');
          orgString = orgString.substring(0, lastWord) + ' ...';
        }
        var formTitle = encodeURI('FOI request: Meeting held on ' + d.date1 + ' with ' + d.rep_new + '.');
        var formMessage = 'Could you please acknowledge my request is being considered.\r\n'
          + 'For the meeting held on ' + d.date1 + ' between ' + d.rep_new + ' and ' + orgString + ', with purpose ' + d.purpose + '\r\ncould you please provide the following information:\r\n\r\n'
          + '• A full list of attendees, including full names and titles as well as who the attendee represents\r\n'
          + '• A copy of the meeting agenda\r\n'
          + '• Meeting notes/minutes taken during the meeting, as well as any briefing notes and papers\r\n'
          + '• Any correspondence associated with the attendees, including debriefs of the meeting via email or other forms of communication.\r\n';
        formMessage = encodeURI(formMessage);
        d.requestFullUrl = requestBaseUrl + d.department_wdtk + '?title=' + formTitle + '&default_letter=' + formMessage;
        d.meetingUrl = window.location.href.split('?')[0] + '?meeting=' + d.RecordId;
      });

      // Crossfilter Setup
      var ndx = crossfilter(events);
      var downloadEnd = performance.now();
      var downloadTime = downloadEnd - downloadStart;
      console.log("data load: " + downloadTime + " milliseconds");
      var downloadStart = performance.now();

      // Data Dimensions for Filtering
      var searchDimension = ndx.dimension(function (d) {
        var entryString = d.rep_new + " " + d.organisation + " " + d.purpose + " " + d.policy_level + " " + d.department + " " + d.ministerialLevel + " " + d.registrant_additional_information;
        return entryString.toLowerCase();
      });

      var dateEvent = ndx.dimension(function (d) {
        return d.date || "";
      });

      // Function to Export Filtered Data to CSV
      function exportFilteredData() {
        var allFilteredData = ndx.allFiltered();
        const csvRows = [];
        const headers = Object.keys(allFilteredData[0]);
        csvRows.push(headers.join(','));
        allFilteredData.forEach(row => {
          const values = headers.map(header => JSON.stringify(row[header]));
          csvRows.push(values.join(','));
        });
        const csvData = csvRows.join('\n');
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", 'filtered-data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      document.getElementById('exportButton').addEventListener('click', exportFilteredData);

      // Source Dimension and Filter Management
      var sourceDimension = ndx.dimension(function (d) {
        return d.portal_source;
      });

      var activeFilters = {
        'Scottish lobbying register': false,
        'UK Government': false
      };

      var activeTagFilters = [];

      // Function to Initialize Filter Buttons
      function initializeButton(buttonId, filterValue) {
        var button = document.getElementById(buttonId);
        button.style.backgroundColor = '#D3D3D3';
        button.addEventListener('click', function () {
          activeFilters[filterValue] = !activeFilters[filterValue];
          Vue.set(vuedata, 'loader', true);
          requestAnimationFrame(() => {
            applyFilters();
          });
        });
      }

      // Function to Apply Filters and Update UI
      function applyFilters() {
        var activeSourceFilterValues = Object.keys(activeFilters).filter(key => activeFilters[key]);

        if (activeSourceFilterValues.length === 0) {
          sourceDimension.filterAll();
        } else {
          sourceDimension.filter(function (d) {
            return activeSourceFilterValues.includes(d);
          });
        }

        if (activeTagFilters.length === 0) {
          tagDimension.filterAll();
        } else {
          tagDimension.filter(function (d) {
            const tags = d.split(', ');
            return activeTagFilters.some(filter => tags.includes(filter));
          });
        }

        dc.redrawAll();

        setTimeout(() => {
          updateButtonStyles();
          Vue.set(vuedata, 'loader', false);
        }, 0);
      }

      // Function to Update Button Styles Based on Active Filters
      function updateButtonStyles() {
        Object.entries(activeFilters).forEach(([filterValue, isActive]) => {
          var buttonId = filterValue === 'Scottish lobbying register' ? 'filter-source-button-scot' : 'filter-source-button-uk';
          var button = document.getElementById(buttonId);
          button.style.backgroundColor = isActive ? '#3694d1' : '#D3D3D3';
          button.style.boxShadow = isActive ? '0 2px 4px rgba(0, 0, 0, 0.5)' : 'none';
          button.disabled = false;
        });
      }

      // Tag Dimension and Filter Management
      var tagDimension = ndx.dimension(function (d) {
        return d.tag;
      });

      // Function to Toggle Filter State
      function toggleFilterState(filter) {
        const index = activeTagFilters.indexOf(filter);
        if (index === -1) {
          activeTagFilters.push(filter);
        } else {
          activeTagFilters.splice(index, 1);
        }
        applyFilters();
      }

      initializeButton('filter-source-button-scot', 'Scottish lobbying register');
      initializeButton('filter-source-button-uk', 'UK Government');

      // Filter Icons and Buttons
      const filterIcons = {
        Climate: 'leaf',
        Health: 'heart-pulse',
        Housing: 'house',
        Defence: 'shield-halved',
      };
      const filters = ['Climate', 'Health', 'Housing', 'Defence'];

      filters.forEach(filter => {
        const button = document.createElement('button');
        const iconName = filterIcons[filter];
        button.innerHTML = `<i class="fa fa-${iconName} icon-white"></i><strong class="dis-label">${filter}</strong>`;
        button.classList.add('filter-button');
        button.dataset.filter = filter;
        button.title = filter;

        button.addEventListener('click', function () {
          this.disabled = true;
          requestAnimationFrame(() => {
            vuedata.loader = true;

            setTimeout(() => {
              const filter = this.dataset.filter;
              toggleFilterState(filter);
              this.classList.toggle('active');
              this.style.backgroundColor = this.classList.contains('active') ? '#3694d1' : '';
              requestAnimationFrame(() => {
                this.disabled = false;
                vuedata.loader = false;
              });
            }, 0);
          });
        });

        document.getElementById('filter-buttons').appendChild(button);
      });

      // Chart 1: Level Chart
      var createLevelChart = function () {
        var order = ['Minister', 'MSP', 'Special advisor', 'Senior civil servant']
        var chart = charts.level.chart;
        var dimension = ndx.dimension(function (d) {
          return d.ministerialLevel;
        });
        var group = dimension.group().reduceSum(function (d) { return 1; });
        var sizes = calcPieSize(charts.level.divId);
        chart
          .width(sizes.width)
          .height(sizes.height)
          .cy(sizes.cy)
          .innerRadius(sizes.innerRadius)
          .radius(sizes.radius)
          .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function (d) {
            var thisKey = d.name;
            if (thisKey.length > 40) {
              return thisKey.substring(0, 40) + '...';
            }
            return thisKey;
          }))
          .title(function (d) {
            var thisKey = d.key;
            return thisKey + ': ' + d.value;
          })
          .dimension(dimension)
          .ordering(function (d) { return order.indexOf(d.key) })
          .ordinalColors(["#981b48", "#b7255a", "#d73771", "#ec5189", "#ccc"])
          .group(group);

        chart.render();
      }

      // Chart 2: Department Chart
      var createDepartmentChart = function () {
        var chart = charts.department.chart;
        var dimension = ndx.dimension(function (d) {
          return d.department;
        });
        var group = dimension.group().reduceSum(function (d) {
          return 1;
        });

        // Filtering to exclude departments with no records and limit to top 10
        var filteredGroup = (function (source_group) {
          return {
            all: function () {
              return source_group.all().filter(function (d) {
                return (d.value != 0);
              }).sort(function (a, b) {
                return b.value - a.value; // Sort by value in descending order
              }).slice(0, 10); // Take only the top 10
            }
          };
        })(group);

        var width = recalcWidth(charts.department.divId);
        var charsLength = recalcCharsLength(width);
        chart
          .width(width)
          .height(420)
          .margins({ top: 0, left: 0, right: 0, bottom: 20 })
          .group(filteredGroup) // Use the filtered and limited group
          .dimension(dimension)
          .colorCalculator(function (d, i) {
            return vuedata.colors.default;
          })
          .label(function (d) {
            if (d.key && d.key.length > charsLength) {
              return d.key.substring(0, charsLength) + '...';
            }
            return d.key;
          })
          .title(function (d) {
            return d.key + ': ' + d.value;
          })
          .elasticX(true)
          .xAxis().ticks(4);
        chart.render();
      }

      // Chart 3: Hosts Chart
// Chart 3: Hosts Chart
var createHostsChart = function () {
  var chart = charts.hosts.chart;
  var dimension = ndx.dimension(function (d) {
    return d.rep_new;
  });
  var group = dimension.group().reduceSum(function (d) {
    return 1;
  });
  var filteredGroup = (function (source_group) {
    return {
      all: function () {
        // Get the current crossfilter state including search filters
        var allData = source_group.all();
        
        // If no data after filtering, return empty array
        if (!allData.length) return [];
        
        // If we have a filter on this dimension, we should only show that host
        if (dimension.hasCurrentFilter()) {
          return allData.filter(function(d) {
            return d.key === dimension.currentFilter();
          });
        }
        
        // Otherwise show top 10 from filtered data
        return allData
          .filter(function(d) { return d.value > 0; })
          .sort(function(a, b) { return b.value - a.value; })
          .slice(0, 10);
      }
    };
  })(group);
  var width = recalcWidth(charts.hosts.divId);
  var charsLength = recalcCharsLength(width);

  chart
    .width(width)
    .height(420)
    .margins({ top: 0, left: 0, right: 0, bottom: 20 })
    .group(filteredGroup)
    .dimension(dimension)
    .colorCalculator(function (d, i) {
      return vuedata.colors.default;
    })
    .label(function (d) {
      if (d.key && d.key.length > charsLength) {
        return d.key.substring(0, charsLength) + '...';
      }
      return d.key;
    })
    .title(function (d) {
      return d.key + ': ' + d.value;
    })
    .elasticX(true)
    .xAxis().ticks(4);
  chart.render();
}

      // Chart 4: Organizations Chart
// Chart 4: Organizations Chart
var createOrganizationsChart = function () {
  var chart = charts.organizations.chart;
  var dimension = ndx.dimension(function (d) {
    return d.organisation;
  });
  var group = dimension.group().reduceSum(function (d) {
    return 1;
  });
  var filteredGroup = (function (source_group) {
    return {
      all: function () {
        // Get the current crossfilter state including search filters
        var allData = source_group.all();
        
        // If no data after filtering, return empty array
        if (!allData.length) return [];
        
        // If we have a filter on this dimension, we should only show that organization
        if (dimension.hasCurrentFilter()) {
          return allData.filter(function(d) {
            return d.key === dimension.currentFilter();
          });
        }
        
        // Otherwise show top 10 from filtered data
        return allData
          .filter(function(d) { return d.value > 0; })
          .sort(function(a, b) { return b.value - a.value; })
          .slice(0, 10);
      }
    };
  })(group);

  var width = recalcWidth(charts.organizations.divId);
  var charsLength = recalcCharsLength(width);

  chart
    .width(width)
    .height(420)
    .margins({ top: 0, left: 0, right: 0, bottom: 20 })
    .group(filteredGroup)
    .dimension(dimension)
    .colorCalculator(function (d, i) {
      return vuedata.colors.default1;
    })
    .label(function (d) {
      if (d.key && d.key.length > charsLength) {
        return d.key.substring(0, charsLength) + '...';
      }
      return d.key;
    })
    .title(function (d) {
      return d.key + ': ' + d.value;
    })
    .elasticX(true)
    .xAxis().ticks(4);
  chart.render();
}

      // Chart 5: Main Table
      var createTable = function () {
        var count = 0;
        charts.mainTable.chart = $("#dc-data-table").dataTable({
          "columnDefs": [
            {
              "searchable": false,
              "orderable": false,
              "targets": 0,
              data: function (row, type, val, meta) {

                return count;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 1,
              "defaultContent": "N/A",
              "data": function (d) {
                //id,function,party,institution,date,contact_type,org_name,lobbyist_type,purpose,purpose_details
                return d.rep_new;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 2,
              "defaultContent": "N/A",
              "data": function (d) {
                switch (d.policy_level) {
                  case 1:
                    return "Minister";
                  case 2:
                    return "MSP";  // Member of Scottish Parliament
                  case 3:
                    return "Special advisor";
                  case 4:
                    return "Senior civil servant";
                  default:
                    return "Not specified";  // Default case if none of the above
                }
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 3,
              "defaultContent": "N/A",
              "data": function (d) {
                return d.department;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 4,
              "defaultContent": "N/A",
              "data": function (d) {
                // Check if 'purpose' exists and is not null, then replace newlines; otherwise, return 'N/A'
                return d.purpose ? d.purpose.replace(/\n/g, "<br>") : "N/A";
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 5,
              "defaultContent": "N/A",
              "data": function (d) {
                return d.organisation;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 6,
              "defaultContent": "N/A",
              "type": "date-eu",
              "data": function (d) {
                if (!d.date) {
                  return d.date1;
                }
                return d.date.getDate() + "/" + (1 + d.date.getMonth()) + "/" + d.date.getFullYear();
              }
            }

          ],
          "iDisplayLength": 25,
          "bPaginate": true,
          "bLengthChange": true,
          "bFilter": false,
          "order": [[6, "desc"]],
          "bSort": true,
          "bInfo": true,
          "bAutoWidth": false,
          "bDeferRender": true,
          "aaData": searchDimension.top(Infinity),
          "bDestroy": true,
        });
        var datatable = charts.mainTable.chart;
        datatable.on('draw.dt', function () {
          var PageInfo = $('#dc-data-table').DataTable().page.info();
          datatable.DataTable().column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
          });
        });
        datatable.DataTable().draw();

        $('#dc-data-table tbody').on('click', 'tr', function () {
          var data = datatable.DataTable().row(this).data();
          vuedata.selectedElement = data;
          $('#detailsModal').modal();
        });
      }
      //REFRESH TABLE
      function RefreshTable() {
        dc.events.trigger(function () {
          var alldata = searchDimension.top(Infinity);
          charts.mainTable.chart.fnClearTable();
          charts.mainTable.chart.fnAddData(alldata);
          charts.mainTable.chart.fnDraw();
        });
      }

      //SEARCH INPUT FUNCTIONALITY

      var typingTimer;
      var doneTypingInterval = 1000;
      var $input = $("#search-input");

      // Keyup event to start the timer
      $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
      });

      // Keydown event to clear the timer
      $input.on('keydown', function () {
        clearTimeout(typingTimer);
      });

      function doneTyping() {
        var s = $input.val().toLowerCase();
        // Extract phrases in quotation marks and individual words outside quotation marks
        var phrases = s.match(/"[^"]+"|\S+/g) || [];

        searchDimension.filter(function (d) {
          var entry = d; // The current entry string to be searched
          var allMatch = true; // Flag to keep track of whether all search terms match

          phrases.forEach(function (phrase) {
            var exactMatch = phrase.startsWith('"') && phrase.endsWith('"');
            var searchPhrase = exactMatch ? phrase.slice(1, -1) : phrase;

            if (exactMatch) {
              // For exact phrase matches, check if the phrase exists in the entry as is
			                if (entry.indexOf(searchPhrase) === -1) allMatch = false;
            } else {
              // For non-exact (individual word) matches, ensure each word is present anywhere in the string
              var words = searchPhrase.split(" ");
              words.forEach(function (word) {
                if (entry.indexOf(word) === -1) allMatch = false;
              });
            }
          });

          return allMatch;
        });

        throttle();
      }

      var throttleTimer;
      function throttle() {
        window.clearTimeout(throttleTimer);
        throttleTimer = window.setTimeout(function () {
          dc.redrawAll();
        }, 250);
      }

      //DATEPICKER FUNCTIONALITY
      var inidate;
      var enddate;
      //Get current date for datepicker end date
      var currentDate = function (sp) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return (dd + sp + mm + sp + yyyy);
      };
      //Initialize datepicker
      var dateFormat = "dd/mm/yy",
        from = $("#from").datepicker({
          defaultDate: "01/01/2012",
          changeMonth: true,
          dateFormat: "dd/mm/yy"
        })
          .on("change", function () {
            to.datepicker("option", "minDate", getDate(this));
            inidate = getDate(this);
          }),
        to = $("#to").datepicker({
          defaultDate: currentDate("/"),
          changeMonth: true,
          dateFormat: "dd/mm/yy"
        })
          .on("change", function () {
            from.datepicker("option", "maxDate", getDate(this));
            enddate = getDate(this);
          });
      //Get date
      function getDate(element) {
        var date;
        try {
          date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
          date = null;
        }
        return date;
      }
      //Set ini and end default dates
      $("#from").val('01/01/2012');
      $("#to").val(currentDate("/"));
      inidate = $("#from").datepicker("getDate");
      enddate = $("#to").datepicker("getDate");

      //Date filter
      $("#datefilter").click(function () {
        dateEvent.filter(function (d) {
          return (d == "" || ((d.getTime() >= inidate.getTime()) && (d.getTime() <= enddate.getTime())));
        });
        throttle();
        var throttleTimer;
        function throttle() {
          window.clearTimeout(throttleTimer);
          throttleTimer = window.setTimeout(function () {
            dc.redrawAll();
          }, 250);
        }
      });

      function resetDatePickers() {
        var defaultStartDate = "01/01/2012";
        var defaultEndDate = currentDate("/");  // Calls the existing function to get the current date

        // Set the value of the datepickers
        $("#from").datepicker("setDate", defaultStartDate);
        $("#to").datepicker("setDate", defaultEndDate);

        // Update the internal variables to match the reset values
        inidate = $("#from").datepicker("getDate");
        enddate = $("#to").datepicker("getDate");
      }
      // Reset charts and filters
      var resetGraphs = function () {
        // Resetting charts that are not tables
        for (var c in charts) {
          if (charts[c].type !== 'table' && charts[c].chart.hasFilter()) {
            charts[c].chart.filterAll();
          }
        }

        // Resetting sourceDimension and tagDimension filters
        sourceDimension.filterAll();
        tagDimension.filterAll();

        // Additional resets you might have
        searchDimension.filterAll();
        dateEvent.filterAll();
        $('#search-input').val('');

        // Clear the activeSourceFilters object and activeTagFilters array
        activeFilters = {
          'Scottish lobbying register': false,
          'UK Government': false
        };
        activeTagFilters = [];

        // Reset all filter buttons to default state
        var buttons = document.getElementsByClassName('regbutton');
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].classList.remove('active');
          buttons[i].style.backgroundColor = '#D3D3D3';
          buttons[i].style.boxShadow = "none";
        }

        // Reset all tag filter buttons to default state
        filters.forEach(filter => {
          const button = document.querySelector(`[data-filter="${filter}"]`);
          if (button) {
            button.classList.remove('active');
            button.style.backgroundColor = '';
            button.style.boxShadow = '';
          }
        });

        // Apply the reset filters and update the UI
        applyFilters();

        // Redraw all charts to reflect the current state
        dc.redrawAll();
      }

      // Attaching the reset function to the reset button's click event
      $('.reset-btn').click(function () {
        this.disabled = true;

        // Use requestAnimationFrame to ensure loader is shown in the next frame
        requestAnimationFrame(() => {
          vuedata.loader = true; // Show loader

          // Defer the rest of the logic
          setTimeout(() => {
            resetGraphs();
            resetDatePickers(); // If you have a separate function for date pickers

            // Schedule the UI update to hide the loader and re-enable the button
            requestAnimationFrame(() => {
              this.disabled = false;
              vuedata.loader = false;
            });
          }, 0); // Execute the deferred logic immediately after the current call stack clears
        });
      });

      var downloadStart = performance.now();

      //Render charts
      createLevelChart();
      var downloadEnd = performance.now(); // End timing for download
      var downloadTime = downloadEnd - downloadStart; // Calculate download time
      console.log("Download time level: " + downloadTime + " milliseconds");
      var downloadStart = performance.now();

      createDepartmentChart();
      var downloadEnd = performance.now(); // End timing for download
      var downloadTime = downloadEnd - downloadStart; // Calculate download time
      console.log("department timze: " + downloadTime + " milliseconds");
      var downloadStart = performance.now();

      createHostsChart();
      var downloadEnd = performance.now(); // End timing for download
      var downloadTime = downloadEnd - downloadStart; // Calculate download time
      console.log("Download hosts: " + downloadTime + " milliseconds");
      var downloadStart = performance.now();

      createOrganizationsChart();
      var downloadEnd = performance.now(); // End timing for download
      var downloadTime = downloadEnd - downloadStart; // Calculate download time
      console.log("Download orgs: " + downloadTime + " milliseconds");
      var downloadStart = performance.now();

      createTable();
      var downloadEnd = performance.now(); // End timing for download
      var downloadTime = downloadEnd - downloadStart; // Calculate download time
      console.log("table timze: " + downloadTime + " milliseconds");

      $('.dataTables_wrapper').append($('.dataTables_length'));

      //Toggle last charts functionality and fix for responsiveness
      vuedata.showAllCharts = false;




      //Hide loader
      vuedata.loader = false;

      //COUNTERS
      //Main counter
      var all = ndx.groupAll();
      var counter = dc.dataCount('.dc-data-count')
        .dimension(ndx)
        .group(all);
      counter.render();
      //Update datatables
      counter.on("renderlet.resetall", function (c) {
        RefreshTable();
      });

      //Lobbyists counter
      function drawLobbyistsCounter() {
        var dim = ndx.dimension(function (d) {
          if (!d.organisation) {
            return "";
          } else {
            return d.organisation;
          }
        });
        var group = dim.group().reduce(
          function (p, d) {
            p.nb += 1;
            if (!d.organisation) {
              return p;
            }
            return p;
          },
          function (p, d) {
            p.nb -= 1;
            if (!d.Id) {
              return p;
            }
            return p;
          },
          function (p, d) {
            return { nb: 0 };
          }
        );
        group.order(function (p) { return p.nb });
        var counter = dc.dataCount(".count-box-orgs")
          .dimension(group)
          .group({
            value: function () {
              return group.all().filter(function (kv) {
                if (kv.value.nb > 0) {
                }
                return kv.value.nb > 0;
              }).length;
            }
          })
          .renderlet(function (chart) {
          });
        counter.render();
      }
      //drawLobbyistsCounter();

      //Window resize function
      window.onresize = function (event) {
        resizeGraphs();
      };

      //After loading charts, load meeting if meeting parameter in url is present
      if (getParameterByName('meeting')) {
        var preselectedMeetingId = getParameterByName('meeting');
        //Find meeting by id. If it exists set it as selectedElement and open modal
        var preselectedMeeting = _.find(events, function (x) { return x.RecordId == preselectedMeetingId });
        if (preselectedMeeting) {
          vuedata.selectedElement = preselectedMeeting;
          $('#detailsModal').modal();
        }
      }
    })
  }).catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
function toggleDropup() {
  const downloadDropdown = document.getElementById('download-dropdown'); // Target specific dropdown
  if (window.innerWidth <= 992) {
    downloadDropdown.classList.add('dropup');
  } else {
    downloadDropdown.classList.remove('dropup');
  }
}

// Listen for window resize events
window.addEventListener('resize', toggleDropup);

// Initial check on page load
window.addEventListener('DOMContentLoaded', toggleDropup);