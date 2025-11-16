// Import fungsi Firebase yang diperlukan
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    where,
    serverTimestamp,
    updateDoc,
    writeBatch
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// --- KONFIGURASI DAN DATA ---

// Konfigurasi Firebase (sesuaikan dengan project Anda)
const firebaseConfig = {
    apiKey: "AIzaSyBiUWkWqXDD7jndNPyobQwsAq38MAQqpYY",
    authDomain: "umkmproject1.firebaseapp.com",
    projectId: "umkmproject1",
    storageBucket: "umkmproject1.firebasestorage.app",
    messagingSenderId: "177597123722",
    appId: "1:177597123722:web:056837ba354a4a8b79b173"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Data Restoran dengan TAGS dan Varian Harga
const initialRestaurantData = [
    {
        id: "r1",
        name: "Tetta Kopi",
        mapLink: "https://maps.app.goo.gl/3CRpADgRH2cNxvdYA",
        tags: ['kopi', 'makanan berat', 'snack', 'pasta', 'nasi', 'mie'],
        items: [
            { id: "r1-i1", name: "Kopi Tetta", price: 25000, category: "SIGNATURE TETTA KOPI"}, 
            { id: "r1-i2", name: "Kopi Bapak", price: 27000, category: "SIGNATURE TETTA KOPI"}, 
            { id: "r1-i3", name: "Kopi Nuna", price: 27000, category: "SIGNATURE TETTA KOPI" },
            { id: "r1-i4", name: "Kopi Unti", price: 27000, category: "SIGNATURE TETTA KOPI" },
            { id: "r1-i5", name: "Espresso", price: 15000, category: "COFFEE" },
            { id: "r1-i6", name: "Americano", price: 20000, category: "COFFEE" },
            { id: "r1-i7", name: "Cappucino", price: 23000, category: "COFFEE" },
            { id: "r1-i8", name: "Latte", price: 23000, category: "COFFEE" },
            { id: "r1-i9", name: "Mochachino", price: 25000, category: "COFFEE" },
            { id: "r1-i10", name: "Latte Flavour", price: 25000, category: "COFFEE" },
            { id: "r1-i11", name: "Pandan Buzz", price: 25000, category: "MOCKTAIL DRINK" },
            { id: "r1-i12", name: "Strawberry Buzz", price: 25000, category: "MOCKTAIL DRINK" },
            { id: "r1-i13", name: "Lychee Buzz", price: 25000, category: "MOCKTAIL DRINK" },
            { id: "r1-i14", name: "Berries Fizz", price: 25000, category: "MOCKTAIL DRINK" },
            { id: "r1-i15", name: "Red Velvet", price: 27000, category: "NON COFFEE" },
            { id: "r1-i16", name: "Matcha", price: 27000, category: "NON COFFEE" },
            { id: "r1-i17", name: "Cokelat", price: 27000, category: "NON COFFEE" },
            { id: "r1-i18", name: "Flavour Tea", price: 25000, category: "NON COFFEE" },
            { id: "r1-i19", name: "Lychee Tea", price: 25000, category: "NON COFFEE" },
            { id: "r1-i20", name: "Peach Tea", price: 25000, category: "NON COFFEE" },
            { id: "r1-i21", name: "Mixberries Tea", price: 25000, category: "NON COFFEE" },
            { id: "r1-i22", name: "V60", price: 25000, category: "MANUAL BREW" },
            { id: "r1-i23", name: "Japanese Drip", price: 27000, category: "MANUAL BREW" },
            { id: "r1-i24", name: "Roti Bakar", price: 15000, category: "SNACKS" },
            { id: "r1-i25", name: "Kentang Goreng", price: 15000, category: "SNACKS" },
            { id: "r1-i26", name: "Cireng Bumbu Rujak", price: 18000, category: "SNACKS" },
            { id: "r1-i27", name: "Pisang Goreng Keju", price: 20000, category: "SNACKS" },
            { id: "r1-i28", name: "Singkong Goreng", price: 20000, category: "SNACKS" },
            { id: "r1-i29", name: "Pempek", price: 25000, category: "SNACKS" },
            { id: "r1-i30", name: "Tetta Platter", price: 30000, category: "SNACKS" },
            { id: "r1-i31", name: "Pasta Carbonara", price: 35000, category: "PASTA" },
            { id: "r1-i32", name: "Pasta Aglio Olio", price: 35000, category: "PASTA" },
            { id: "r1-i33", name: "Daging Lada Hitam", price: 35000, category: "FOOD" },
            { id: "r1-i34", name: "Ayam Lada Hitam", price: 35000, category: "FOOD" },
            { id: "r1-i35", name: "Nasi Cumi Asin", price: 35000, category: "FOOD" },
            { id: "r1-i36", name: "Nasi Chicken Teriyaki", price: 35000, category: "FOOD" },
            { id: "r1-i37", name: "Nasi Beef Teriyaki", price: 35000, category: "FOOD" },
            { id: "r1-i38", name: "Nasi Ayam Sambal Matah", price: 35000, category: "FOOD" },
            { id: "r1-i39", name: "Nasi Goreng Katsu", price: 35000, category: "FOOD" },
            { id: "r1-i40", name: "Bento", price: 25000, category: "FOOD" },
            { id: "r1-i41", name: "MieDok", price: 15000, category: "NOODLE" },
            { id: "r1-i42", name: "MieReng", price: 15000, category: "NOODLE" }
        ]
    },
    {
        id: "r2", name: "Kedai Minuman ARA", mapLink: "https://maps.app.goo.gl/FC2ooLP7aCMKX77Z6", img: "https://placehold.co/600x400/34D399/1F2937?text=Kedai+ARA",
        tags: ['minuman', 'teh', 'jus'],
        items: [
            { id: "r2-i1", name: "ARA Teh", category: "Teh", prices: { large: 5000 } },
            { id: "r2-i2", name: "ARA Teh Lemon", category: "Teh", prices: { large: 8000 } },
            { id: "r2-i3", name: "ARA Teh Jeruk Peras", category: "Teh", prices: { large: 8000 } },
            { id: "r2-i4", name: "ARA Teh Nipis", category: "Teh", prices: { large: 10000 } },
            { id: "r2-i5", name: "ARA Lemon", category: "Lemon", prices: { small: 5000, medium: 6000, large: 8000 } },
            { id: "r2-i6", name: "ARA Lemon Soda", category: "Lemon Soda", prices: { medium: 8000, large: 10000 } },
            { id: "r2-i7", name: "ARA Jeruk Peras", category: "Jeruk", prices: { small: 5000, medium: 6000, large: 8000 } },
            { id: "r2-i8", name: "ARA Jeruk Peras Soda", category: "Jeruk Soda", prices: { medium: 8000, large: 10000 } },
            { id: "r2-i9", name: "ARA Jeruk Nipis", category: "Jeruk", prices: { medium: 8000, large: 10000 } },
            { id: "r2-i10", name: "ARA Jeruk Nipis Soda", category: "Jeruk Soda", prices: { medium: 10000, large: 12000 } }
        ]
    },
    {
        id: "r3", name: "Sate Madura Hj Siti Maria Ibtisam", mapLink: "https://maps.app.goo.gl/LZtzL11XV9drR7xdA", img: "https://placehold.co/600x400/8B4513/FFFFFF?text=Sate+Madura",
        tags: ['sate', 'makanan berat', 'sop'],
        items: [
            { id: "r3-i1", name: "Sate Ayam Biasa", price: 33000, category: "Sate", desc: "Daging + kulit bumbu kecap / kacang(10tsk)", tags: ["best Seller"] },
            { id: "r3-i2", name: "Sate Telor", price: 38000, category: "Sate", desc: "Kulit + telor (10 tusuk) Bumbu kacang / kecap" },
            { id: "r3-i3", name: "Ayam Biasa 15 Free Lontong", price: 50000, category: "Paket", desc: "15 Tusuk Sate Ayam Biasa Gratis Lontong 1" },
            { id: "r3-i4", name: "Sop Kambing", price: 45000, category: "Sop", desc: "Tulang Iga Dan Sumsum Kuah Tidak Bisa Di Pisah" },
            { id: "r3-i5", name: "Sate Ayam Tanpa Lemak", price: 38000, category: "Sate", desc: "Full daging bumbu kacang / kecap(10tsk)" }
        ]
    },
    {
        id: "r4", name: "Nasi Goreng Parjo", mapLink: "https://maps.app.goo.gl/PEG9LCMSj46hYkLd9", img: "https://placehold.co/600x400/F59E0B/1F2937?text=Nasgor+Parjo",
        tags: ['nasi', 'makanan berat', 'seafood'],
        items: [
            { id: "r4-i1", name: "Nasi Goreng Biasa", price: 16000, category: "Nasi Goreng", desc: "Ayam Bakso Sosis" },
            { id: "r4-i2", name: "Nasi Goreng Ati Ampela", price: 20000, category: "Nasi Goreng", desc: "Ati Ampela Ayam Bakso Sosis" },
            { id: "r4-i3", name: "Nasi Goreng Pete", price: 20000, category: "Nasi Goreng", desc: "Pete Ayam Bakso Sosis" },
            { id: "r4-i4", name: "Nasi Goreng Istimewa", price: 23000, category: "Nasi Goreng", desc: "Pete Ati Ampela Ayam Bakso Sosis" },
            { id: "r4-i5", name: "Nasi Goreng Kambing", price: 25000, category: "Nasi Goreng", desc: "Kambing Ayam Bakso Sosis" },
            { id: "r4-i6", name: "Nasi Goreng Teri", price: 20000, category: "Nasi Goreng", desc: "Teri Medan Ayam Bakso Sosis" },
            { id: "r4-i7", name: "Nasi Goreng Udang", price: 21000, category: "Nasi Goreng", desc: "Udang Ayam Bakso Sosis" },
            { id: "r4-i8", name: "Nasi Goreng Cumi", price: 21000, category: "Nasi Goreng", desc: "Cumi Ayam Bakso Sosis" },
            { id: "r4-i9", name: "Nasi Goreng Seafood", price: 25000, category: "Nasi Goreng", desc: "Udang Cumi Ayam Bakso Sosis" }
        ]
    },
    {
        id: "r5", name: "Ayam Crisbar UI", mapLink: "https://maps.app.goo.gl/nctMBp7qchsZM1uRA", img: "https://placehold.co/600x400/DC2626/FFFFFF?text=Ayam+Crisbar",
        tags: ['ayam', 'nasi', 'cepat saji', 'makanan berat', 'minuman'],
        items: [
            { id: "r5-i1", name: "Paket Nikmat Crisbar", price: 25800, category: "Paket", desc: "Ayam Crisbar + Nasi + Spicy Kale + Sambal Kemangi" },
            { id: "r5-i2", name: "Nikmat Crispy Bumbu Hitam Madura", price: 28800, category: "Paket", desc: "Ayam Crispy + Bumbu Hitam Madura + Nasi + Spicy Kale" },
            { id: "r5-i3", name: "Paket Nikmat Crisbee", price: 28800, category: "Paket", desc: "Ayam Crispy + Nasi + Spicy Kale + Saus Sachet + Saus Crisbee" },
            { id: "r5-i4", name: "Nikmat Crisbar Keju", price: 33800, category: "Paket", desc: "Ayam Crisbar + Nasi + Spicy Kale + Cheese Sauce" },
            { id: "r5-i5", name: "Paket Nikmat Spicy", price: 28800, category: "Paket", desc: "Ayam Spicy + Nasi + Spicy Kale + Saus Sachet" },
            { id: "r5-i6", name: "Paket Nikmat Ayam Keju Salju", price: 30800, category: "Paket", desc: "Ayam Keju Salju + Nasi + Spicy Kale" },
            { id: "r5-i7", name: "Paket Nikmat Ayam Keju Salju Spesial", price: 37800, category: "Paket", desc: "Ayam Keju Salju + Nasi + Spicy Kale + Scrambled Egg" },
            { id: "r5-i8", name: "Paket Nikmat Fries Ayam Keju Salju", price: 38800, category: "Paket", desc: "Ayam Keju Salju + Swicy Fries + Spicy Kale" },
            { id: "r5-i9", name: "Ayam Keju Salju Ala Carte", price: 26800, category: "Ala Carte", desc: "" },
            { id: "r5-i10", name: "Fondue Chocolate", price: 21800, category: "Minuman", desc: "Fondue Iced Chocolate" },
            { id: "r5-i11", name: "Lychee Yakult", price: 17800, category: "Minuman", desc: "Iced Lychee Yakult" },
            { id: "r5-i12", name: "Lychee Tea", price: 12800, category: "Minuman", desc: "Iced Lychee Tea" },
            { id: "r5-i13", name: "Lemon Tea", price: 12800, category: "Minuman", desc: "Iced Lemon Tea" },
            { id: "r5-i14", name: "Sweet Iced Tea", price: 6800, category: "Minuman", desc: "Sweet Iced Tea" },
            { id: "r5-i15", name: "Air Mineral", price: 8580, category: "Minuman", desc: "Air Mineral" }
        ]
    },
    {
        id: "r6", name: "Mie Ayam Yamien Sengketa", mapLink: "https://maps.app.goo.gl/nY85B8mg8ptkzwUa6", img: "https://placehold.co/600x400/D97706/FFFFFF?text=Mie+Ayam",
        tags: ['mie', 'makanan berat', 'minuman'],
        items: [
            { id: "r6-i1", name: "Mie Ayam Pangsit", price: 10000, category: "Makanan" },
            { id: "r6-i2", name: "Mie Yamin Pangsit", price: 10000, category: "Makanan" },
            { id: "r6-i3", name: "Mie Ayam Baso P.", price: 13000, category: "Makanan" },
            { id: "r6-i4", name: "Mie Yamin Baso P.", price: 13000, category: "Makanan" },
            { id: "r6-i5", name: "Es Teh Manis", price: 3000, category: "Minuman" },
            { id: "r6-i6", name: "Es Jeruk", price: 4000, category: "Minuman" },
            { id: "r6-i7", name: "Es Teh Tawar", price: 1000, category: "Minuman" },
            { id: "r6-i8", name: "Es Tawar / Air Es", price: 1000, category: "Minuman" }
        ]
    },
    {
        id: "r7", name: "Hyaku Ramen", mapLink: "https://maps.app.goo.gl/ZUzp9xujo1U1YZRL9", img: "https://placehold.co/600x400/B91C1C/FFFFFF?text=Hyaku+Ramen",
        tags: ['nasi', 'jepang', 'makanan berat', 'minuman'],
        items: [
            { id: "r7-i1", name: "Chicken Teriyaki Don", price: 20000, category: "Donburi" },
            { id: "r7-i2", name: "Tamago Curry Don", price: 20000, category: "Donburi" },
            { id: "r7-i3", name: "Karage Curry Don", price: 25000, category: "Donburi" },
            { id: "r7-i4", name: "Katsu Curry Don", price: 25000, category: "Donburi" },
            { id: "r7-i5", name: "Lemon Tea", price: 5000, category: "Minuman" },
            { id: "r7-i6", name: "Teh Pucuk", price: 5000, category: "Minuman" }
        ]
    },
    {
        id: "r8", name: "Kazyuki Ramen Beji", mapLink: "https://maps.app.goo.gl/Mn8SH9NdaeGSxa4h6", img: "https://placehold.co/600x400/EF4444/FFFFFF?text=Kazyuki+Ramen",
        tags: ['ramen', 'mie', 'jepang', 'makanan berat', 'minuman'],
        items: [
            { id: "r8-i1", name: "Spicy Vegetable", price: 20000, category: "Spicy Ramen" },
            { id: "r8-i2", name: "Spicy Original", price: 25000, category: "Spicy Ramen" },
            { id: "r8-i3", name: "Spicy Crabstik", price: 28000, category: "Spicy Ramen" },
            { id: "r8-i4", name: "Spicy EbiFry", price: 30000, category: "Spicy Ramen" },
            { id: "r8-i5", name: "Spicy Beef", price: 35000, category: "Spicy Ramen" },
            { id: "r8-i6", name: "Spicy FishRoll", price: 30000, category: "Spicy Ramen" },
            { id: "r8-i7", name: "Spicy Chicken", price: 30000, category: "Spicy Ramen" },
            { id: "r8-i8", name: "Spicy Katsu", price: 33000, category: "Spicy Ramen" },
            { id: "r8-i9", name: "Spicy Iga", price: 35000, category: "Spicy Ramen" },
            { id: "r8-i10", name: "Tantmen Vegetable", price: 24000, category: "Tantmen Ramen" },
            { id: "r8-i11", name: "Tantmen Original", price: 29000, category: "Tantmen Ramen" },
            { id: "r8-i12", name: "Tantmen Crabstik", price: 32000, category: "Tantmen Ramen" },
            { id: "r8-i13", name: "Tantmen EbiFry", price: 34000, category: "Tantmen Ramen" },
            { id: "r8-i14", name: "Tantmen Beef", price: 39000, category: "Tantmen Ramen" },
            { id: "r8-i15", name: "Tantmen FishRoll", price: 34000, category: "Tantmen Ramen" },
            { id: "r8-i16", name: "Tantmen Chicken", price: 34000, category: "Tantmen Ramen" },
            { id: "r8-i17", name: "Tantmen Katsu", price: 37000, category: "Tantmen Ramen" },
            { id: "r8-i18", name: "Tantmen Iga", price: 39000, category: "Tantmen Ramen" },
            { id: "r8-i19", name: "Tori Vegetable", price: 20000, category: "Tori Ramen" },
            { id: "r8-i20", name: "Tori Original", price: 25000, category: "Tori Ramen" },
            { id: "r8-i21", name: "Tori Crabstik", price: 28000, category: "Tori Ramen" },
            { id: "r8-i22", name: "Tori EbiFry", price: 30000, category: "Tori Ramen" },
            { id: "r8-i23", name: "Tori Beef", price: 35000, category: "Tori Ramen" },
            { id: "r8-i24", name: "Tori FishRoll", price: 30000, category: "Tori Ramen" },
            { id: "r8-i25", name: "Tori Chicken", price: 30000, category: "Tori Ramen" },
            { id: "r8-i26", name: "Tori Katsu", price: 33000, category: "Tori Ramen" },
            { id: "r8-i27", name: "Tori Iga", price: 35000, category: "Tori Ramen" },
            { id: "r8-i28", name: "Abura Vegetable", price: 20000, category: "Abura Ramen" },
            { id: "r8-i29", name: "Abura Original", price: 25000, category: "Abura Ramen" },
            { id: "r8-i30", name: "Abura Crabstik", price: 28000, category: "Abura Ramen" },
            { id: "r8-i31", name: "Abura EbiFry", price: 30000, category: "Abura Ramen" },
            { id: "r8-i32", name: "Abura Beef", price: 35000, category: "Abura Ramen" },
            { id: "r8-i33", name: "Abura FishRoll", price: 30000, category: "Abura Ramen" },
            { id: "r8-i34", name: "Abura Chicken", price: 30000, category: "Abura Ramen" },
            { id: "r8-i35", name: "Abura Katsu", price: 33000, category: "Abura Ramen" },
            { id: "r8-i36", name: "Teppan Beef Original", price: 36000, category: "Teppan" },
            { id: "r8-i37", name: "Teppan Beef Moza", price: 42000, category: "Teppan" },
            { id: "r8-i38", name: "Teppan Yakisoba Ori", price: 31000, category: "Teppan" },
            { id: "r8-i39", name: "Teppan Yakisoba Moza", price: 37000, category: "Teppan" },
            { id: "r8-i40", name: "Brownsugar Latte", price: 17000, category: "Minuman" },
            { id: "r8-i41", name: "Rom Latte", price: 17000, category: "Minuman" },
            { id: "r8-i42", name: "Hazelnut Latte", price: 17000, category: "Minuman" },
            { id: "r8-i43", name: "Caramel Latte", price: 17000, category: "Minuman" },
            { id: "r8-i44", name: "Black Coffe", price: 12000, category: "Minuman" },
            { id: "r8-i45", name: "Thai Tea", price: 17000, category: "Minuman" },
            { id: "r8-i46", name: "MilkShake Coklat", price: 17000, category: "Minuman" },
            { id: "r8-i47", name: "MilkShake Taro", price: 17000, category: "Minuman" },
            { id: "r8-i48", name: "Mineral", price: 6000, category: "Minuman" },
            { id: "r8-i49", name: "Jeruk", price: 10000, category: "Minuman" },
            { id: "r8-i50", name: "Teh Tarik", price: 15000, category: "Minuman" },
            { id: "r8-i51", name: "Nasi Putih", price: 7000, category: "Tambahan" },
            { id: "r8-i52", name: "Telur", price: 7000, category: "Tambahan" },
            { id: "r8-i53", name: "Chicken Katsu", price: 12000, category: "Tambahan" },
            { id: "r8-i54", name: "Salad", price: 10000, category: "Tambahan" },
            { id: "r8-i55", name: "Roti Panggang", price: 20000, category: "Tambahan", desc: "Coklat/Keju/Kaya" },
            { id: "r8-i56", name: "EbiFry (1pcs)", price: 12000, category: "Tambahan" },
            { id: "r8-i57", name: "FishRoll (2pcs)", price: 12000, category: "Tambahan" },
            { id: "r8-i58", name: "EggRoll (2pcs)", price: 15000, category: "Tambahan" },
            { id: "r8-i59", name: "Chicken Teriyaki", price: 22000, category: "Tambahan" },
            { id: "r8-i60", name: "Beef Teriyaki", price: 25000, category: "Tambahan" },
            { id: "r8-i61", name: "Extra Large + Refill Mie", price: 10000, category: "Tambahan" }
        ]
    },
    {
        id: "r9", name: "Warung makan 99 chinese & sea food", mapLink: "https://maps.app.goo.gl/Mj62TJ55aJTcB2E96", img: "https://placehold.co/600x400/1D4ED8/FFFFFF?text=Seafood+99",
        tags: ['seafood', 'chinese', 'makanan berat', 'nasi', 'minuman', 'jus'],
        items: [
            { id: "r9-i1", name: "Tahu/Tempe", price: 2000, category: "Menu Tambahan" },
            { id: "r9-i2", name: "Telor Dadar/Ceplok", price: 4000, category: "Menu Tambahan" },
            { id: "r9-i3", name: "Pete Goreng", price: 6000, category: "Menu Tambahan" },
            { id: "r9-i4", name: "Pecel Lele", price: 10000, category: "Menu Tambahan" },
            { id: "r9-i5", name: "Pecel Ayam", price: 13000, category: "Menu Tambahan" },
            { id: "r9-i6", name: "Nasi Putih", price: 5000, category: "Nasi" },
            { id: "r9-i7", name: "Nasi Goreng Telor", price: 13000, category: "Nasi" },
            { id: "r9-i8", name: "Nasi Goreng Ayam", price: 23000, category: "Nasi" },
            { id: "r9-i9", name: "Nasi Goreng Sapi", price: 23000, category: "Nasi" },
            { id: "r9-i10", name: "Nasi Goreng Kambing", price: 23000, category: "Nasi" },
            { id: "r9-i11", name: "Nasi Goreng Seafood", price: 23000, category: "Nasi" },
            { id: "r9-i12", name: "Nasi Capcay Ayam", price: 25000, category: "Nasi" },
            { id: "r9-i13", name: "Nasi Capcay Sapi", price: 25000, category: "Nasi" },
            { id: "r9-i14", name: "Nasi Capcay Seafood", price: 25000, category: "Nasi" },
            { id: "r9-i15", name: "Sapotahu Polos", price: 20000, category: "Capcay & Sapo Tahu" },
            { id: "r9-i16", name: "Sapotahu Ayam", price: 28000, category: "Capcay & Sapo Tahu" },
            { id: "r9-i17", name: "Sapotahu Sapi", price: 28000, category: "Capcay & Sapo Tahu" },
            { id: "r9-i18", name: "Sapotahu Seafood", price: 28000, category: "Capcay & Sapo Tahu" },
            { id: "r9-i19", name: "Capcay Goreng Ayam", price: 28000, category: "Capcay & Sapo Tahu" },
            { id: "r9-i20", name: "Capcay Goreng Sapi", price: 28000, category: "Capcay & Sapo Tahu" },
            { id: "r9-i21", name: "Capcay Goreng Seafood", price: 28000, category: "Capcay & Sapo Tahu" },
            { id: "r9-i22", name: "Capcay Kuah Ayam", price: 28000, category: "Capcay & Sapo Tahu" },
            { id: "r9-i23", name: "Capcay Kuah Sapi", price: 28000, category: "Capcay & Sapo Tahu" },
            { id: "r9-i24", name: "Capcay Kuah Seafood", price: 28000, category: "Capcay & Sapo Tahu" },
            { id: "r9-i25", name: "Fuyunghay Ayam", price: 25000, category: "Fuyunghay" },
            { id: "r9-i26", name: "Fuyunghay Udang", price: 25000, category: "Fuyunghay" },
            { id: "r9-i27", name: "Fuyunghay Cumi", price: 25000, category: "Fuyunghay" },
            { id: "r9-i28", name: "Fuyunghay Sapi", price: 25000, category: "Fuyunghay" },
            { id: "r9-i29", name: "Fuyunghay Seafood", price: 28000, category: "Fuyunghay" },
            { id: "r9-i30", name: "Juice Jeruk", price: 10000, category: "Aneka Juice" },
            { id: "r9-i31", name: "Juice Alpukat", price: 10000, category: "Aneka Juice" },
            { id: "r9-i32", name: "Juice Mangga", price: 10000, category: "Aneka Juice" },
            { id: "r9-i33", name: "Juice Melon", price: 10000, category: "Aneka Juice" },
            { id: "r9-i34", name: "Juice Tomat", price: 10000, category: "Aneka Juice" },
            { id: "r9-i35", name: "Juice Sirsak", price: 10000, category: "Aneka Juice" },
            { id: "r9-i36", name: "Air Putih Es", price: 2000, category: "Aneka Minuman" },
            { id: "r9-i37", name: "Teh Tawar Hangat", price: 2000, category: "Aneka Minuman" },
            { id: "r9-i38", name: "Es Teh Tawar", price: 3000, category: "Aneka Minuman" },
            { id: "r9-i39", name: "Teh Manis Hangat", price: 5000, category: "Aneka Minuman" },
            { id: "r9-i40", name: "Es Teh Manis", price: 5000, category: "Aneka Minuman" },
            { id: "r9-i41", name: "Kopi Gelas Kecil", price: 3000, category: "Aneka Minuman" },
            { id: "r9-i42", name: "Kopi Gelas Besar", price: 5000, category: "Aneka Minuman" },
            { id: "r9-i43", name: "Kopi Susu Gelas Kecil", price: 5000, category: "Aneka Minuman" },
            { id: "r9-i44", name: "Kopi Susu Gelas Besar", price: 7000, category: "Aneka Minuman" },
            { id: "r9-i45", name: "Coca Cola", price: 6000, category: "Aneka Minuman" },
            { id: "r9-i46", name: "Sprite", price: 6000, category: "Aneka Minuman" },
            { id: "r9-i47", name: "Fanta", price: 6000, category: "Aneka Minuman" },
            { id: "r9-i48", name: "Es Jeruk", price: 7000, category: "Aneka Minuman" },
            { id: "r9-i49", name: "Jeruk Panas", price: 7000, category: "Aneka Minuman" },
            { id: "r9-i50", name: "Soda Susu", price: 10000, category: "Aneka Minuman" },
            { id: "r9-i51", name: "Fanta Susu", price: 10000, category: "Aneka Minuman" }
        ]
    },
    {
        id: "r10", name: "Raki Bento", mapLink: "https://maps.app.goo.gl/mGMTy7VGnw6fyhm1A", img: "https://placehold.co/600x400/F97316/FFFFFF?text=Raki+Bento",
        tags: ['jepang', 'bento', 'nasi', 'makanan berat', 'cepat saji', 'ramen', 'mie'],
        items: [
            { id: "r10-i1", name: "Daging Sapi/Gyudon Savage", price: 54000, category: "Gyudon", desc: "Nasi + Daging Sapi Saus Raki + Telur Dadar + Sambel Matah + ..." },
            { id: "r10-i2", name: "Daging Sapi/Gyudon GG", price: 47000, category: "Gyudon", desc: "Nasi + Daging Sapi Saus Raki + Telur Dadar + Sambel Matah" },
            { id: "r10-i3", name: "Daging Sapi/Gyudon Matah", price: 44000, category: "Gyudon", desc: "Nasi + Daging Sapi Saus Raki + Sambel Matah" },
            { id: "r10-i4", name: "Daging Sapi/Gyudon Omelet", price: 44000, category: "Gyudon", desc: "Nasi + Daging Sapi Saus Raki + Telur Dadar" },
            { id: "r10-i5", name: "Kara Hosomen Beef", price: 47000, category: "Ramen", desc: "Mie Ramen Dengan Kuah Ebi Pedas Gurih + Daging Sapi Saus..." },
            { id: "r10-i6", name: "Kara Hosomen Spicy Chicken", price: 44000, category: "Ramen", desc: "Mie Ramen Dengan Kuah Ebi Pedas Gurih + Daging Ayam..." },
            { id: "r10-i7", name: "Kara Udon Beef", price: 47000, category: "Ramen", desc: "Mie Udon Dengan Kuah Ebi Pedas Gurih + Daging Sapi Saus..." },
            { id: "r10-i8", name: "Kara Udon Spicy Chicken", price: 44000, category: "Ramen", desc: "Mie Udon Dengan Kuah Ebi Pedas Gurih + Daging Ayam..." },
            { id: "r10-i9", name: "Abura Hosomen Beef", price: 51000, category: "Ramen", desc: "Mie ramen tanpa kuah gurih + daging sapi saus raki + telur..." },
            { id: "r10-i10", name: "Abura Hosomen Spicy Chicken", price: 42000, category: "Ramen", desc: "Mie Ramen Tanpa Kuah Gurih + Daging Ayam Cincang Pedas +..." },
            { id: "r10-i11", name: "Abura Udon Beef", price: 51000, category: "Ramen", desc: "Mie Udon Tanpa Kuah Gurih + Daging Sapi Saus Raki + Telur..." },
            { id: "r10-i12", name: "Abura Udon Spicy Chicken", price: 42000, category: "Ramen", desc: "Mie Udon Tanpa Kuah Gurih + Daging Ayam Cincang Pedas +..." },
            { id: "r10-i13", name: "Ice Lychee Tea", price: 15000, category: "Minuman", desc: "Es Teh Leci Racikan Raki (Tanpa Buah)" },
            { id: "r10-i14", name: "Ice Tea", price: 9000, category: "Minuman", desc: "Es Teh Manis Racikan Raki" },
            { id: "r10-i15", name: "Teh Pucuk Harum", price: 9000, category: "Minuman", desc: "350 ml" },
            { id: "r10-i16", name: "Air Mineral", price: 8000, category: "Minuman", desc: "Vit 600 ml" }
        ]
    }
];

// Pemetaan email pemilik toko
const ownerEmailMapping = {
    "tettakopi@admin.com": "r1",
    "kedaiminumanara@admin.com": "r2",
    "satemadura@admin.com": "r3",
    "nasigorengparjo@admin.com": "r4",
    "ayamcrisbarui@admin.com": "r5",
    "mieayamsengketa@admin.com": "r6",
    "hyakuramen@admin.com": "r7",
    "kazyukiramen@admin.com": "r8",
    "warung99@admin.com": "r9",
    "rakibento@admin.com": "r10"
};

// Daftar kategori filter (diperbarui)
const filterCategories = ['semua', 'kopi', 'ramen', 'nasi', 'sate', 'ayam', 'mie', 'jepang', 'seafood', 'bento', 'minuman', 'snack'];


// --- VARIABEL GLOBAL ---
let userId, userEmail;
let state = {
    role: null,
    ownerRestaurantId: null,
    cart: [],
    cartRestaurantId: null,
    restaurants: [],
    currentOwnerOrder: null,
    currentItemWithVariants: null,
    searchTerm: '',
    activeCategory: 'semua',
    aiChatSessions: [],
    currentChatId: null,
    currentChatHistory: [],
};

// (PERBAIKAN) Inisialisasi Ref Koleksi dipindahkan ke window.onload
let restaurantCollectionRef, orderCollectionRef, userCollectionRef, aiChatCollectionRef;
let restaurantListener = null;
let userOrderListener = null;
let ownerOrderListener = null;

// --- ELEMEN DOM ---
// (PERBAIKAN) Deklarasikan variabel di sini, tapi inisialisasi di dalam window.onload
let views, modals, loginForm, registerForm, aiForm, aiChatHistoryEl, aiSessionListEl, aiNewChatBtn, submitAiQueryBtn, restaurantListEl, cartCountEl, cartItemsEl, cartTotalEl, checkoutForm, ownerOrderListEl, userOrderListEl, menuItemListEl, menuRestaurantNameEl, cartStoreInfoEl, cartStoreNameEl, clearCartBtn, checkoutBtn, searchBar, categoryFiltersEl, variantForm, variantItemNameEl, variantOptionsEl;


// --- FUNGSI UTILITAS ---

function showModal(modal) {
    if (!modal) return; // Tambahkan penjagaan
    modal.classList.remove('hidden');
    const content = modal.querySelector('div[id$="-content"]'); // Menargetkan ...-modal-content
    setTimeout(() => {
        if (content) {
            content.classList.remove('scale-95', 'opacity-0');
            content.classList.add('scale-100', 'opacity-100');
        }
    }, 10);
}
function hideModal(modal) {
    if (!modal) return; // Tambahkan penjagaan
    const content = modal.querySelector('div[id$="-content"]');
    if (content) {
        content.classList.add('scale-95', 'opacity-0');
        content.classList.remove('scale-100', 'opacity-100');
    }
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300); // Sinkronkan dengan durasi transisi
}

function showMessage(title, text, isSuccess = true) {
    if (!modals.message) return; // Tambahkan penjagaan
    document.getElementById('message-title').textContent = title;
    document.getElementById('message-text').textContent = text;
    const iconContainer = document.getElementById('message-icon');
    if (isSuccess) {
        iconContainer.innerHTML = `<svg class="h-10 w-10 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`;
        iconContainer.className = "mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 mb-4";
    } else {
        iconContainer.innerHTML = `<svg class="h-10 w-10 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>`;
        iconContainer.className = "mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500/20 mb-4";
    }
    showModal(modals.message);
}
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}
function switchView(viewName) {
    if (!views) return; // Tambahkan penjagaan
    Object.values(views).forEach(v => v.classList.add('hidden'));
    if (views[viewName]) {
        views[viewName].classList.remove('hidden');
        if (['landing', 'login', 'register'].includes(viewName)) {
            views[viewName].classList.add('flex');
        }
    }
}


// --- FUNGSI INISIALISASI DATA ---

async function setupRestaurantData() {
    if (!restaurantCollectionRef) {
        console.error("Referensi koleksi restoran belum siap.");
        return;
    }
    try {
        console.log("Menyinkronkan data restoran ke database...");
        const batch = writeBatch(db);

        for (const resto of initialRestaurantData) {
            const docRef = doc(restaurantCollectionRef, resto.id);
            batch.set(docRef, resto);
        }

        await batch.commit();
        console.log("Data restoran berhasil disinkronkan.");

    } catch (error) {
        console.error("Error saat setup data restoran: ", error);
        showMessage("Error Database", "Gagal memuat data restoran.", false);
    }
}

// --- FUNGSI RENDER ---

function renderFilterButtons() {
    if (!categoryFiltersEl) return;
    categoryFiltersEl.innerHTML = '';
    filterCategories.forEach(category => {
        const btn = document.createElement('button');
        const isActive = state.activeCategory === category;
        const activeClass = 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/30';
        const inactiveClass = 'bg-slate-800/60 backdrop-blur-lg border border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:border-slate-600';

        btn.className = `filter-btn font-medium py-2 px-4 rounded-full shadow-sm capitalize transition-all duration-300 ${isActive ? activeClass : inactiveClass}`;
        btn.textContent = category;
        btn.dataset.category = category;
        categoryFiltersEl.appendChild(btn);
    });
}

function renderRestaurants(restaurantsToRender) {
    if (!restaurantListEl) return;
    restaurantListEl.innerHTML = '';

    if (restaurantsToRender.length === 0) {
        restaurantListEl.innerHTML = `
            <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-slate-600 mx-auto mb-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <h3 class="text-xl font-semibold text-gray-300">Tidak Ditemukan</h3>
                <p class="text-gray-400 mt-1">Coba ganti kata kunci pencarian atau filter Anda.</p>
            </div>
        `;
        return;
    }

    restaurantsToRender.forEach(resto => {
        const card = document.createElement('div');
        card.className = "bg-slate-800/60 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-xl shadow-black/30 transition-all duration-300 hover:shadow-cyan-500/20 hover:-translate-y-1 hover:border-slate-600";
        const restoName = resto.name ? encodeURIComponent(resto.name) : "Restoran";
        card.innerHTML = `
            <img src="${resto.img}" alt="${resto.name}" class="w-full h-48 object-cover rounded-t-2xl" onerror="this.src='https://placehold.co/600x400/334155/94a3b8?text=${restoName}'; this.onerror=null;">
            <div class="p-5">
                <h3 class="text-xl font-bold text-cyan-400 mb-2">${resto.name}</h3>
                <div class="flex justify-between items-center mt-4">
                    <a href="${resto.mapLink}" target="_blank" rel="noopener noreferrer" class="text-sm text-gray-400 hover:text-cyan-400 font-medium transition-all duration-300">
                        Lihat Peta
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 inline-block ml-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </a>
                    <button data-id="${resto.id}" class="view-menu-btn bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 px-4 rounded-lg shadow-md shadow-cyan-500/20 transition-all duration-300">
                        Lihat Menu
                    </button>
                </div>
            </div>
        `;
        restaurantListEl.appendChild(card);
    });
    document.querySelectorAll('.view-menu-btn').forEach(button => {
        button.addEventListener('click', handleViewMenu);
    });
}

function renderMenuModal(restaurant) {
    menuRestaurantNameEl.textContent = restaurant.name;
    menuItemListEl.innerHTML = '';
    if (!restaurant.items || restaurant.items.length === 0) {
        menuItemListEl.innerHTML = '<p class="text-gray-500 text-center">Menu tidak tersedia.</p>';
        return;
    }

    const placeholderImgUrl = "https://placehold.co/100x100/334155/94a3b8?text=Menu";

    const groupedItems = restaurant.items.reduce((acc, item) => {
        const category = item.category || 'Lainnya';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {});

    const sortedCategories = Object.keys(groupedItems).sort((a, b) => {
        return a.localeCompare(b);
    });


    for (const category of sortedCategories) {
        const categoryHeader = document.createElement('h4');
        categoryHeader.className = "text-lg font-semibold text-cyan-300 mt-4 pt-2 border-t border-slate-700 capitalize";
        categoryHeader.textContent = category.toLowerCase();
        menuItemListEl.appendChild(categoryHeader);

        groupedItems[category].forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = "flex items-center p-3 hover:bg-slate-700/50 rounded-lg space-x-3 ai-highlight transition-all duration-200";
            itemEl.dataset.itemId = item.id;

            const imageUrl = item.img ? item.img : placeholderImgUrl;
            const itemName = item.name ? encodeURIComponent(item.name) : "Menu";

            let priceDisplay = '';
            if (item.price) {
                priceDisplay = formatRupiah(item.price);
            } else if (item.prices) {
                const prices = Object.values(item.prices).filter(p => p !== null);
                if (prices.length > 0) {
                    const minPrice = Math.min(...prices);
                    const maxPrice = Math.max(...prices);
                    priceDisplay = `${formatRupiah(minPrice)}`;
                    if (maxPrice > minPrice) {
                        priceDisplay += ` - ${formatRupiah(maxPrice)}`;
                    }
                } else {
                    priceDisplay = "N/A";
                }
            }

            itemEl.innerHTML = `
                <img src="${imageUrl}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md flex-shrink-0" onerror="this.src='https://placehold.co/100x100/334155/94a3b8?text=${itemName}'; this.onerror=null;">
                <div class="flex-grow">
                    <p class="font-bold text-gray-100">${item.name}</p>
                    <p class="text-sm text-cyan-400 font-medium">${priceDisplay}</p>
                </div>
                <button data-item-id="${item.id}" data-restaurant-id="${restaurant.id}" class="add-to-cart-btn bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 px-5 rounded-lg shadow-md shadow-cyan-500/20 transition-all duration-300 flex-shrink-0">
                    + Tambah
                </button>
            `;
            menuItemListEl.appendChild(itemEl);
        });
    }

    const firstHeader = menuItemListEl.querySelector('h4');
    if (firstHeader) {
        firstHeader.classList.remove('mt-4', 'pt-2', 'border-t');
    }

    menuItemListEl.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', handleAddToCartClick);
    });
}

function renderCart() {
    cartItemsEl.innerHTML = '';
    let total = 0;
    if (state.cart.length === 0) {
        cartItemsEl.innerHTML = '<p class="text-gray-400 text-center">Keranjang Anda kosong.</p>';
        checkoutBtn.disabled = true;
        clearCartBtn.disabled = true;
        cartStoreInfoEl.classList.add('hidden');
    } else {
        state.cart.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = "flex justify-between items-center";
            const displayName = item.variantName ? `${item.name} (${item.variantName})` : item.name;
            itemEl.innerHTML = `
                <div>
                    <p class="font-bold text-gray-100">${displayName}</p>
                    <p class="text-sm text-gray-400">${formatRupiah(item.price)} x ${item.quantity}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="font-semibold text-gray-100">${formatRupiah(item.price * item.quantity)}</span>
                    <button data-cart-item-id="${item.cartItemId}" class="remove-from-cart-btn text-red-500 hover:text-red-400 p-1 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.576 0H3.75c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H19.5m-12.576 0m-4.59 3.96a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </button>
                </div>
            `;
            cartItemsEl.appendChild(itemEl);
            total += item.price * item.quantity;
        });
        checkoutBtn.disabled = false;
        clearCartBtn.disabled = false;

        const restaurant = state.restaurants.find(r => r.id === state.cartRestaurantId);
        if (restaurant) {
            cartStoreNameEl.textContent = restaurant.name;
            cartStoreInfoEl.classList.remove('hidden');
        } else {
            cartStoreInfoEl.classList.add('hidden');
        }
    }
    cartTotalEl.textContent = formatRupiah(total);
    cartCountEl.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
        button.addEventListener('click', handleRemoveFromCart);
    });
}

function renderOwnerOrders(orders) {
    ownerOrderListEl.innerHTML = '';
    if (orders.length === 0) {
        ownerOrderListEl.innerHTML = '<p class="text-gray-400 text-center p-6">Tidak ada pesanan masuk untuk toko Anda.</p>';
        return;
    }
    orders.forEach(order => {
        const orderEl = document.createElement('div');
        orderEl.className = "p-5 hover:bg-slate-700/50 transition duration-300";
        const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const statusClass = getStatusClass(order.status);
        orderEl.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-bold text-lg text-gray-100">${order.customerName}</p>
                    <p class="text-sm text-gray-400">${order.customerAddress}</p>
                    <p class="text-sm font-medium text-gray-200 mt-1">${formatRupiah(total)}</p>
                </div>
                <div class="text-right">
                    <span class="font-semibold py-1 px-3 rounded-full text-sm ${statusClass.text} ${statusClass.bg}">
                        ${order.status}
                    </span>
                    <button data-id="${order.id}" class="view-owner-order-btn mt-2 w-full bg-slate-700/50 hover:bg-slate-700 text-gray-200 font-medium py-2 px-4 rounded-lg transition-all duration-300">
                        Lihat Detail
                    </button>
                </div>
            </div>
        `;
        ownerOrderListEl.appendChild(orderEl);
    });
    document.querySelectorAll('.view-owner-order-btn').forEach(btn => {
        btn.addEventListener('click', handleViewOwnerOrderDetail);
    });
}

function renderUserOrders(orders) {
    userOrderListEl.innerHTML = '';
    if (orders.length === 0) {
        userOrderListEl.innerHTML = '<p class="text-gray-400 text-center p-6">Anda belum memiliki pesanan.</p>';
        return;
    }
    orders.forEach(order => {
        const orderEl = document.createElement('div');
        orderEl.className = "p-4 bg-slate-700/50 rounded-lg border border-slate-700";
        const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const statusClass = getStatusClass(order.status);
        let itemsHtml = order.items.map(item => {
            const displayName = item.variantName ? `${item.name} (${item.variantName})` : item.name;
            return `<li class="text-sm text-gray-400">${displayName} (x${item.quantity})</li>`
        }).join('');
        orderEl.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <p class="font-bold text-gray-100">Total: ${formatRupiah(total)}</p>
                    <p class="text-sm text-gray-400">Dipesan pada: ${order.createdAt ? new Date(order.createdAt.toDate()).toLocaleString('id-ID') : 'N/A'}</p>
                </div>
                <span class="font-semibold py-1 px-3 rounded-full text-sm ${statusClass.text} ${statusClass.bg}">
                    ${order.status}
                </span>
            </div>
            <ul class="list-disc list-inside mt-2 ml-4">
                ${itemsHtml}
            </ul>
        `;
        userOrderListEl.appendChild(orderEl);
    });
}

function renderVariantModal(item, restaurantId) {
    state.currentItemWithVariants = { ...item, restaurantId };
    variantItemNameEl.textContent = `Pilih Varian: ${item.name}`;
    variantOptionsEl.innerHTML = '';

    let isFirstOption = true;
    for (const [variantName, price] of Object.entries(item.prices)) {
        if (price === null) continue;

        const optionId = `variant-${item.id}-${variantName}`;
        const optionEl = document.createElement('div');
        optionEl.innerHTML = `
            <input type="radio" id="${optionId}" name="variant" value="${variantName}" data-price="${price}" class="hidden peer" ${isFirstOption ? 'checked' : ''}>
            <label for="${optionId}" class="flex justify-between items-center p-4 border border-slate-600 rounded-lg cursor-pointer transition-all duration-300 peer-checked:border-cyan-500 peer-checked:ring-2 peer-checked:ring-cyan-500 bg-slate-700/50 hover:bg-slate-700">
                <span class="text-lg font-medium text-gray-200 capitalize">${variantName}</span>
                <span class="text-lg font-bold text-cyan-400">${formatRupiah(price)}</span>
            </label>
        `;
        variantOptionsEl.appendChild(optionEl);
        isFirstOption = false;
    }
    showModal(modals.variant);
}

// --- FUNGSI HANDLER (Auth) ---

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        showMessage("Login Berhasil!", "Selamat datang kembali.");
        setTimeout(() => hideModal(modals.message), 1500);
    } catch (error) {
        console.error("Error login:", error);
        showMessage("Login Gagal", getFirebaseError(error), false);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value.toLowerCase();
    const password = document.getElementById('register-password').value;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const restaurantId = ownerEmailMapping[email] || null;
        const role = restaurantId ? 'owner' : 'user';

        const userDocRef = doc(userCollectionRef, user.uid);
        await setDoc(userDocRef, {
            uid: user.uid,
            name: name,
            email: email,
            role: role,
            restaurantId: restaurantId,
            createdAt: serverTimestamp()
        });
        showMessage("Pendaftaran Berhasil!", "Selamat datang di aplikasi kami.");
        setTimeout(() => hideModal(modals.message), 1500);
    } catch (error) {
        console.error("Error register:", error);
        showMessage("Pendaftaran Gagal", getFirebaseError(error), false);
    }
}

async function handleLogout() {
    try {
        await signOut(auth);
        state.cart = [];
        state.restaurants = [];
        state.aiChatSessions = [];
        state.currentChatId = null;
        state.currentChatHistory = [];
        state.role = null;
        state.ownerRestaurantId = null;
        state.cartRestaurantId = null;
        state.searchTerm = '';
        state.activeCategory = 'semua';
        renderCart();
    } catch (error) {
        console.error("Error logout:", error);
        showMessage("Logout Gagal", error.message, false);
    }
}


// --- FUNGSI HANDLER AI (CHAT) ---

function createWelcomeMessage() {
    return { role: 'model', parts: [{ text: 'Hai! Ada yang bisa saya bantu? Tanyakan tentang menu atau minta rekomendasi.' }] };
}

function renderAiSessionList() {
    aiSessionListEl.innerHTML = '';
    if (state.aiChatSessions.length === 0) {
        aiSessionListEl.innerHTML = `<p class="text-sm text-gray-500 p-3 text-center">Tidak ada riwayat chat.</p>`;
        return;
    }
    const sortedSessions = [...state.aiChatSessions].sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
    sortedSessions.forEach(session => {
        const isActive = session.id === state.currentChatId;
        const activeClass = 'bg-cyan-500/20 text-cyan-300';
        const inactiveClass = 'text-gray-400 hover:bg-slate-700/50';

        const sessionEl = document.createElement('button');
        sessionEl.className = `w-full text-left p-3 rounded-lg truncate transition duration-200 ${isActive ? activeClass : inactiveClass}`;
        sessionEl.textContent = session.title;
        sessionEl.dataset.sessionId = session.id;
        sessionEl.addEventListener('click', () => handleLoadAiChat(session.id));

        aiSessionListEl.appendChild(sessionEl);
    });
}

function renderAiChatHistory(isLoading = false) {
    aiChatHistoryEl.innerHTML = '';
    state.currentChatHistory.forEach(msg => {
        const bubbleWrapper = document.createElement('div');
        bubbleWrapper.className = 'flex flex-col';

        if (msg.role === 'user') {
            bubbleWrapper.innerHTML = `
                <div class="bg-gradient-to-r from-cyan-500 to-blue-600 text-black p-3 rounded-lg max-w-xs self-end shadow-md">
                    ${msg.parts[0].text}
                </div>
            `;
        } else if (msg.role === 'model') {
            let messageHtml = msg.parts[0].text.replace(/\n/g, '<br>');
            const itemRegex = /\[ITEM:([a-zA-Z0-9\-]+)\]/g;

            messageHtml = messageHtml.replace(itemRegex, (match, itemId) => {
                const restoId = itemId.split('-')[0];
                return `<button class="ai-goto-item-btn bg-cyan-800/50 text-cyan-300 font-bold py-1 px-3 rounded-full text-sm hover:bg-cyan-700/50 transition duration-300 ml-1"
                                data-id="${itemId}" 
                                data-resto-id="${restoId}">
                            Lihat Item
                        </button>`;
            });

            bubbleWrapper.innerHTML = `
                <div class="bg-slate-700 text-gray-200 p-3 rounded-lg max-w-xs self-start shadow-md prose prose-sm max-w-none prose-invert prose-p:text-gray-200 prose-strong:text-white">
                    ${messageHtml}
                </div>
            `;
        }
        aiChatHistoryEl.appendChild(bubbleWrapper);
    });

    if (isLoading) {
        const loadingBubble = document.createElement('div');
        loadingBubble.id = 'ai-loading-bubble';
        loadingBubble.className = 'flex flex-col';
        loadingBubble.innerHTML = `
            <div class="bg-slate-700 text-gray-200 p-3 rounded-lg max-w-xs self-start shadow-md">
                <div class="loader-dots">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
        `;
        aiChatHistoryEl.appendChild(loadingBubble);
    }
    aiChatHistoryEl.scrollTop = aiChatHistoryEl.scrollHeight;
}


async function callGeminiAPI(systemPrompt, menuDataJson, chatHistory) {
    const apiKey = "AIzaSyDgQoRgUE_ELPjhqnH48U0O02w8x7PNIBo"; 

    if (apiKey === "MASUKKAN_API_KEY_GEMINI_ANDA_DI_SINI" || apiKey === "") {
        console.error("API Key Gemini (Google AI) belum dimasukkan.");
        throw new Error("Asisten AI sedang tidak aktif. API Key belum dikonfigurasi oleh pemilik website.");
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const fullSystemPrompt = `
        ${systemPrompt}
        Berikut adalah data menu restoran yang WAJIB Anda gunakan (dalam format JSON):
        ${menuDataJson}
    `;

    const payload = {
        contents: chatHistory,
        systemInstruction: {
            parts: [{ text: fullSystemPrompt }]
        },
    };

    let response;
    let retries = 3;
    let delay = 1000;

    while (retries > 0) {
        try {
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json();
                const candidate = result.candidates?.[0];
                if (candidate && candidate.content?.parts?.[0]?.text) {
                    return candidate.content.parts[0].text;
                } else {
                    if (result.candidates?.[0]?.finishReason === 'SAFETY') {
                        throw new Error("Permintaan diblokir karena alasan keamanan. Coba gunakan kata-kata lain.");
                    }
                    if (result.candidates && result.candidates.length > 0) {
                        console.warn("AI merespon, tapi tidak ada teks.", result.candidates[0]);
                        throw new Error("AI merespon tanpa teks. Coba lagi.");
                    }
                    throw new Error("Respon AI tidak valid atau kosong.");
                }
            } else if (response.status === 400) {
                const errorResult = await response.json();
                throw new Error(`Error API: ${errorResult.error.message}. Pastikan API Key Anda benar.`);
            } else if (response.status === 429) {
                throw new Error("Throttled");
            } else {
                throw new Error(`Error API: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.warn(`Attempt failed: ${error.message}`);
            retries--;
            if (retries === 0) {
                throw new Error(`Gagal memanggil AI setelah beberapa kali percobaan: ${error.message}`);
            }
            if (error.message === "Throttled") {
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
            } else {
                throw error;
            }
        }
    }
}

async function handleAiQuery(e) {
    e.preventDefault();
    const queryInput = document.getElementById('ai-query');
    const queryText = queryInput.value.trim();
    if (!queryText) return;

    state.currentChatHistory.push({ role: 'user', parts: [{ text: queryText }] });
    renderAiChatHistory(true);
    queryInput.value = '';
    submitAiQueryBtn.disabled = true;

    let currentSessionId = state.currentChatId;

    if (!currentSessionId) {
        const title = "Chat: " + queryText.substring(0, 30) + (queryText.length > 30 ? "..." : "");
        try {
            const newChatDocRef = await addDoc(aiChatCollectionRef, {
                title: title,
                history: state.currentChatHistory,
                createdAt: serverTimestamp()
            });
            currentSessionId = newChatDocRef.id;
            state.currentChatId = currentSessionId;

            state.aiChatSessions.push({
                id: currentSessionId,
                title: title,
                createdAt: { toDate: () => new Date() }
            });
            renderAiSessionList();

        } catch (saveError) {
            console.error("Gagal membuat sesi chat baru:", saveError);
            renderAiChatHistory(false);
            showMessage("Error", "Gagal memulai chat baru. Coba lagi.", false);
            submitAiQueryBtn.disabled = false;
            return;
        }
    }

    try {
        const simpleMenuData = state.restaurants.map(resto => ({
            nama_restoran: resto.name,
            id_restoran: resto.id,
            menu: resto.items.map(item => ({
                nama_item: item.name,
                harga: item.price,
                varian_harga: item.prices,
                kategori: item.category || 'N/A',
                id_item: item.id
            }))
        }));
        const menuDataJson = JSON.stringify(simpleMenuData);

        const systemPrompt = `Anda adalah asisten virtual pemesanan makanan yang ramah dan membantu. Tugas Anda adalah memberikan rekomendasi HANYA berdasarkan data JSON menu restoran yang diberikan. Selalu jawab dalam Bahasa Indonesia. Jangan merekomendasikan apapun di luar data JSON. Buat jawaban Anda singkat, jelas, dan mudah dibaca (gunakan poin jika perlu).
        PENTING: Saat Anda merekomendasikan item menu tertentu, Anda HARUS menyertakan tag khusus: [ITEM:id_item] TEPAT SETELAH nama item tersebut. 
        Contoh: "Saya merekomendasikan Kopi Tetta [ITEM:r1-i1] dari Tetta Kopi."
        Jika item punya 'varian_harga', sebutkan juga varian tersebut.
        Gunakan HANYA id_item dari data JSON.`;

        const responseText = await callGeminiAPI(systemPrompt, menuDataJson, state.currentChatHistory);
        state.currentChatHistory.push({ role: 'model', parts: [{ text: responseText }] });

    } catch (error) {
        console.error("Error saat memanggil AI:", error);
        state.currentChatHistory.push({ role: 'model', parts: [{ text: `Maaf, terjadi kesalahan: ${error.message}` }] });
    } finally {
        renderAiChatHistory(false);
        submitAiQueryBtn.disabled = false;
        queryInput.focus();

        if (currentSessionId) {
            try {
                const aiChatDocRef = doc(aiChatCollectionRef, currentSessionId);
                await setDoc(aiChatDocRef, {
                    history: state.currentChatHistory
                }, { merge: true });
            } catch (saveError) {
                console.error("Gagal menyimpan riwayat chat:", saveError);
            }
        }
    }
}

function handleNewAiChat() {
    state.currentChatId = null;
    state.currentChatHistory = [createWelcomeMessage()];
    renderAiChatHistory(false);
    renderAiSessionList();
    document.getElementById('ai-query').focus();
}

async function handleLoadAiChat(sessionId) {
    if (state.currentChatId === sessionId) return;
    try {
        const chatDocRef = doc(aiChatCollectionRef, sessionId);
        const chatDoc = await getDoc(chatDocRef);

        if (chatDoc.exists()) {
            const chatData = chatDoc.data();
            state.currentChatId = sessionId;
            state.currentChatHistory = chatData.history || [createWelcomeMessage()];
            renderAiSessionList();
            renderAiChatHistory(false);
        } else {
            showMessage("Error", "Gagal memuat riwayat chat ini.", false);
            handleNewAiChat();
        }
    } catch (error) {
        console.error("Gagal memuat chat:", error);
        showMessage("Error", "Gagal memuat riwayat chat ini.", false);
    }
}


function handleAiGoToItem(itemId, restoId) {
    const restaurant = state.restaurants.find(r => r.id === restoId);
    if (!restaurant) {
        console.error("Restoran tidak ditemukan dari tombol AI");
        showMessage("Error", "Restoran untuk item tersebut tidak ditemukan.", false);
        return;
    }

    hideModal(modals.ai);
    renderMenuModal(restaurant);
    showModal(modals.menu);

    setTimeout(() => {
        const itemContainer = menuItemListEl.querySelector(`div[data-item-id="${itemId}"]`);
        if (itemContainer) {
            itemContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            itemContainer.classList.add('bg-cyan-900/50', 'ring-2', 'ring-cyan-500');
            setTimeout(() => {
                itemContainer.classList.remove('bg-cyan-900/50', 'ring-2', 'ring-cyan-500');
            }, 2500);
        } else {
            console.warn(`Elemen item ${itemId} tidak ditemukan di modal menu.`);
        }
    }, 500);
}


// --- FUNGSI HANDLER (Aplikasi) ---

function handleViewMenu(e) {
    const restaurantId = e.currentTarget.dataset.id;
    const restaurant = state.restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
        renderMenuModal(restaurant);
        showModal(modals.menu);
    } else {
        showMessage("Error", "Restoran tidak ditemukan.", false);
    }
}

function handleAddToCartClick(e) {
    const { restaurantId, itemId } = e.currentTarget.dataset;

    const restaurant = state.restaurants.find(r => r.id === restaurantId);
    const item = restaurant?.items.find(i => i.id === itemId);

    if (!item) {
        showMessage("Error", "Item tidak ditemukan.", false);
        return;
    }

    if (state.cart.length > 0 && state.cartRestaurantId !== restaurantId) {
        showMessage(
            "Keranjang Berbeda Toko",
            "Anda hanya bisa memesan dari satu toko dalam satu waktu. Harap kosongkan keranjang Anda untuk memesan dari toko ini.",
            false
        );
        renderCart();
        showModal(modals.cart);
        return;
    }

    if (item.prices) {
        renderVariantModal(item, restaurantId);
    } else if (item.price) {
        addItemToCart(item.id, item.name, item.price, restaurantId);
    } else {
        showMessage("Error", "Item ini tidak memiliki harga.", false);
    }
}

function handleVariantSubmit(e) {
    e.preventDefault();
    const selectedOption = variantForm.querySelector('input[name="variant"]:checked');

    if (!selectedOption) {
        showMessage("Error", "Silakan pilih satu varian.", false);
        return;
    }

    const price = selectedOption.dataset.price;
    const variantName = selectedOption.value;
    const { id, name, restaurantId } = state.currentItemWithVariants;

    const cartItemId = `${id}-${variantName}`;

    addItemToCart(id, name, Number(price), restaurantId, variantName, cartItemId);

    hideModal(modals.variant);
    state.currentItemWithVariants = null;
}

function addItemToCart(itemId, itemName, itemPrice, restaurantId, variantName = null, cartItemId = null) {
    const cId = cartItemId || itemId;

    state.cartRestaurantId = restaurantId;
    const existingItem = state.cart.find(item => item.cartItemId === cId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        state.cart.push({
            id: itemId,
            name: itemName,
            price: itemPrice,
            quantity: 1,
            restaurantId: restaurantId,
            variantName: variantName,
            cartItemId: cId
        });
    }

    renderCart();
    const displayName = variantName ? `${itemName} (${variantName})` : itemName;
    showMessage("Berhasil!", `${displayName} ditambahkan ke keranjang.`);
    setTimeout(() => hideModal(modals.message), 1500);
}


function handleRemoveFromCart(e) {
    const cartId = e.currentTarget.dataset.cartItemId;
    const itemIndex = state.cart.findIndex(item => item.cartItemId === cartId);

    if (itemIndex > -1) {
        const item = state.cart[itemIndex];
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            state.cart.splice(itemIndex, 1);
        }
    }

    if (state.cart.length === 0) {
        state.cartRestaurantId = null;
    }

    renderCart();
}

function handleClearCart() {
    state.cart = [];
    state.cartRestaurantId = null;
    renderCart();
    showMessage("Keranjang Dikosongkan", "Anda sekarang dapat memesan dari toko lain.");
    setTimeout(() => hideModal(modals.message), 2000);
}

async function handleConfirmOrder(e) {
    e.preventDefault();
    const name = document.getElementById('checkout-name').value;
    const address = document.getElementById('checkout-address').value;
    if (!name || !address) {
        showMessage("Error", "Nama dan Alamat tidak boleh kosong.", false);
        return;
    }
    const order = {
        userId: userId,
        customerName: name,
        customerEmail: userEmail,
        customerAddress: address,
        items: state.cart,
        status: "Pending",
        createdAt: serverTimestamp(),
        restaurantId: state.cartRestaurantId
    };
    try {
        await addDoc(orderCollectionRef, order);
        showMessage("Pesanan Diterima!", "Pesanan Anda sedang diproses. Silakan tunggu konfirmasi admin.");
        state.cart = [];
        state.cartRestaurantId = null;
        checkoutForm.reset();
        renderCart();
        hideModal(modals.checkout);
    } catch (error) {
        console.error("Error saat membuat pesanan: ", error);
        showMessage("Error", "Gagal membuat pesanan. Coba lagi.", false);
    }
}

function handleTrackOrder() {
    showModal(modals.orderStatus);
    if (userOrderListener) userOrderListener();
    const q = query(orderCollectionRef, where("userId", "==", userId));
    userOrderListener = onSnapshot(q, (snapshot) => {
        const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        orders.sort((a, b) => (b.createdAt?.toDate() || 0) - (a.createdAt?.toDate() || 0));
        renderUserOrders(orders);
    }, (error) => {
        console.error("Error mendengarkan status pesanan: ", error);
        showMessage("Error", "Gagal memuat status pesanan.", false);
    });
}

async function handleViewOwnerOrderDetail(e) {
    const orderId = e.currentTarget.dataset.id;
    state.currentOwnerOrder = orderId;
    try {
        const orderRef = doc(orderCollectionRef, orderId);
        const orderSnap = await getDoc(orderRef);

        if (!orderSnap.exists()) {
            throw new Error("Order not found.");
        }
        const orderData = orderSnap.data();

        if (orderData.restaurantId !== state.ownerRestaurantId) {
            throw new Error("Access denied. This order does not belong to your store.");
        }

        const total = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let itemsHtml = orderData.items.map(item => {
            const displayName = item.variantName ? `${item.name} (${item.variantName})` : item.name;
            return `<li class="text-sm">
                ${displayName} (x${item.quantity}) - ${formatRupiah(item.price * item.quantity)}
            </li>`
        }).join('');

        const detailContent = `
            <p><strong>Pelanggan:</strong> ${orderData.customerName} (${orderData.customerEmail})</p>
            <p><strong>Alamat:</strong> ${orderData.customerAddress}</p>
            <p><strong>Status:</strong> ${orderData.status}</p>
            <p><strong>Total:</strong> ${formatRupiah(total)}</p>
            <hr class="my-3 border-slate-700">
            <p><strong>Item:</strong></p>
            <ul class="list-disc list-inside ml-4">${itemsHtml}</ul>
        `;
        document.getElementById('owner-order-detail-content').innerHTML = detailContent;
        document.getElementById('owner-confirm-btn').classList.toggle('hidden', orderData.status !== 'Pending');
        document.getElementById('owner-complete-btn').classList.toggle('hidden', orderData.status !== 'Confirmed');
        showModal(modals.ownerDetail);
    } catch (error) {
        console.error("Error mengambil detail pesanan: ", error);
        showMessage("Error", "Gagal memuat detail pesanan.", false);
    }
}

async function handleUpdateOrderStatus(newStatus) {
    if (!state.currentOwnerOrder) return;
    const orderRef = doc(orderCollectionRef, state.currentOwnerOrder);
    try {
        await updateDoc(orderRef, { status: newStatus });
        showMessage("Sukses!", `Pesanan telah ditandai sebagai ${newStatus}.`);
        hideModal(modals.ownerDetail);
        state.currentOwnerOrder = null;
    } catch (error) {
        console.error("Error update status: ", error);
        showMessage("Error", "Gagal update status pesanan.", false);
    }
}


// --- FUNGSI LAIN-LAIN ---

function updateRestaurantDisplay() {
    const searchTerm = state.searchTerm.toLowerCase();
    const category = state.activeCategory;
    let filteredList = [...state.restaurants];
    if (category !== 'semua') {
        filteredList = filteredList.filter(resto =>
            resto.tags && resto.tags.includes(category)
        );
    }
    if (searchTerm) {
        filteredList = filteredList.filter(resto => {
            if (resto.name.toLowerCase().includes(searchTerm)) {
                return true;
            }
            if (resto.items.some(item => item.name.toLowerCase().includes(searchTerm))) {
                return true;
            }
            return false;
        });
    }
    renderRestaurants(filteredList);
}

function getStatusClass(status) {
    switch (status) {
        case "Pending": return { bg: "bg-yellow-500/20", text: "text-yellow-400" };
        case "Confirmed": return { bg: "bg-blue-500/20", text: "text-blue-400" };
        case "Delivered": return { bg: "bg-green-500/20", text: "text-green-400" };
        case "Cancelled": return { bg: "bg-red-500/20", text: "text-red-400" };
        default: return { bg: "bg-gray-500/20", text: "text-gray-400" };
    }
}
function getFirebaseError(error) {
    switch (error.code) {
        case 'auth/user-not-found': return 'Email tidak ditemukan. Silakan daftar terlebih dahulu.';
        case 'auth/wrong-password': return 'Kata sandi salah. Silakan coba lagi.';
        case 'auth/email-already-in-use': return 'Email ini sudah terdaftar. Silakan masuk.';
        case 'auth/weak-password': return 'Kata sandi terlalu lemah (minimal 6 karakter).';
        case 'auth/invalid-email': return 'Format email tidak valid.';
        case 'auth/operation-not-allowed': return 'Metode login Email/Password belum diaktifkan di Firebase Console.';
        default: return error.message;
    }
}

async function startAppListeners(role) {
    await setupRestaurantData();

    renderFilterButtons();

    if (restaurantListener) restaurantListener();
    restaurantListener = onSnapshot(restaurantCollectionRef, (snapshot) => {
        state.restaurants = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        updateRestaurantDisplay();

        if (state.role === 'owner' && state.ownerRestaurantId) {
            const myStore = state.restaurants.find(r => r.id === state.ownerRestaurantId);
            if (myStore) {
                document.getElementById('owner-store-name').textContent = `Dasbor: ${myStore.name}`;
            }
        }
    }, (error) => {
        console.error("Error mendengarkan data restoran: ", error);
    });

    if (role === 'owner' && state.ownerRestaurantId) {
        if (ownerOrderListener) ownerOrderListener();

        const q = query(orderCollectionRef, where("restaurantId", "==", state.ownerRestaurantId));

        ownerOrderListener = onSnapshot(q, (snapshot) => {
            const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            orders.sort((a, b) => {
                const statusOrder = { "Pending": 1, "Confirmed": 2, "Delivered": 3, "Cancelled": 4 };
                return (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99) || ((b.createdAt?.toDate() || 0) - (a.createdAt?.toDate() || 0));
            });
            renderOwnerOrders(orders);
        }, (error) => {
            console.error("Error mendengarkan pesanan pemilik toko: ", error);
        });
    }
    if (userOrderListener) userOrderListener();
}

function stopAppListeners() {
    if (restaurantListener) restaurantListener();
    if (ownerOrderListener) ownerOrderListener();
    if (userOrderListener) userOrderListener();
    restaurantListener = null;
    ownerOrderListener = null;
    userOrderListener = null;
}

// --- INISIALISASI ---

function setupFormAndNavListeners() {
    // Navigasi Auth
    document.getElementById('goto-login-btn').addEventListener('click', () => switchView('login'));
    document.getElementById('goto-register-btn').addEventListener('click', () => switchView('register'));
    document.getElementById('goto-login-link').addEventListener('click', () => switchView('login'));
    document.getElementById('goto-register-link').addEventListener('click', () => switchView('register'));

    // Form Auth
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);

    // Tombol Logout
    document.getElementById('user-logout-btn').addEventListener('click', handleLogout);
    document.getElementById('owner-logout-btn').addEventListener('click', handleLogout);

    // Listener untuk Search dan Filter
    searchBar.addEventListener('input', (e) => {
        state.searchTerm = e.target.value;
        updateRestaurantDisplay();
    });

    categoryFiltersEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (btn && btn.dataset.category) {
            state.activeCategory = btn.dataset.category;
            categoryFiltersEl.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-cyan-500', 'text-slate-900', 'shadow-lg', 'shadow-cyan-500/30');
                b.classList.add('bg-slate-800/60', 'backdrop-blur-lg', 'border', 'border-slate-700', 'text-slate-300', 'hover:bg-slate-700/80', 'hover:border-slate-600');
            });
            btn.classList.add('active', 'bg-cyan-500', 'text-slate-900', 'shadow-lg', 'shadow-cyan-500/30');
            btn.classList.remove('bg-slate-800/60', 'backdrop-blur-lg', 'border', 'border-slate-700', 'text-slate-300', 'hover:bg-slate-700/80', 'hover:border-slate-600');

            updateRestaurantDisplay();
        }
    });

    // --- Listener Modal ---
    // Modal AI
    document.getElementById('ai-helper-btn').addEventListener('click', () => {
        renderAiSessionList();
        renderAiChatHistory(false);
        aiForm.reset();
        submitAiQueryBtn.disabled = false;
        showModal(modals.ai);
        setTimeout(() => document.getElementById('ai-query').focus(), 400);
    });
    document.getElementById('close-ai-btn').addEventListener('click', () => hideModal(modals.ai));
    aiForm.addEventListener('submit', handleAiQuery);
    aiNewChatBtn.addEventListener('click', handleNewAiChat);

    aiChatHistoryEl.addEventListener('click', (e) => {
        const button = e.target.closest('.ai-goto-item-btn');
        if (button) {
            e.preventDefault();
            handleAiGoToItem(button.dataset.id, button.dataset.restoId);
        }
    });

    // Keranjang
    document.getElementById('cart-btn').addEventListener('click', () => {
        renderCart();
        showModal(modals.cart);
    });
    document.getElementById('close-cart-btn').addEventListener('click', () => hideModal(modals.cart));
    clearCartBtn.addEventListener('click', handleClearCart);

    // Checkout
    checkoutBtn.addEventListener('click', () => {
        hideModal(modals.cart);
        const checkoutNameInput = document.getElementById('checkout-name');
        if (auth.currentUser) {
            getDoc(doc(userCollectionRef, auth.currentUser.uid)).then(docSnap => {
                if (docSnap.exists()) {
                    checkoutNameInput.value = docSnap.data().name || '';
                }
            });
        }
        showModal(modals.checkout);
    });
    document.getElementById('close-checkout-btn').addEventListener('click', () => hideModal(modals.checkout));
    checkoutForm.addEventListener('submit', handleConfirmOrder);

    // Lacak Pesanan
    document.getElementById('track-order-btn').addEventListener('click', handleTrackOrder);
    document.getElementById('close-order-status-btn').addEventListener('click', () => {
        hideModal(modals.orderStatus);
        if (userOrderListener) userOrderListener();
    });

    // Detail Pesanan Pemilik Toko
    document.getElementById('close-owner-detail-btn').addEventListener('click', () => {
        hideModal(modals.ownerDetail);
        state.currentOwnerOrder = null;
    });
    document.getElementById('owner-confirm-btn').addEventListener('click', () => handleUpdateOrderStatus('Confirmed'));
    document.getElementById('owner-complete-btn').addEventListener('click', () => handleUpdateOrderStatus('Delivered'));

    // Modal Menu
    document.getElementById('close-menu-btn').addEventListener('click', () => hideModal(modals.menu));

    // Message Modal
    document.getElementById('close-message-btn').addEventListener('click', () => hideModal(modals.message));

    // Modal Varian
    variantForm.addEventListener('submit', handleVariantSubmit);
    document.getElementById('close-variant-btn').addEventListener('click', () => hideModal(modals.variant));
}

// --- ENTRY POINT (Saat halaman dimuat) ---
window.onload = () => {
    try {
        // --- (PERBAIKAN KUNCI) ---
        // Semua variabel elemen DOM diinisialisasi di sini, SETELAH halaman dimuat.
        views = {
            landing: document.getElementById('landing-view'),
            login: document.getElementById('login-view'),
            register: document.getElementById('register-view'),
            user: document.getElementById('user-view'),
            owner: document.getElementById('owner-view'),
        };
        modals = {
            cart: document.getElementById('cart-modal'),
            checkout: document.getElementById('checkout-modal'),
            orderStatus: document.getElementById('order-status-modal'),
            ownerDetail: document.getElementById('owner-order-detail-modal'),
            message: document.getElementById('message-modal'),
            menu: document.getElementById('menu-modal'),
            ai: document.getElementById('ai-modal'),
            variant: document.getElementById('variant-modal')
        };
        loginForm = document.getElementById('login-form');
        registerForm = document.getElementById('register-form');
        aiForm = document.getElementById('ai-form');
        aiChatHistoryEl = document.getElementById('ai-chat-history');
        aiSessionListEl = document.getElementById('ai-session-list');
        aiNewChatBtn = document.getElementById('ai-new-chat-btn');
        submitAiQueryBtn = document.getElementById('submit-ai-query-btn');
        restaurantListEl = document.getElementById('restaurant-list');
        cartCountEl = document.getElementById('cart-count');
        cartItemsEl = document.getElementById('cart-items');
        cartTotalEl = document.getElementById('cart-total');
        checkoutForm = document.getElementById('checkout-form');
        ownerOrderListEl = document.getElementById('owner-order-list');
        userOrderListEl = document.getElementById('user-order-list');
        menuItemListEl = document.getElementById('menu-item-list');
        menuRestaurantNameEl = document.getElementById('menu-restaurant-name');
        cartStoreInfoEl = document.getElementById('cart-store-info');
        cartStoreNameEl = document.getElementById('cart-store-name');
        clearCartBtn = document.getElementById('clear-cart-btn');
        checkoutBtn = document.getElementById('checkout-btn');
        searchBar = document.getElementById('search-bar');
        categoryFiltersEl = document.getElementById('category-filters');
        variantForm = document.getElementById('variant-form');
        variantItemNameEl = document.getElementById('variant-item-name');
        variantOptionsEl = document.getElementById('variant-options');
        // --- Akhir Inisialisasi DOM ---


        // Inisialisasi Path Database
        const restaurantPath = "restaurants";
        const orderPath = "orders";
        const userPath = "users";

        restaurantCollectionRef = collection(db, restaurantPath);
        orderCollectionRef = collection(db, orderPath);
        userCollectionRef = collection(db, userPath);

        // Pasang semua event listener
        setupFormAndNavListeners();

        // Mulai listener status autentikasi
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                userId = user.uid;
                userEmail = user.email;

                aiChatCollectionRef = collection(db, userPath, userId, 'ai-chat-sessions');

                const userDocRef = doc(userCollectionRef, user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    state.role = userData.role;
                    state.ownerRestaurantId = userData.restaurantId || null;

                    try {
                        const chatQuery = query(aiChatCollectionRef);
                        const chatSnapshot = await getDocs(chatQuery);
                        state.aiChatSessions = chatSnapshot.docs.map(doc => ({
                            id: doc.id,
                            title: doc.data().title,
                            createdAt: doc.data().createdAt
                        }));
                    } catch (chatError) {
                        console.error("Gagal memuat daftar riwayat chat:", chatError);
                        state.aiChatSessions = [];
                    }

                    handleNewAiChat();
                    await startAppListeners(state.role);

                    if (state.role === 'owner') {
                        document.getElementById('owner-email-display').textContent = userEmail;
                        switchView('owner');
                    } else {
                        document.getElementById('user-email-display').textContent = userEmail;
                        switchView('user');
                    }
                } else {
                    console.error("Data user tidak ditemukan di Firestore!");
                    showMessage("Error Akun", "Gagal memuat data pengguna. Silakan login ulang.", false);
                    await handleLogout();
                }

            } else {
                userId = null;
                userEmail = null;
                state.cart = [];
                state.restaurants = [];
                state.aiChatSessions = [];
                state.currentChatId = null;
                state.currentChatHistory = [];
                state.role = null;
                state.ownerRestaurantId = null;
                state.cartRestaurantId = null;
                state.searchTerm = '';
                state.activeCategory = 'semua';
                aiChatCollectionRef = null;

                stopAppListeners();
                switchView('landing');
            }
        });

    } catch (error) {
        console.error("Gagal inisialisasi:", error);
        // Tampilkan error di body JIKA inisialisasi DOM gagal
        document.body.innerHTML = `<div class="p-8 text-center text-red-600"><h1>Error Kritis.</h1><p>${error.message}</p><p>Pastikan file HTML Anda memiliki semua ID elemen yang benar.</p></div>`;
    }
};