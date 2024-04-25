<template>
  <section>
    <main>
      <section>
        <h3 class="mt-4">Historical Data</h3>
        <hr>
        <div class="mt-2 flex flex-wrap justify-start space-x-4">
          <button id="historicalFilterBtn"
            class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            Class :
          </button>
          <div class="checkbox-group">
            <label v-for="(classItem, index) in classes" :key="index" class="checkbox-label inline-flex items-center">
              <input type="checkbox" class="form-checkbox text-purple-600" :value="classItem" v-model="selectedClasses">
              <span class="ml-2 text-gray-700">{{ classItem }}</span>
            </label>
          </div>
        </div>
        <hr>
        <div class="h-full pb-6">
          <ul class="grid grid-cols-1 gap-1 md:grid-cols-1 lg:grid-cols-2">
            <div v-for="(item, index) in filteredData" :key="index"
              class="SearchResultImageItem data-image-id={source.id} group relative flex-grow" :data-image-id="item.id"
              @click="openModal(item)">
              <div
                class="absolute right-0 top-0 z-30 flex h-5 w-5 items-center justify-center rounded-md border transition duration-200  invisible border-purboflow-300 bg-white bg-opacity-20 text-purboflow-300 hover:cursor-copy hover:bg-opacity-80 hover:text-purboflow-400 group-hover:visible">
                <i class="far fa-check pt-[.125rem] text-xs text-purboflow-300"></i>
                <input class="absolute right-0 top-0 m-0 h-6 w-6 cursor-copy p-0 opacity-0 hover:cursor-copy"
                  type="checkbox">
              </div>
              <div
                class="absolute right-7 top-0 z-30 h-5 w-5 rounded-md border invisible border-purboflow-300 bg-white bg-opacity-20 text-purboflow-300 hover:cursor-copy hover:bg-opacity-80 hover:text-purboflow-400 group-hover:visible">
                <button
                  class="previewImageControls flex h-full w-full items-center justify-center rounded text-xs transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-purboflow-300/20 focus:ring-offset-2 focus:ring-offset-purboflow-300/20 fas fa-expand-alt"
                  type="button" aria-label="Preview image"></button>
              </div>
              <a class="block">
                <div
                  class="border-transparent group-hover:border-purboflow-400 group-hover:border-opacity-30 group-hover:bg-purboflow-500 group-hover:bg-opacity-10 flex flex-row justify-start gap-2  rounded-md border  border-transparent  p-3 transition duration-200 hover:shadow-md">
                  <div class="relative h-auto w-[72px] cursor-pointer">
                    <img class="absolute h-full w-full rounded object-cover" :src="item.image">
                  </div>
                  <div class="flex flex-col justify-between">
                    <div class="text-gray-600 flex h-6 flex-row items-center gap-1 break-all text-xs font-normal">
                      <span class="text-gray-700 text-[10px] font-semibold uppercase">Location :</span>
                      {{ item.location }}
                    </div>
                    <div
                      class="text-gray-600 relative flex h-6 flex-row items-center gap-1 break-all text-xs font-normal">
                      <span class="text-gray-700 relative text-[10px] font-semibold uppercase">Weather :</span>{{
                        item.weather }}
                    </div>
                    <div
                      class="text-gray-600 relative flex h-6 flex-row items-center gap-1 break-all text-xs font-normal">
                      <span class="text-gray-700 relative text-[10px] font-semibold uppercase">Time :</span>
                      <div class="tagWrapper relative h-6 w-auto">
                        <div
                          class="hover:bg-white peer flex h-6 w-auto flex-row items-center rounded px-1 transition-all duration-200 ease-in-out hover:shadow-md">
                          <span class=""> {{ item.time }} </span>
                        </div>
                      </div>
                    </div>
                    <div class="text-gray-700 flex h-6 flex-row items-center gap-1 break-all text-xs">
                      <span class="text-gray-700 text-[10px] font-semibold uppercase">Class : </span>
                      <div v-for="(itemClass, index) in item.class.slice(0, 3)" :key="index">
                        <div
                          class="transition-width relative flex h-6 select-none items-center justify-items-start overflow-hidden rounded-full border-2 text-xs shadow duration-200 ease-in-out w-16 px-2 bg-purple-50 border-purple-600 text-purple-600">
                          <span class="animate-fade font-bold transition-opacity opacity-100">{{ itemClass }}</span>
                        </div>
                      </div>
                      <div v-if="item.class.length > 3">
                        <div key="more"
                          class="relative flex h-6 select-none items-center justify-items-start overflow-hidden rounded-full border-2 text-xs shadow duration-200 ease-in-out w-16 px-2 bg-purple-50 border-purple-600 text-purple-600">
                          <span class="font-bold">+{{ item.class.length - 3 }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </ul>
        </div>
      </section>
    </main>
    <div>
      <div v-if="isModalOpen" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <div class="container">
            <div class="view-background">
              <div class="row">
                <div class="col-2">
                  <img class="modal-img" :src="selectedItem.image">
                </div>
                <div class="col-2">
                  <div
                    class="border-transparent group-hover:border-purboflow-400 group-hover:border-opacity-30 group-hover:bg-purboflow-500 group-hover:bg-opacity-10 flex flex-row justify-start gap-2  rounded-md border  border-transparent  p-2 transition duration-200 hover:shadow-md">
                    <div class="flex flex-col justify-between">
                      <div
                        class="text-gray-600 flex h-6 flex-row items-center gap-1 break-all text-xs font-normal font-size mt-3">
                        <span class="text-gray-700 text-[100px] font-semibold uppercase font-size">Location :</span>
                        {{ selectedItem.location }}
                      </div>
                      <div
                        class="text-gray-600 relative flex h-6 flex-row items-center gap-1 break-all text-xs font-normal font-size mt-5">
                        <span class="text-gray-700 relative text-[10px] font-semibold uppercase font-size">Weather
                          :</span>{{
                            selectedItem.weather }}
                      </div>
                      <div
                        class="text-gray-600 relative flex h-6 flex-row items-center gap-1 break-all text-xs font-normal font-size mt-5">
                        <span class="text-gray-700 relative text-[10px] font-semibold uppercase font-size">Time :</span>
                        <div class="tagWrapper relative h-6 w-auto">
                          <div
                            class="hover:bg-white peer flex h-6 w-auto flex-row items-center rounded px-1 transition-all duration-200 ease-in-out hover:shadow-md">
                            <span class=""> {{ selectedItem.time }} </span>
                          </div>
                        </div>
                      </div>
                      <div class="text-gray-700 flex flex-row flex-wrap items-center gap-1 break-all text-xs">
                        <span class="text-gray-700 text-[10px] font-semibold uppercase font-size mt-5">Class :</span>
                        <div class="break-normal mt-5" v-for="(itemClass, index) in selectedItem.class" :key="index">
                          <div v-if="index < 3 || selectedItem.class <= 3"
                            class="transition-width relative flex h-6 select-none items-center justify-items-start overflow-hidden rounded-full border-2 text-xs shadow duration-200 ease-in-out w-16 px-2 bg-purple-50 border-purple-600 text-purple-600">
                            <span class="animate-fade font-bold transition-opacity opacity-100 font-size">{{ itemClass
                              }}</span>
                          </div>
                          <div v-else
                            class="transition-width relative flex h-6 select-none items-center justify-items-start overflow-hidden rounded-full border-2 text-xs shadow duration-200 ease-in-out w-16 px-2 bg-purple-50 border-purple-600 text-purple-600 mt-1">
                            <span class="animate-fade font-bold transition-opacity opacity-100 font-size ">{{ itemClass
                              }}</span>
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
      </div>
    </div>
  </section>
</template>

<script>
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'

export default {
  name: 'HistoricalData',
  data() {
    return {
      selectedClasses: [],
      filteredData: [],
      items: [
        // { id: 1, image: require('../assets/image-predict/image_predict_1.png'), location: "Bang Mueang Mai, Samut Prakarn", weather: "13° 7°", time: "12:00 p.m.", class: ["Battery", "Cosmetic", "Face-mask", "Foam-box", "Metal-can", "Paint-bucket", "Plastic-bag", "Plastic-bottle", "Plastic-box", "Rubber-gloves"] },
        // { id: 2, image: require('../assets/image-predict/image_predict_2.png'), location: "Chalong Krung 1, Lat Krabang", weather: "19° 11°", time: "14:00 p.m.", class: ["Plastic-box"] },
        // { id: 3, image: require('../assets/image-predict/image_predict_3.png'), location: "Bang Mot, Krung Thep Maha Nakhon", weather: "14° 11°", time: "15:35 p.m.", class: ["Foam-box"] },
      ],
      classes: ["Battery", "Cosmetic", "Face-mask", "Foam-box", "Metal-can", "Paint-bucket", "Plastic-bag", "Plastic-bottle", "Plastic-box", "Rubber-gloves"],
      isModalOpen: false,
      selectedItem: null
    }
  },
  methods: {
    async fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "waste"));
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push(doc.data());
        });
        this.items = fetchedData;
        this.filteredData = this.items;
      } catch (error) {
        console.log("Error fetching data");
      }
    },
    filterData() {
      if (this.selectedClasses.length > 0) {
        this.filteredData = this.items.filter(item => {
          return item.class.some(className => this.selectedClasses.includes(className));
        });
      } else {
        this.filteredData = this.items;
      }
    },
    openModal(itemId) {
      this.selectedItem = itemId;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedItem = null;
    }
  },
  watch: {
    selectedClasses() {
      this.filterData();
    }
  },
  created() {
    this.fetchData();
  },
}
</script>
<style>
@media (min-width: 768px) {}

#projectContainer>div {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

#projectContainer>div {
  margin: auto;
  max-width: 72rem;
  padding-bottom: 1.75rem;
  padding-top: 1.75rem;
  position: relative;
}

.h-full {
  height: 100%;
}

*,
:after,
:before {
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  --tw-border-opacity: 1;
  --tw-ring-inset: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, .5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-blur: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-brightness: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-contrast: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-grayscale: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-hue-rotate: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-invert: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-saturate: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-sepia: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-drop-shadow: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
  --tw-backdrop-blur: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-brightness: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-contrast: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-grayscale: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-hue-rotate: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-invert: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-opacity: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-saturate: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-sepia: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
  border: 0 solid;
  box-sizing: border-box;
  border-color: rgba(229, 231, 235, var(--tw-border-opacity));
}


user agent stylesheet div {
  display: block;
  unicode-bidi: isolate;
}

@media (min-width: 768px) {}

.md\:px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.justify-between {
  justify-content: space-between;
}

.flex-col {
  flex-direction: column;
}

.flex {
  display: flex;
}

user agent stylesheet div {
  display: block;
  unicode-bidi: isolate;
}

.flex-grow-0 {
  flex-grow: 0;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

@media (min-width: 768px) {}

.md\:-mt-6 {
  margin-top: -1.5rem;
}

.flex-col {
  flex-direction: column;
}

.h-auto {
  height: auto;
}

.flex {
  display: flex;
}

.-mt-28 {
  margin-top: -7rem;
}

.z-40 {
  z-index: 40;
}

.top-16 {
  top: 4rem;
}

.sticky {
  position: sticky;
}

element.style {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0px, 0px, 0px, 0px);
  white-space: nowrap;
  border-width: 0px;
  display: none;
}

element.style {
  position: fixed;
  left: 0px;
  top: 0px;
  transform: translate(819px, 255px);
  width: 1px;
  height: 0px;
  display: none;
}

.rCS179bs95 {
  position: fixed;
  display: none;
  border: 1px solid #4af;
  background: rgba(68, 170, 255, 0.5);
  pointer-events: none;
  will-change: transform;
  z-index: 100;
}

.pb-6 {
  padding-bottom: 1.5rem;
}

.h-full {
  height: 100%;
}

*,
:after,
:before {
  border: 0 solid;
  box-sizing: border-box;
}

@media (min-width: 768px) {}

.md\:grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.gap-1 {
  gap: .25rem;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid {
  display: grid;
}

ol,
ul {
  list-style: none;
}

fieldset,
ol,
ul {
  margin: 0;
  padding: 0;
}

.flex-grow {
  flex-grow: 1;
}

.relative {
  position: relative;
}

user agent stylesheet div {
  display: block;
  unicode-bidi: isolate;
}

ol,
ul {
  list-style: none;
}

user agent stylesheet ul {
  list-style-type: disc;
}

.duration-200 {
  transition-duration: .2s;
}

.transition {
  transition-duration: .15s;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
}

.text-purboflow-300 {
  --tw-text-opacity: 1;
  color: rgba(163, 81, 251, var(--tw-text-opacity));
}

.bg-opacity-20 {
  --tw-bg-opacity: 0.2;
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}

.border-purboflow-300 {
  --tw-border-opacity: 1;
  border-color: rgba(163, 81, 251, var(--tw-border-opacity));
}

.border,
.border-1 {
  border-width: 1px;
}

.rounded-md {
  border-radius: .375rem;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.w-5 {
  width: 1.25rem;
}

.h-5 {
  height: 1.25rem;
}

.flex {
  display: flex;
}

.z-30 {
  z-index: 30;
}

.right-0 {
  right: 0;
}

.top-0 {
  top: 0;
}

.absolute {
  position: absolute;
}

.invisible {
  visibility: hidden;
}

user agent stylesheet div {
  display: block;
  unicode-bidi: isolate;
}

ol,
ul {
  list-style: none;
}

user agent stylesheet ul {
  list-style-type: disc;
}

.text-purboflow-300 {
  --tw-text-opacity: 1;
  color: rgba(163, 81, 251, var(--tw-text-opacity));
}

.text-xs {
  font-size: .75rem;
  line-height: 1rem;
}

.pt-\[\.125rem\] {
  padding-top: .125rem;
}

.far {
  font-weight: 400;
}

.fal,
.far {
  font-family: "Font Awesome 5 Pro";
}

.fa,
.fab,
.fad,
.fal,
.far,
.fas {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
}

user agent stylesheet i {
  font-style: italic;
}

.bg-opacity-20 {
  --tw-bg-opacity: 0.2;
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}

.border-purboflow-300 {
  --tw-border-opacity: 1;
  border-color: rgba(163, 81, 251, var(--tw-border-opacity));
}

.invisible {
  visibility: hidden;
}

ol,
ul {
  list-style: none;
}

user agent stylesheet ul {
  list-style-type: disc;
}

.fa-check:before {
  content: "\f00c";
}

.opacity-0 {
  opacity: 0;
}

.p-0 {
  padding: 0;
}

.cursor-copy {
  cursor: copy;
}

.w-6 {
  width: 1.5rem;
}

.h-6 {
  height: 1.5rem;
}

.m-0 {
  margin: 0;
}

.right-0 {
  right: 0;
}

.top-0 {
  top: 0;
}

.absolute {
  position: absolute;
}

button,
input,
optgroup,
select,
textarea {
  color: inherit;
  line-height: inherit;
  padding: 0;
}

user agent stylesheet input[type="checkbox" i] {
  background-color: initial;
  cursor: default;
  appearance: auto;
  box-sizing: border-box;
  margin: 3px 3px 3px 4px;
  padding: initial;
  border: initial;
}

user agent stylesheet input {
  /* font-style: ;
    font-variant-ligatures: ;
    font-variant-caps: ;
    font-variant-numeric: ;
    font-variant-east-asian: ;
    font-variant-alternates: ;
    font-variant-position: ;
    font-weight: ;
    font-stretch: ;
    font-size: ;
    font-family: ;
    font-optical-sizing: ;
    font-kerning: ;
    font-feature-settings: ;
    font-variation-settings: ; */
  text-rendering: auto;
  color: fieldtext;
  letter-spacing: normal;
  word-spacing: normal;
  line-height: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  appearance: auto;
  -webkit-rtl-ordering: logical;
  cursor: text;
  background-color: field;
  margin: 0em;
  padding: 1px 0px;
  border-width: 2px;
  border-style: inset;
  border-color: light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  border-image: initial;
  padding-block: 1px;
  padding-inline: 2px;
}

.text-purboflow-300 {
  --tw-text-opacity: 1;
  color: rgba(163, 81, 251, var(--tw-text-opacity));
}

.bg-opacity-20 {
  --tw-bg-opacity: 0.2;
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}

.border-purboflow-300 {
  --tw-border-opacity: 1;
  border-color: rgba(163, 81, 251, var(--tw-border-opacity));
}

.invisible {
  visibility: hidden;
}

ol,
ul {
  list-style: none;
}

user agent stylesheet ul {
  list-style-type: disc;
}

.text-purboflow-300 {
  --tw-text-opacity: 1;
  color: rgba(163, 81, 251, var(--tw-text-opacity));
}

.bg-opacity-20 {
  --tw-bg-opacity: 0.2;
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}

.border-purboflow-300 {
  --tw-border-opacity: 1;
  border-color: rgba(163, 81, 251, var(--tw-border-opacity));
}

.border,
.border-1 {
  border-width: 1px;
}

.rounded-md {
  border-radius: .375rem;
}

.w-5 {
  width: 1.25rem;
}

.h-5 {
  height: 1.25rem;
}

.z-30 {
  z-index: 30;
}

.right-7 {
  right: 1.75rem;
}

.top-0 {
  top: 0;
}

.absolute {
  position: absolute;
}

.invisible {
  visibility: hidden;
}

user agent stylesheet div {
  display: block;
  unicode-bidi: isolate;
}

ol,
ul {
  list-style: none;
}

user agent stylesheet ul {
  list-style-type: disc;
}

.transition-opacity {
  transition-duration: .15s;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
}

.text-xs {
  font-size: .75rem;
  line-height: 1rem;
}

.rounded {
  border-radius: .25rem;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.flex {
  display: flex;
}

.fa,
.fas {
  font-family: "Font Awesome 5 Pro";
  font-weight: 900;
}

.fa,
.fab,
.fad,
.fal,
.far,
.fas {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
}

button,
input,
optgroup,
select,
textarea {
  color: inherit;
  line-height: inherit;
  padding: 0;
}

[role=button],
button {
  cursor: pointer;
}

button {
  background-color: transparent;
  background-image: none;
}

user agent stylesheet button {
  appearance: auto;
  /* font-style: ;
    font-variant-ligatures: ;
    font-variant-caps: ;
    font-variant-numeric: ;
    font-variant-east-asian: ;
    font-variant-alternates: ;
    font-variant-position: ;
    font-weight: ;
    font-stretch: ;
    font-size: ;
    font-family: ;
    font-optical-sizing: ;
    font-kerning: ;
    font-feature-settings: ;
    font-variation-settings: ; */
  text-rendering: auto;
  color: buttontext;
  letter-spacing: normal;
  word-spacing: normal;
  line-height: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: center;
  align-items: flex-start;
  cursor: default;
  box-sizing: border-box;
  background-color: buttonface;
  margin: 0em;
  padding-block: 1px;
  padding-inline: 6px;
  border-width: 2px;
  border-style: outset;
  border-color: buttonborder;
  border-image: initial;
}

.text-purboflow-300 {
  --tw-text-opacity: 1;
  color: rgba(163, 81, 251, var(--tw-text-opacity));
}

.bg-opacity-20 {
  --tw-bg-opacity: 0.2;
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}

.border-purboflow-300 {
  --tw-border-opacity: 1;
  border-color: rgba(163, 81, 251, var(--tw-border-opacity));
}

.invisible {
  visibility: hidden;
}

ol,
ul {
  list-style: none;
}

user agent stylesheet ul {
  list-style-type: disc;
}

.fa-expand-alt:before {
  content: "\f424";
}

.fa-expand-alt:before {
  content: "\f424";
}

.text-xs {
  font-size: .75rem;
  line-height: 1rem;
}

.fa,
.fas {
  font-family: "Font Awesome 5 Pro";
  font-weight: 900;
}

.fa,
.fab,
.fad,
.fal,
.far,
.fas {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
}

button,
input,
optgroup,
select,
textarea {
  color: inherit;
  line-height: inherit;
  padding: 0;
}

[role=button],
button {
  cursor: pointer;
}

user agent stylesheet button {
  /* font-style: ;
    font-variant-ligatures: ;
    font-variant-caps: ;
    font-variant-numeric: ;
    font-variant-east-asian: ;
    font-variant-alternates: ;
    font-variant-position: ;
    font-weight: ;
    font-stretch: ;
    font-size: ;
    font-family: ;
    font-optical-sizing: ;
    font-kerning: ;
    font-feature-settings: ;
    font-variation-settings: ; */
  text-rendering: auto;
  color: buttontext;
  letter-spacing: normal;
  word-spacing: normal;
  line-height: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  text-align: center;
  cursor: default;
}

.text-purboflow-300 {
  --tw-text-opacity: 1;
  color: rgba(163, 81, 251, var(--tw-text-opacity));
}

.bg-opacity-20 {
  --tw-bg-opacity: 0.2;
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}

.border-purboflow-300 {
  --tw-border-opacity: 1;
  border-color: rgba(163, 81, 251, var(--tw-border-opacity));
}

.invisible {
  visibility: hidden;
}

ol,
ul {
  list-style: none;
}

user agent stylesheet ul {
  list-style-type: disc;
}


.duration-200 {
  transition-duration: .2s;
}

.transition {
  transition-duration: .15s;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
}

.p-3 {
  padding: .75rem;
}

.border-transparent {
  border-color: transparent;
}

.border,
.border-1 {
  border-width: 1px;
}

.rounded-md {
  border-radius: .375rem;
}

.gap-2 {
  gap: .5rem;
}

.justify-start {
  justify-content: flex-start;
}

.flex-row {
  flex-direction: row;
}

.flex {
  display: flex;
}

user agent stylesheet div {
  display: block;
  unicode-bidi: isolate;
}

a,
a:hover {
  --tw-text-opacity: 1;
}

a {
  border-radius: .25rem;
  color: rgba(131, 21, 249, var(--tw-text-opacity));
  font-weight: 500;
}

a {
  color: inherit;
  text-decoration: inherit;
}

user agent stylesheet a:-webkit-any-link {
  color: -webkit-link;
  cursor: pointer;
}

ol,
ul {
  list-style: none;
}

user agent stylesheet ul {
  list-style-type: disc;
}


.cursor-pointer {
  cursor: pointer;
}

.w-\[72px\] {
  width: 72px;
}

.h-auto {
  height: auto;
}

.relative {
  position: relative;
}

user agent stylesheet div {
  display: block;
  unicode-bidi: isolate;
}

a,
a:hover {
  --tw-text-opacity: 1;
}

a {
  border-radius: .25rem;
  color: rgba(131, 21, 249, var(--tw-text-opacity));
  font-weight: 500;
}

a {
  color: inherit;
  text-decoration: inherit;
}

user agent stylesheet a:-webkit-any-link {
  color: -webkit-link;
  cursor: pointer;
}

ol,
ul {
  list-style: none;
}

user agent stylesheet ul {
  list-style-type: disc;
}

.object-cover {
  -o-object-fit: cover;
  object-fit: cover;
}

.rounded {
  border-radius: .25rem;
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.absolute {
  position: absolute;
}

/* img, video {
    height: auto;
    max-width: 100%;
} */
audio,
canvas,
embed,
iframe,
img,
object,
svg,
video {
  display: block;
  vertical-align: middle;
}

img {
  border-style: solid;
}

user agent stylesheet img {
  overflow-clip-margin: content-box;
  overflow: clip;
}

.cursor-pointer {
  cursor: pointer;
}

a,
a:hover {
  --tw-text-opacity: 1;
}

a {
  border-radius: .25rem;
  color: rgba(131, 21, 249, var(--tw-text-opacity));
  font-weight: 500;
}

a {
  color: inherit;
  text-decoration: inherit;
}

user agent stylesheet a:-webkit-any-link {
  color: -webkit-link;
  cursor: pointer;
}

ol,
ul {
  list-style: none;
}

user agent stylesheet ul {
  list-style-type: disc;
}

.justify-between {
  justify-content: space-between;
}

.flex-col {
  flex-direction: column;
}

.flex {
  display: flex;
}

user agent stylesheet div {
  display: block;
  unicode-bidi: isolate;
}

a,
a:hover {
  --tw-text-opacity: 1;
}

a {
  border-radius: .25rem;
  color: rgba(131, 21, 249, var(--tw-text-opacity));
  font-weight: 500;
}

a {
  color: inherit;
  text-decoration: inherit;
}

user agent stylesheet a:-webkit-any-link {
  color: -webkit-link;
  cursor: pointer;
}

ol,
ul {
  list-style: none;
}

user agent stylesheet ul {
  list-style-type: disc;
}

.text-gray-600 {
  --tw-text-opacity: 1;
  color: rgba(75, 85, 99, var(--tw-text-opacity));
}

.font-normal {
  font-weight: 400;
}

.text-xs {
  font-size: .75rem;
  line-height: 1rem;
}

.break-all {
  word-break: break-all;
}

.gap-1 {
  gap: .25rem;
}

.items-center {
  align-items: center;
}

.flex-row {
  flex-direction: row;
}

.h-6 {
  height: 1.5rem;
}

.flex {
  display: flex;
}

user agent stylesheet div {
  display: block;
  unicode-bidi: isolate;
}

a,
a:hover {
  --tw-text-opacity: 1;
}

a {
  border-radius: .25rem;
  color: rgba(131, 21, 249, var(--tw-text-opacity));
  font-weight: 500;
}

a {
  color: inherit;
  text-decoration: inherit;
}

user agent stylesheet a:-webkit-any-link {
  color: -webkit-link;
  cursor: pointer;
}

ol,
ul {
  list-style: none;
}

user agent stylesheet ul {
  list-style-type: disc;
}

.text-gray-700 {
  --tw-text-opacity: 1;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
}

.uppercase {
  text-transform: uppercase;
}

.font-semibold {
  font-weight: 600;
}

.text-\[10px\] {
  font-size: 10px;
}

.text-gray-600 {
  --tw-text-opacity: 1;
  color: rgba(75, 85, 99, var(--tw-text-opacity));
}

.font-normal {
  font-weight: 400;
}

.text-xs {
  font-size: .75rem;
  line-height: 1rem;
}

.break-all {
  word-break: break-all;
}

a,
a:hover {
  --tw-text-opacity: 1;
}

a {
  border-radius: .25rem;
  color: rgba(131, 21, 249, var(--tw-text-opacity));
  font-weight: 500;
}

a {
  color: inherit;
  text-decoration: inherit;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
}

.duration-200 {
  transition-duration: .2s;
}

.transition {
  transition-duration: .15s;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
}

.shadow-md,
.shadow-sm {
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow-md {
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
}

.text-\[9px\] {
  font-size: 9px;
}

.p-2 {
  padding: .5rem;
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}

.rounded {
  border-radius: .25rem;
}

.gap-1 {
  gap: .25rem;
}

.flex-col {
  flex-direction: column;
}

.w-full {
  width: 100%;
}

.flex {
  display: flex;
}

.mt-1 {
  margin-top: .25rem;
}

.z-50 {
  z-index: 50;
}

.top-full {
  top: 100%;
}

.left-0 {
  left: 0;
}

.absolute {
  position: absolute;
}

.invisible {
  visibility: hidden;
}


element.style {
  background-color: rgb(254, 0, 86);
}

.shadow,
.shadow-none {
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow {
  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06);
}

.pr-2 {
  padding-right: .5rem;
}

.rounded-full {
  border-radius: 9999px;
}

.w-2 {
  width: .5rem;
}

.h-2 {
  height: .5rem;
}

.flex {
  display: flex;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
}

.duration-200 {
  transition-duration: .2s;
}

.shadow,
.shadow-none {
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow {
  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06);
}

.text-purple-600 {
  --tw-text-opacity: 1;
  color: rgba(124, 58, 237, var(--tw-text-opacity));
}

.duration-200 {
  transition-duration: .2s;
}

.transition {
  transition-duration: .15s;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
}

.text-purboflow-300 {
  --tw-text-opacity: 1;
  color: rgba(163, 81, 251, var(--tw-text-opacity));
}

.bg-opacity-20 {
  --tw-bg-opacity: 0.2;
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}

.border-purboflow-300 {
  --tw-border-opacity: 1;
  border-color: rgba(163, 81, 251, var(--tw-border-opacity));
}

.border,
.border-1 {
  border-width: 1px;
}

.rounded-md {
  border-radius: .375rem;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.w-5 {
  width: 1.25rem;
}

.h-5 {
  height: 1.25rem;
}

.flex {
  display: flex;
}

.z-30 {
  z-index: 30;
}

.right-0 {
  right: 0;
}

.top-0 {
  top: 0;
}

.absolute {
  position: absolute;
}

.invisible {
  visibility: hidden;
}

*,
:after,
:before {
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  --tw-border-opacity: 1;
  --tw-ring-inset: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, .5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-blur: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-brightness: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-contrast: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-grayscale: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-hue-rotate: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-invert: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-saturate: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-sepia: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-drop-shadow: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
  --tw-backdrop-blur: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-brightness: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-contrast: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-grayscale: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-hue-rotate: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-invert: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-opacity: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-saturate: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-sepia: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
  border-color: rgba(229, 231, 235, var(--tw-border-opacity));
}

*,
:after,
:before {
  border: 0 solid;
  box-sizing: border-box;
}

user agent stylesheet div {
  display: block;
  unicode-bidi: isolate;
}

ol,
ul {
  list-style: none;
}

user agent stylesheet ul {
  list-style-type: disc;
}

#content {
  --tw-bg-opacity: 1;
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  min-height: 100%;
  padding-top: 57px;
  width: 100%;
}

body,
html {
  background-color: #f4f6f8;
  font-family: Inter, sans-serif;
  height: 100%;
  min-width: 100%;
}

*,
:after,
:before {
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  --tw-border-opacity: 1;
  --tw-ring-inset: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, .5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-blur: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-brightness: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-contrast: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-grayscale: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-hue-rotate: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-invert: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-saturate: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-sepia: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-drop-shadow: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
  --tw-backdrop-blur: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-brightness: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-contrast: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-grayscale: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-hue-rotate: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-invert: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-opacity: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-saturate: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-sepia: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
  border-color: rgba(229, 231, 235, var(--tw-border-opacity));
}

*,
:after,
:before {
  border: 0 solid;
  box-sizing: border-box;
}

*,
:after,
:before {
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  --tw-border-opacity: 1;
  --tw-ring-inset: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, .5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-blur: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-brightness: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-contrast: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-grayscale: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-hue-rotate: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-invert: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-saturate: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-sepia: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-drop-shadow: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
  --tw-backdrop-blur: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-brightness: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-contrast: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-grayscale: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-hue-rotate: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-invert: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-opacity: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-saturate: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-sepia: var(--tw-empty,
      /*!*/
      /*!*/
    );
  --tw-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
  border-color: rgba(229, 231, 235, var(--tw-border-opacity));
}

*,
:after,
:before {
  border: 0 solid;
  box-sizing: border-box;
}

.form-checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  vertical-align: middle;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  margin-left: 10px;
  margin-right: 10px;
}

/* Checked checkbox */
.form-checkbox:checked {
  background-color: #4a5568;
  border-color: #4a5568;
}

/* Checkmark icon */
.form-checkbox:checked::before {
  content: '\2713';
  /* Unicode character for check mark */
  display: flex;
  justify-content: center;
  /* Align content horizontally to center */
  align-items: center;
  /* Align content vertically to center */
  font-size: 14px;
  /* Adjust size as needed */
  color: #ffffff;
  /* Color of the check mark */
  width: 100%;
  /* Ensure full width */
  height: 100%;
  /* Ensure full height */
}

/* Focus style */
.form-checkbox:focus {
  outline: 0;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.flex-wrap {
  flex-wrap: wrap;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5rem;
  /* ปรับระยะห่างระหว่างกล่อง checkbox */
}

.checkbox-label {
  flex-basis: calc(20% - 1rem);
  /* ความกว้างของ checkbox ในรูปแบบ flex-basis */
  margin-bottom: 0.5rem;
  /* ระยะห่างระหว่าง checkbox */
  margin-left: 0.5rem;
  /* ปรับระยะห่างระหว่างกล่อง checkbox */
}

.checkbox-label input {
  margin-right: 0.5rem;
  /* ระยะห่างระหว่าง checkbox และข้อความ */
}

/* Button style */
#historicalFilterBtn {
  width: 100px;
  padding: 0.2rem 0.5rem;
  background-color: #4a5568;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  margin-bottom: 15px;
}

#historicalFilterBtn:hover {
  background-color: #2d3748;
}

.grid-cols-1 {
  /* แก้ไขจาก .grid-cols-1 เป็น .grid-cols-2 */
  grid-template-columns: repeat(2, 1fr)
}

/* Optional: ปรับแต่งขนาดช่องว่างระหว่างคอลัมน์ */
.grid-cols-2>.SearchResultImageItem {
  margin: 0 10px 10px 0;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 100px;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}


.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  margin-left: auto;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

#modal-image {
  max-width: 100%;
  /* ให้รูปภาพใหญ่ของ Modal ไม่เกินขนาดสูงสุดของหน้าจอ */
}

.container {
  display: flex;
  /* เริ่มใช้ Flexbox */
  justify-content: space-between;
  /* จัดเรียงรูปภาพและข้อมูลให้อยู่ตรงข้ามกัน */
  align-items: center;
  /* จัดเรียงรูปภาพและข้อมูลให้อยู่กึ่งกลางตามแนวตั้ง */
  width: 100%;
  /* ให้คอนเทนเนอร์เต็มขนาด */
}

.col-2 {
  flex: 1;
}

.modal-img {
  max-width: 100%;
  height: auto;
}

.font-size {
  font-size: 18px;
  margin-left: 10px;
}
</style>
