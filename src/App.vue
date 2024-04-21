<template>
  <section>
    <nav class="sb-topnav navbar navbar-expand navbar-dark">
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
                <div class="card-body">Time : {{ currentData.Time }} </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-6">
              <div class="card text-white mb-4">
                <div class="card-body">Location : {{ currentData.Location }}</div>
              </div>
            </div>
            <div class="col-xl-4 col-md-6">
              <div class="card text-white mb-4">
                <div class="card-body">Weather : {{ currentData.Weather }}</div>
              </div>
            </div>
          </div>
          <div class="row">
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
                              <img id="camera-stream" src="http://127.0.0.1:5000/video_feed" alt="Camera Stream" class="d-block w-100" width="100%" height="320">
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
                <div>
                  <div class="card-show-image">
                    <div class="row">
                      <div class="col-xl-12">
                        <div id="image-carousel-2" class="carousel slide" data-bs-ride="carousel">
                          <div class="carousel-inner">
                            <div class="carousel-item active">
                              <img :src="currentData.Image_predict_src" :alt="currentData.Image_predict_alt"
                                class="d-block w-100" width="100%" height="320" />
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
          <section>
            <!-- <div class="button-container">
            <v-btn v-on:click="prevData" class="btn btn-prev" id="btn-prev">Prevent</v-btn>
            <v-btn v-on:click="nextData" class="btn btn-next" id="btn-next">Next</v-btn>
          </div> -->
            <div class="text-gray-700 flex flex-row flex-wrap items-center justify-center gap-1 break-all text-xs">
              <span class="text-gray-700 text-[100px] font-semibold uppercase mt-2 mr-2">Class :</span>
              <div class="data-class flex flex-wrap">
                <div class="break-normal mt-2 flex">
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
          </section>
        </div>
      </main>
    </div>
    <div v-else-if="$route.path === '/historical'" id="layoutSidenav_content">
      <router-view></router-view>
    </div>
  </section>
</template>
<!-- class="card-show-content" -->
<script>
export default {
  name: 'App',
  mounted() {
    this.requestCameraStream();
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
          Classes: [
            "Battery",
            "Battery", 
            "Battery",
            "Cosmetic",
            "Face-mask",
            "Face-mask",
            "Foam-box",
            "Metal-can",
            "Paint-bucket",
            "Plastic-bag",
            "Plastic-bottle",
            "Plastic-box",
            "Rubber-gloves"
          ]
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
      currentDataIndex: 0,
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
      if (count > 1) {
        return `${className} x${count}`;
      } else {
        return className;
      }
    },
    requestCameraStream() {
      var xhr = new XMLHttpRequest();
      
      xhr.onload = function() {
        if (xhr.status === 200) {
          var imageData = xhr.responseText;
          document.getElementById('camera-stream').src = 'data:image/jpeg;base64,' + imageData;
          // เรียกเมทอดนี้อีกครั้งเพื่อร้องขอภาพใหม่
          this.requestCameraStream();
        } else {
          console.log('Request failed. Status: ' + xhr.status);
        }
      }.bind(this);

      var url = 'http://127.0.0.1:5000/video_feed';
      xhr.open('GET', url, true);
      xhr.send();
    }
  },
  computed: {
    currentData() {
      return this.simulatedData[this.currentDataIndex];
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
</style>