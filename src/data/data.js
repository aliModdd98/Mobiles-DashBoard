import img1 from "./../assets/devices/s24.jpg";
import img2 from "./../assets/devices/s23.jpg";
import img3 from "./../assets/devices/s22.jpg";
import img4 from "./../assets/devices/a55.jpg";
import img5 from "./../assets/devices/zFlip.jpg";
import img6 from "./../assets/devices/iphone15pro.jpg";
import img7 from "./../assets/devices/iphone15.jpg";
import img8 from "./../assets/devices/iphone14Pro.jpg";
import img9 from "./../assets/devices/iphone14+.jpg";
import img10 from "./../assets/devices/iphone13.jpg";
import img11 from "./../assets/devices/iphone12.jpg";

import acc1 from "./../assets/Accessories/all.webp";
// import acc2 from "./../assets/Accessories/all2.webp";
import acc3 from "./../assets/Accessories/iphone.webp";
import acc4 from "./../assets/Accessories/iphone12.jpg";
import acc5 from "./../assets/Accessories/iphone2.webp";
import acc6 from "./../assets/Accessories/iphone3.webp";
import acc7 from "./../assets/Accessories/samsung.webp";
import acc8 from "./../assets/Accessories/zFlip.webp";
import acc9 from "./../assets/Accessories/protect.webp";
import acc12 from "./../assets/Accessories/airbuds.webp";

export const phoneDataset = [
  {
    id: 0,
    name: "Samsung Galaxy S24 Ultra",
    image: img1,
    made_in: "August 2024",
    ram: "12 GB",
    storage: "256 GB",
    offer: {
      accessories: ["Galaxy S24 Case"],
      offerPrice: 999,
      offerEndDate: "2024-12-31",
    },
  },
  {
    id: 1,
    name: "Samsung Galaxy S23 Ultra",
    image: img2,
    made_in: "February 2023",
    ram: "12 GB",
    storage: "256 GB",
    offer: {
      accessories: ["Wireless Charger"],
      offerPrice: 1199,
      offerEndDate: "2024-11-30",
    },
  },
  {
    id: 2,
    name: "Samsung Galaxy S22 Ultra",
    image: img3,
    made_in: "February 2022",
    ram: "12 GB",
    storage: "128 GB",
  },
  {
    id: 3,
    name: "Samsung Galaxy S21 Ultra",
    image: img3,
    made_in: "January 2021",
    ram: "12 GB",
    storage: "128 GB",
    offer: {
      accessories: ["Galaxy S21 Earbuds"],
      offerPrice: 899,
      offerEndDate: "2024-09-25",
    },
  },
  {
    id: 4,
    name: "Samsung Galaxy A55",
    image: img4,
    made_in: "April 2024",
    ram: "8 GB",
    storage: "128 GB",
    offer: {
      accessories: ["Galaxy S21 Earbuds"],
      offerPrice: 699,
      offerEndDate: "2024-08-01",
    },
  },
  {
    id: 5,
    name: "Samsung Galaxy Z Fold 5",
    image: img5,
    made_in: "August 2023",
    ram: "12 GB",
    storage: "512 GB",
  },
  {
    id: 6,
    name: "iPhone 15 Pro Max",
    image: img6,
    made_in: "September 2023",
    ram: "8 GB",
    storage: "1 TB",
    offer: {
      accessories: ["iPhone 15 Case"],
      offerPrice: 1299,
      offerEndDate: "2024-12-05",
    },
  },
  {
    id: 7,
    name: "iPhone 15",
    image: img7,
    made_in: "September 2023",
    ram: "6 GB",
    storage: "128 GB",
    offer: {
      accessories: ["iPhone 15 Case"],
      offerPrice: 799,
      offerEndDate: "2024-11-30",
    },
  },
  {
    id: 8,
    name: "iPhone 14 Pro Max",
    image: img8,
    made_in: "September 2022",
    ram: "6 GB",
    storage: "1 TB",
    offer: {
      accessories: ["iPhone 14 Charger"],
      offerPrice: 1099,
      offerEndDate: "2024-10-15",
    },
  },
  {
    id: 9,
    name: "iPhone 14 Pro",
    image: img9,
    made_in: "September 2022",
    ram: "6 GB",
    storage: "128 GB",
  },
  {
    id: 10,
    name: "iPhone 14",
    image: img10,
    made_in: "September 2022",
    ram: "6 GB",
    storage: "128 GB",
  },
  {
    id: 11,
    name: "iPhone 13",
    image: img11,
    made_in: "September 2021",
    ram: "4 GB",
    storage: "128 GB",
    offer: {
      accessories: ["iPhone 11 PopSocket"],
      offerPrice: 599,
      offerEndDate: "2024-06-30",
    },
  },
  {
    id: 12,
    name: "iPhone 12",
    image: img9,
    made_in: "October 2020",
    ram: "4 GB",
    storage: "64 GB",
    offer: {
      accessories: ["iPhone 12 EarPods"],
      offerPrice: 499,
      offerEndDate: "2024-07-31",
    },
  },
];

export const accessoriesData = [
  { id: 0, name: "iPhone 15 Case", image: acc3, selectedDevice: ["iPhone 15"] },
  {
    id: 1,
    name: "iPhone 14 Pro Max Screen Protector",
    image: acc9,
    selectedDevice: ["iPhone 14 Pro Max"],
  },
  {
    id: 2,
    name: "iPhone 14 Charger",
    image: acc6,
    selectedDevice: ["iPhone 14"],
  },
  {
    id: 3,
    name: "iPhone 12 EarPods",
    image: acc12,
    selectedDevice: ["iPhone 12"],
  },
  {
    id: 4,
    name: "iPhone SE Battery Pack",
    image: acc7,
    selectedDevice: ["iPhone SE"],
  },
  {
    id: 5,
    name: "iPhone 11 PopSocket",
    image: acc5,
    selectedDevice: ["iPhone 11"],
  },
  {
    id: 6,
    name: "Galaxy S24 Case",
    image: acc1,
    selectedDevice: ["Samsung Galaxy S24"],
  },
  {
    id: 7,
    name: "Wireless Charger",
    image: acc8,
    selectedDevice: ["Samsung Galaxy S23 Ultra"],
  },
  {
    id: 8,
    name: "Galaxy S22 Accessories",
    image: acc4,
    selectedDevice: ["Samsung Galaxy S22"],
  },
  {
    id: 9,
    name: "Galaxy S21 Earbuds",
    image: acc12,
    selectedDevice: [
      "Samsung Galaxy S21",
      "Samsung Galaxy A55",
      "Samsung Galaxy S22",
    ],
  },
];
