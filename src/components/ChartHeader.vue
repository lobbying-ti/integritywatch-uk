<template>
  <div class="chart-header row">
    <div class="chart-title col-9">{{ title }}</div>
    <div class="chart-header-buttons col-3">
      <button type="button" class="btn btn-secondary btn-info" data-container="body" data-toggle="popover" data-html="true" data-placement="bottom" :data-content="info">
        i
      </button>
      <!-- Conditionally render the download button -->
      <button v-if="showDownloadButton" id="exportButton" class="btn btn-download" title="Download filtered data">
<i class="fa-solid fa-download fa-sm" id="downloader"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartHeader',
  props: {
    title: String,
    info: String,
    bg: String,
    color: String,
    // New prop for conditional rendering of the download button
    showDownloadButton: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // Initialize tooltips
    this.$nextTick(() => {
      $('[data-toggle="popover"]').popover();
      // Only attempt to initialize the tooltip for the download button if it's supposed to be shown
      if (this.showDownloadButton) {
        $('#exportButton').tooltip(); // Initialize Bootstrap tooltip for the download button
      }
    });
  }
}
</script>


<style scoped lang="scss">
$color_TI: #0d506b;
$color_TI_darker: darken( $color_TI, 20% );
#downloader {color:white}
.chart-header {
  padding: 10px 5px;
  margin: 0;
  background: #fafafa;
  .chart-title {
    font-size: 19px;
    text-align: left;
    text-transform: uppercase;
    color: $color_TI_darker;
    @media only screen and (max-width: 1410px) {
      font-size: 18px;
    }
    @media only screen and (max-width: 1300px) {
      font-size: 16px;
    }
    @media only screen and (max-width: 767px) {
      font-size: 18px;
    }
  }
  .chart-header-buttons {
  display:flex;
  justify-content: flex-end;
   align-items: center; 
   gap: 5px;
    text-align: right;
    .btn-info {
      padding: 0px 10px;
      border-radius: 2px;
      font-weight: 600;
      background: $color_TI;
      border: none;
	  max-height:24.83px
    }
    .btn-download {
      background-color: #3694d1;
	  min-height: 24.83px;
      border: none;
      cursor: pointer;
      padding: 6px;
      border-radius: 2px;
      margin-left: 5px; // Space between info button and download button

      svg {
        fill: white; // SVG icon color
      }
    }
    .btn-download:hover {
      background-color: #1a6a9e;
    }
  }
}
</style>
