<template>
  <section>
    <nav class="sb-topnav navbar navbar-expand navbar-dark sticky-top">
      <a class="navbar-brand ps-3" href="index.html">Remote Control Car Waste Detection</a>
      <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
      </form>
      <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
            aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#!">Settings</a></li>
            <li><a class="dropdown-item" href="#!">Activity Log</a></li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li><a class="dropdown-item" href="#!">Logout</a></li>
          </ul>
        </li>
      </ul>
    </nav>
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
          <div class="sb-sidenav-menu">
            <div class="nav">
              <div class="sb-sidenav-menu-heading">Core</div>
              <a class="nav-link" href="index.html">
                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt" id="nav-link-icon"></i>Monitor</div>
              </a>
              <a class="nav-link">
                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt" id="nav-link-icon"></i><router-link
                    to="/historical" id="router-link">Historical Data</router-link></div>
              </a>
            </div>
          </div>
          <div class="sb-sidenav-footer">
            <div class="small">Logged in as:</div>
            Admin
          </div>
        </nav>
      </div>
    </div>
    <div v-if="$route.path === '/'" id="layoutSidenav_content">
      <main>
        <div class="container-fluid px-4">
          <h3 class="mt-4">Monitor</h3>
          <hr>
          <div class="row">
            <div class="col-xl-4 col-md-6">
              <div class="card text-white mb-4">
                <div class="card-body">Time : {{ currentData.currentTime }} </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-6">
              <div class="card text-white mb-4">
                <div class="card-body" id="location-id">Location : {{ currentData.Location }}</div>
              </div>
            </div>
            <div class="col-xl-4 col-md-6">
              <div class="card text-white mb-4">
                <div class="card-body">Weather : {{ currentData.Weather }}</div>
              </div>
            </div>
          </div>
          <div class="text-gray-700 flex flex-row flex-wrap items-center justify-center gap-1 break-all text-xs">
            <span class="text-gray-700 font-semibold uppercase mt-2 mr-2">Class :</span>
            <div class="data-class flex flex-wrap">
              <div class="break-normal mt-2 flex flex-wrap">
                <template v-for="(item, index) in currentData.Classes">
                  <div v-if="index === getFirstIndex(item)" :key="index" class="flex items-center">
                    <template v-if="countClass(item) > 1">
                      <span
                        class="transition-width relative flex h-6 select-none items-center justify-items-start overflow-hidden rounded-full border-2 text-xs shadow duration-200 ease-in-out w-16 px-2 bg-purple-50 border-purple-600 text-purple-600"
                        style="margin-right: 5px;">{{ item }} x {{ countClass(item) }}</span>
                    </template>
                    <template v-else>
                      <span
                        class="transition-width relative flex h-6 select-none items-center justify-items-start overflow-hidden rounded-full border-2 text-xs shadow duration-200 ease-in-out w-16 px-2 bg-purple-50 border-purple-600 text-purple-600"
                        :key="index" style="margin-right: 5px;">{{ item }}</span>
                    </template>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-xl-6">
              <div class="card mb-4">
                <div class="card-header">
                  <i class="fas fa-chart-area me-1"></i>
                  Image before prediction
                </div>
                <div class="card-show-image">
                  <div class="row">
                    <div class="col-xl-12">
                      <div id="image-carousel-1" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                          <div class="carousel-item active">
                            <!-- <img :src=currentData.Image_before_src :alt="currentData.Image_before_alt"
                              class="d-block w-100" width="100%" height="320" /> -->
                            <!-- <img id="camera-stream" src="http://172.20.10.3:5000/video_feed_original" alt="Camera Stream" -->
                            <!--   class="d-block w-100" width="100%" height="320"> -->
                            <img id="camera-stream" src="http://192.168.1.45:5000/video_feed_original"
                              alt="Camera Stream" class="d-block w-100" width="100%" height="320">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="card mb-4">
                <div class="card-header">
                  <i class="fas fa-chart-bar me-1"></i>
                  Result
                </div>
                <div id="capture-image" z-index="999">
                  <div class="card-show-image">
                    <div class="row">
                      <div class="col-xl-12">
                        <div id="image-carousel-2" class="carousel slide" data-bs-ride="carousel">
                          <div class="carousel-inner">
                            <div class="carousel-item active">
                              <!-- <img :src="currentData.Image_predict_src" :alt="currentData.Image_predict_alt"
                                class="d-block w-100" width="100%" height="320" /> -->
                              <!-- <img id="camera-stream" src="http://172.20.10.3:5000/video_feed_predicted" -->
                              <!--   alt="Camera Stream" class="d-block w-100" width="100%" height="320"> -->
                              <img id="camera-stream" src="http://192.168.1.45:5000/video_feed_predicted"
                                alt="Camera Stream" class="d-block w-100" width="100%" height="320">
                              <!-- <canvas id="canvas" style="display: none;"></canvas> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div>
            <div class="container-bottom">
              <section class="right-section mt-2">
                <canvas id="gasChart" width="400" height="200"></canvas>
              </section>
              <section class="right-section mt-5">
                <div v-for="(gas, index) in gas_data" :key="index" class="gas-data">
                  <div class="gas-info-column">
                    <div class="gas-info-row">
                      <span :style="{ color: gasColor[index].lpg }" class="gas-info">LPG: {{ gas.lpg }} ppm,</span>
                      <span :style="{ color: gasColor[index].smoke }" class="gas-info">SMOKE: {{ gas.smoke }}
                        ppm,</span>
                      <span :style="{ color: gasColor[index].ch4 }" class="gas-info">CH4: {{ gas.ch4 }} ppm,</span>
                      <span :style="{ color: gasColor[index].co2 }" class="gas-info">CO2: {{ gas.co2 }} ppm</span>
                    </div>
                  </div>
                  <div class="gas-info-column">
                    <div class="gas-info-row">
                      <span :style="{ color: gasColor[index].co }" class="gas-info">CO: {{ gas.co }} ppm,</span>
                      <span :style="{ color: gasColor[index].h2 }" class="gas-info">H2: {{ gas.h2 }} ppm,</span>
                      <span :style="{ color: gasColor[index].aceton }" class="gas-info">ACETON: {{ gas.aceton }}
                        ppm,</span>
                      <span :style="{ color: gasColor[index].nh4 }" class="gas-info">NH4: {{ gas.nh4 }} ppm</span>
                    </div>
                  </div>
                  <div class="gas-info-column">
                    <div class="gas-info-row">
                      <span :style="{ color: gasColor[index].propane }" class="gas-info">PROPANE: {{ gas.propane }}
                        ppm,</span>
                      <span :style="{ color: gasColor[index].alcohol }" class="gas-info">ALCOHOL: {{ gas.alcohol }}
                        ppm,</span>
                      <span :style="{ color: gasColor[index].tolueno }" class="gas-info">TOLUENO: {{ gas.tolueno }}
                        ppm</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <hr>
          </div>
        </div>
      </main>
    </div>
    <div v-else-if="$route.path === '/historical'" id="layoutSidenav_content">
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import Chart from 'chart.js/auto';
import mqtt from './utils/mqtt/subscribe.js'
import calculatePPM from './utils/mqsensor/calculate.js'
import { collection, addDoc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/firebase'
import html2canvas from 'html2canvas'
// import domtoimage from 'dom-to-image-more'
// import { saveAs } from 'file-saver'
export default {
  name: 'App',
  // mounted() {
  //   this.requestCameraStream();
  // },
  mounted() {
    setInterval(this.getTime, 1000);
    this.createGasChart();
    mqtt.initMqtt();
    setInterval(this.getMessage, 1000);
    setInterval(this.updateGasChart, 1000); // อัปเดตทุกๆ 1 วินาที
    setInterval(this.createData, 1000);
    // this.createData();
    // this.captureImage;
    // setInterval(this.captureImage(), 3000);
  },
  data() {
    return {
      simulatedData: [
        //data 1
        {
          Image_before_src: require('./assets/image-1.png'),
          Image_before_alt: 'Image_before_prediction',
          Image_predict_src: require('./assets/image-predict/image_predict_1.png'),
          Image_predict_alt: 'Image_Result',
          Time: '12:00 p.m.',
          Location: 'Bang Mueang Mai, Samut Prakarn ',
          Weather: '13° 7°',
          Classes: []
        },
        //data 2
        {
          Image_before_src: require('./assets/image-2.png'),
          Image_before_alt: 'Image_before_prediction',
          Image_predict_src: require('./assets/image-predict/image_predict_2.png'),
          Image_predict_alt: 'Image_Result',
          Time: '14:00 p.m.',
          Location: 'Chalong Krung 1, Lat Krabang',
          Weather: '19° 11°',
        },
        //data 3
        {
          Image_before_src: require('./assets/image-3.png'),
          Image_before_alt: 'Image_before_prediction',
          Image_predict_src: require('./assets/image-predict/image_predict_3.png'),
          Image_predict_alt: 'Image_Result',
          Time: '15:35 p.m.',
          Location: 'Bang Mot, Krung Thep Maha Nakhon',
          Weather: '14° 11°',
        },
      ],
      captured_image: 'http://192.168.1.45:5000/video_feed_predicted',
      captureImageURL: '',
      currentDataIndex: 0,
      currentTime: '',
      gas_data: [{
        lpg: 0.0,
        smoke: 0.0,
        ch4: 0.0,
        co2: 0.0,
        co: 0.0,
        h2: 0.0,
        aceton: 0.0,
        nh4: 0.0,
        propane: 0.0,
        alcohol: 0.0,
        tolueno: 0.0
      }],
      gasChart: null
    };
  },
  methods: {
    // nextData() {
    //   this.currentDataIndex = (this.currentDataIndex + 1) % this.simulatedData.length;
    // },
    // prevData() {
    //   this.currentDataIndex = (this.currentDataIndex - 1 + this.simulatedData.length) % this.simulatedData.length;
    // },
    goToHistorical() {
      this.$router.push('/historical');
    },
    countClass(className) {
      return this.currentData.Classes.filter(item => item === className).length;
    },
    getFirstIndex(className) {
      return this.currentData.Classes.findIndex(item => item === className);
    },
    formatClassName(className) {
      const count = this.countClass(className);
      if (count > 0) {
        return this.currentData.Classes.slice();
      } else {
        return className;
      }
    },
    async createData() {
      try {
        const amount = this.currentData.Classes.length;
        const classes = this.currentData.Classes.slice();

        if (amount > 0) {
          await this.captureImage();
          await addDoc(collection(db, "waste"), {
            class: classes,
            image: this.captureImageURL,
            // image: "https://firebasestorage.googleapis.com/v0/b/waste-detection-61420.appspot.com/o/historical-images%2FV0o8ecEvsazqgekZGdjz%2Fimage.png?alt=media&token=8a65fb20-899d-4962-93fe-928eb8a13ed2",
            locaiton: "Bang Mot, Krung Thep Maha Nakhon",
            time: this.currentData.currentTime,
            weather: "18° 11°",
          });
          console.log("Create data success!");
        }
      } catch (error) {
        console.log("Error create data", error.message);
      }
    },
    async uploadImage() {
      const blob = this.captureImageURL;
      const storageRef = ref(storage, 'historical-images/captured_image.jpg');
      const metadata = {
        contentType: 'image/jpeg'
      };

      try {
        const snapshot = await uploadBytes(storageRef, blob, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        this.captureImageURL = downloadURL;

        // console.log('File available at', this.captureImageURL);
        return downloadURL;
        // alert('Upload successful: ' + downloadURL);
      } catch (error) {
        console.error('Upload failed:', error);
        // alert('Upload failed: ' + error.message);
      }
    },
    // captureImage() {
    //   const element = document.getElementById('capture-image');
    //   // const amount = this.currentData.Classes.length;
    //   // if (element && amount > 0) {
    //   if (element) {
    //     html2canvas(element).then((canvas) => {
    //       const dataURL = canvas.toDataURL("image/png");
    //       this.captureImageURL = dataURL;
    //
    //       // console.log(dataURL);
    //       // return dataURL;
    //       // this.captureImageURL = dataURL;
    //       console.log(this.captureImageURL);
    //     })
    //   } else {
    //     console.error("Element not found");
    //   }
    // },
    captureImage() {
      return new Promise((resolve, reject) => {
        const element = document.getElementById('capture-image');
        if (element) {
          html2canvas(element, {
            allowTaint: true,
            useCORS: true,
            logging: false,
            height: window.outerHeight + window.innerHeight,
            windowHeight: window.outerHeight + window.innerHeight,
          }).then((canvas) => {
            const dataURL = canvas.toDataURL("image/png");
            this.captureImageURL = dataURL;
            // console.log(this.captureImageURL);
            resolve(); // Resolve the Promise once the capture is completed
            // return dataURL;
          }).catch(error => {
            console.error("Error capturing image:", error);
            reject(error); // Reject the Promise if there's an error
          });
        } else {
          console.error("Element not found");
          reject(new Error("Element not found")); // Reject the Promise if element is not found
        }
      });
    },
    getMessage() {
      var message = mqtt.getMessage();
      if (message) {
        {
          var results = JSON.parse(message);
          // console.log(results.mq_data)
          this.getClassesPredicted(results.class_predicted);
          var value = calculatePPM(results.mq_data);
          this.gas_data[0].lpg = value.LPG;
          this.gas_data[0].smoke = value.Smoke;
          this.gas_data[0].ch4 = value.CH4;
          this.gas_data[0].co2 = value.CO2;
          this.gas_data[0].co = value.CO;
          this.gas_data[0].h2 = value.H2;
          this.gas_data[0].aceton = value.ACETON;
          this.gas_data[0].nh4 = value.NH4;
          this.gas_data[0].propane = value.Propane;
          this.gas_data[0].alcohol = value.Alcohol;
          this.gas_data[0].tolueno = value.TOLUENO;
        }
      }
    },
    getClassesPredicted(class_predicted) {
      // console.log('Class predictions received: ', class_predicted);
      this.currentData.Classes = class_predicted;
      // console.log('Updated currentData.Classes: ', this.currentData.Classes);
    },
    createGasChart() {
      const ctx = document.getElementById('gasChart').getContext('2d');
      this.gasChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['LPG', 'Smoke', 'CH4', 'CO2', 'CO', 'H2', 'ACETON', 'NH4', 'PROPANE', 'ALCOHOL', 'TOLUENO'],
          datasets: [{
            label: 'Gas Sensors',
            data: [this.gas_data[0].lpg, this.gas_data[0].smoke, this.gas_data[0].ch4, this.gas_data[0].co2, this.gas_data[0].co, this.gas_data[0].h2, this.gas_data[0].aceton, this.gas_data[0].nh4, this.gas_data[0].propane, this.gas_data[0].alcohol, this.gas_data[0].tolueno],
            backgroundColor: 'rgba(157, 178, 212, 0.8)',
            borderColor: 'rgba(228, 233, 241, 0.8)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },
    getTime() {
      const date = new Date();
      const day = date.getDate().toString().padStart(2, '0');
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedTime = `${day} ${month} ${year} ${formattedHours}:${minutes} ${ampm}`;
      // console.log(formattedTime);
      this.currentData.currentTime = formattedTime;
    },
  },
  computed: {
    currentData() {
      return this.simulatedData[this.currentDataIndex];
    },
    gasColor() {
      return this.gas_data.map(gas => ({
        lpg: gas.lpg > 10 ? 'red' : 'inherit',
        smoke: gas.smoke > 10 ? 'red' : 'inherit',
        ch4: gas.ch4 > 10 ? 'red' : 'inherit',
        co2: gas.co2 > 10 ? 'red' : 'inherit',
        co: gas.co > 10 ? 'red' : 'inherit',
        h2: gas.h2 > 10 ? 'red' : 'inherit',
        aceton: gas.aceton > 10 ? 'red' : 'inherit',
        nh4: gas.nh4 > 10 ? 'red' : 'inherit',
        propane: gas.propane > 10 ? 'red' : 'inherit',
        alcohol: gas.alcohol > 10 ? 'red' : 'inherit',
        tolueno: gas.tolueno > 10 ? 'red' : 'inherit'
      }));
    },
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
#layoutSidenav {
  background-color: #212529;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 190px;
  overflow-y: auto;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

#layoutSidenav_nav {
  background-color: #212529;
  position: relative;
  height: 100%;
}

#layoutSidenav_content {
  margin-left: 225px;
}

.sb-sidenav {
  position: relative;
  width: 200px;
  height: 100%;
  overflow-y: auto;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.sb-sidenav-dark {
  background-color: #212529;
}

.sb-sidenav-menu {
  padding: 0;
  margin: 0;
  list-style: none;
}

.sb-sidenav-menu-heading {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
  text-transform: uppercase;
  padding: 15px 0;
  margin-top: 3.5rem;
  margin-left: 0.5rem;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.15);
}

.nav {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style: none;
}

.nav-link {
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem !important;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 0.25rem;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.nav-link:hover,
.nav-link:focus {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.15);
}

.nav-link.active {
  color: #fff;
  background-color: #ececec;
}

.sb-nav-link-icon {
  display: flex !important;
  align-items: center;
  white-space: nowrap;
  width: 30px;
  margin-right: 0.1px;
  color: #5a5959;
}

#nav-link-icon {
  margin-right: 0.5rem;
}

.sb-sidenav-menu .nav-link:hover .sb-nav-link-icon,
.sb-sidenav-menu .nav-link:focus .sb-nav-link-icon {
  color: #fff;
}

.sb-sidenav-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px 15px;
  background-color: #292b2c;
  color: rgba(255, 255, 255, 0.5);
}

#layoutSidenav {
  border-radius: 0.25rem;
}

/* navbar styles */
.navbar {
  padding: 0.5rem 1rem;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: #434141;
}

.navbar-expand {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.navbar-dark {
  color: rgba(255, 255, 255, 0.7);
  background-color: #393939;
}

.navbar-brand {
  font-size: 1rem !important;
  display: inline-block;
  padding: .5rem 1rem;
  line-height: inherit;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.7);
}

.btn-link {
  box-shadow: none;
  color: rgba(255, 255, 255, 0.7);
}

.card-body {
  background-color: #304856;
  padding: 20px;
  /* เพิ่ม padding ด้านใน */
  margin: 10px;
  /* เพิ่ม margin รอบๆ */
  text-align: center;
  /* ปรับ text-align ของเนื้อหาภายใน */
}

.button-container {
  display: flex;
  justify-content: center;
  /* justify-content: space-between; */
  margin-top: 1rem;
}

.btn-prev,
.btn-next {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  margin-right: 30px;
  width: 100px;
  cursor: pointer;
}

#btn-prev {
  background-color: #c2c2c2;
}

#btn-next {
  background-color: #319b36;
  color: white;
}

#router-link {
  display: flex !important;
  align-items: center;
  white-space: nowrap;
  width: 30px;
  margin-right: 0.1px;
  color: #5a5959;
  text-decoration: none
}

.container-bottom {
  display: flex;
}

.left-section {
  flex: 1;
}

.right-section {
  margin-left: 20px;
  flex: 1;
  justify-content: center;
}

.gas-data {
  display: grid;
  gap: 10px;
}

.gas-info-row {
  font-size: 13px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gas-info {
  margin: 0 5px;
}

/* For screens larger than 768px */
@media (min-width: 768px) {
  .container-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .left-section {
    flex: 1;
    margin-right: 10px;
    /* Adjust margin as needed */
  }

  .right-section {
    flex: 1;
    margin-left: 10px;
    /* Adjust margin as needed */
  }
}

.left-section {
  display: flex;
  flex-wrap: wrap;
}

.data-class {
  display: flex;
  flex-wrap: wrap;
}

.data-class>div {
  margin-right: 5px;
  margin-bottom: 5px;
}

/* For screens smaller than 768px */
@media (max-width: 767px) {
  .container-bottom {
    display: flex;
    flex-direction: column;
  }

  .left-section,
  .right-section {
    width: 100%;
    margin: 0;
    /* Reset margin */
  }
}
</style>
