import type { ProductCardProps } from "@/src/components/product/ProductCard";
import type { FilterDefinition } from "@/src/app/(storefront)/products/demo/_config";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SearchResultType = "product" | "category" | "brand";

export interface SearchResultCategory {
  type: "category";
  id: string;
  name: string;
  href: string;
  productCount: number;
  thumbnail?: string;
}

export interface SearchResultBrand {
  type: "brand";
  id: string;
  name: string;
  href: string;
  logoUrl?: string;
  description?: string;
}

export interface SearchResults {
  query: string;
  totalProducts: number;
  products: ProductCardProps[];
  categories: SearchResultCategory[];
  brands: SearchResultBrand[];
  didYouMean?: string;
}

// ─── Filter definitions ───────────────────────────────────────────────────────

export const SEARCH_FILTER_DEFINITIONS: FilterDefinition[] = [
  {
    key: "price",
    label: "Khoảng giá",
    type: "range",
    min: 0,
    max: 100_000_000,
    step: 500_000,
    unit: "₫",
  },
  {
    key: "brand",
    label: "Thương hiệu",
    type: "checkbox",
    options: [
      { value: "asus",       label: "ASUS" },
      { value: "msi",        label: "MSI" },
      { value: "gigabyte",   label: "Gigabyte" },
      { value: "intel",      label: "Intel" },
      { value: "amd",        label: "AMD" },
      { value: "corsair",    label: "Corsair" },
      { value: "logitech",   label: "Logitech" },
      { value: "razer",      label: "Razer" },
      { value: "keychron",   label: "Keychron" },
      { value: "samsung",    label: "Samsung" },
    ],
  },
  {
    key: "rating",
    label: "Đánh giá",
    type: "rating",
  },
  {
    key: "inStock",
    label: "Còn hàng",
    type: "toggle",
  },
];

// ─── Popular searches ─────────────────────────────────────────────────────────

export const POPULAR_SEARCHES: string[] = [
  "RTX 4090",
  "Core i9",
  "Laptop gaming ASUS",
  "RAM DDR5",
  "SSD NVMe 1TB",
  "Màn hình 4K",
  "Bàn phím cơ Keychron",
  "Chuột Logitech G Pro",
  "RTX 4070 Ti Super",
  "Ryzen 9 7950X",
  "Màn hình OLED 27\"",
  "Tai nghe gaming",
];

// ─── Mock product helpers ─────────────────────────────────────────────────────

function laptop(
  id: string,
  name: string,
  brand: string,
  price: number,
  originalPrice: number,
  rating: number,
  reviewCount: number,
  stock: "in-stock" | "low-stock" = "in-stock"
): ProductCardProps {
  return {
    id,
    name,
    brand,
    href: `/products/${id}`,
    thumbnail: "/icons/laptop-gaming.png",
    badge: "Sale",
    price,
    originalPrice,
    rating,
    reviewCount,
    stockStatus: stock,
  };
}

function ram(
  id: string,
  name: string,
  brand: string,
  price: number,
  originalPrice: number,
  rating: number,
  reviewCount: number,
  stock: "in-stock" | "low-stock" = "in-stock"
): ProductCardProps {
  return {
    id,
    name,
    brand,
    href: `/products/${id}`,
    thumbnail: "/icons/ram.png",
    badge: "Sale",
    price,
    originalPrice,
    rating,
    reviewCount,
    stockStatus: stock,
  };
}

function ssd(
  id: string,
  name: string,
  brand: string,
  price: number,
  originalPrice: number,
  rating: number,
  reviewCount: number,
  stock: "in-stock" | "low-stock" = "in-stock"
): ProductCardProps {
  return {
    id,
    name,
    brand,
    href: `/products/${id}`,
    thumbnail: "/icons/ssd.png",
    badge: "Sale",
    price,
    originalPrice,
    rating,
    reviewCount,
    stockStatus: stock,
  };
}

function monitor(
  id: string,
  name: string,
  brand: string,
  price: number,
  originalPrice: number,
  rating: number,
  reviewCount: number,
  stock: "in-stock" | "low-stock" = "in-stock"
): ProductCardProps {
  return {
    id,
    name,
    brand,
    href: `/products/${id}`,
    thumbnail: "/icons/monitor.png",
    badge: "Sale",
    price,
    originalPrice,
    rating,
    reviewCount,
    stockStatus: stock,
  };
}

function mouse(
  id: string,
  name: string,
  brand: string,
  price: number,
  originalPrice: number,
  rating: number,
  reviewCount: number,
  stock: "in-stock" | "low-stock" = "in-stock"
): ProductCardProps {
  return {
    id,
    name,
    brand,
    href: `/products/${id}`,
    thumbnail: "/icons/mouse.png",
    badge: "Sale",
    price,
    originalPrice,
    rating,
    reviewCount,
    stockStatus: stock,
  };
}

function gpu(
  id: string,
  name: string,
  brand: string,
  price: number,
  originalPrice: number,
  rating: number,
  reviewCount: number,
  stock: "in-stock" | "low-stock" = "in-stock"
): ProductCardProps {
  return {
    id,
    name,
    brand,
    href: `/products/${id}`,
    thumbnail: "/icons/gpu.png",
    badge: "Sale",
    price,
    originalPrice,
    rating,
    reviewCount,
    stockStatus: stock,
  };
}

function keyboard(
  id: string,
  name: string,
  brand: string,
  price: number,
  originalPrice: number,
  rating: number,
  reviewCount: number,
  stock: "in-stock" | "low-stock" = "in-stock"
): ProductCardProps {
  return {
    id,
    name,
    brand,
    href: `/products/${id}`,
    thumbnail: "/icons/keyboard.png",
    badge: "Sale",
    price,
    originalPrice,
    rating,
    reviewCount,
    stockStatus: stock,
  };
}

function cpu(
  id: string,
  name: string,
  brand: string,
  price: number,
  originalPrice: number,
  rating: number,
  reviewCount: number,
  stock: "in-stock" | "low-stock" = "in-stock"
): ProductCardProps {
  return {
    id,
    name,
    brand,
    href: `/products/${id}`,
    thumbnail: "/icons/cpu-intel.png",
    badge: "Sale",
    price,
    originalPrice,
    rating,
    reviewCount,
    stockStatus: stock,
  };
}

// ─── RTX 4070 results ─────────────────────────────────────────────────────────

const RTX_4070_PRODUCTS: ProductCardProps[] = [
  gpu("rtx4070-asus-tuf",      "VGA ASUS TUF Gaming GeForce RTX 4070 12GB GDDR6X OC Edition",        "ASUS",    17_990_000, 22_500_000, 4.9, 214, "low-stock"),
  gpu("rtx4070-msi-slim",      "VGA MSI GeForce RTX 4070 Gaming Slim 12G",                           "MSI",     16_990_000, 21_000_000, 4.8, 189),
  gpu("rtx4070-gigabyte-eagle","VGA Gigabyte GeForce RTX 4070 Eagle OC 12G",                         "Gigabyte",16_490_000, 20_500_000, 4.7, 156),
  gpu("rtx4070-asus-dual",     "VGA ASUS Dual GeForce RTX 4070 OC Edition 12GB GDDR6X",              "ASUS",    17_490_000, 21_500_000, 4.8, 203),
  gpu("rtx4070-msi-ventus",    "VGA MSI GeForce RTX 4070 Ventus 3X 12G OC",                         "MSI",     16_290_000, 20_000_000, 4.6, 142),
  gpu("rtx4070-palit-dual",    "VGA Palit GeForce RTX 4070 Dual 12GB GDDR6X",                        "Palit",   15_990_000, 19_800_000, 4.5, 98),
  gpu("rtx4070-zotac-trinity", "VGA Zotac Gaming GeForce RTX 4070 Trinity OC 12GB",                  "Zotac",   16_790_000, 20_800_000, 4.7, 167),
  gpu("rtx4070-inno3d-twin",   "VGA Inno3D GeForce RTX 4070 Twin X2 OC 12GB GDDR6X",                "Inno3D",  16_190_000, 20_200_000, 4.5, 87),
  gpu("rtx4070-asus-proart",   "VGA ASUS ProArt GeForce RTX 4070 OC Edition 12GB GDDR6X",            "ASUS",    18_490_000, 23_000_000, 4.9, 112, "low-stock"),
  gpu("rtx4070-gigabyte-wf",   "VGA Gigabyte GeForce RTX 4070 WindForce OC 12G",                     "Gigabyte",15_790_000, 19_600_000, 4.6, 131),
  gpu("rtx4070-colorful",      "VGA Colorful iGame GeForce RTX 4070 Ultra W OC 12G",                 "Colorful",16_590_000, 20_500_000, 4.5, 74),
  gpu("rtx4070-pny-verto",     "VGA PNY GeForce RTX 4070 12GB VERTO Dual Fan Edition GDDR6X",        "PNY",     15_490_000, 19_200_000, 4.4, 63),
];

// ─── Keyboard results ("keybord" typo) ───────────────────────────────────────

const KEYBOARD_PRODUCTS: ProductCardProps[] = [
  keyboard("kbd-keychron-k2pro",  "Bàn phím cơ Keychron K2 Pro QMK/VIA Wireless (Hotswap, RGB)",       "Keychron", 2_290_000, 2_890_000, 4.9, 312),
  keyboard("kbd-asus-rog-cla",    "Bàn phím cơ ASUS ROG Claymore II TKL RX Red Switch RGB",            "ASUS",     5_490_000, 6_900_000, 4.8, 87),
  keyboard("kbd-steelseries-apex","Bàn phím cơ SteelSeries Apex Pro TKL 2023 OmniPoint HyperMag",      "SteelSeries",4_290_000, 5_400_000, 4.7, 156),
  keyboard("kbd-razer-huntsman",  "Bàn phím cơ Razer Huntsman V2 TKL Linear Optical Switch",           "Razer",    3_690_000, 4_600_000, 4.7, 203),
  keyboard("kbd-corsair-k100",    "Bàn phím cơ Corsair K100 RGB OPX Linear Optical Mechanical",        "Corsair",  6_290_000, 7_800_000, 4.8, 134, "low-stock"),
  keyboard("kbd-logi-g915tkl",   "Bàn phím cơ Logitech G915 TKL LIGHTSPEED Wireless RGB GL Linear",   "Logitech", 3_990_000, 4_990_000, 4.8, 278),
  keyboard("kbd-akko-3087",      "Bàn phím cơ Akko 3087 DS Horizon Blue on White CS Silver",           "Akko",     1_290_000, 1_590_000, 4.5, 189),
  keyboard("kbd-dareu-a98",      "Bàn phím cơ DAREU A98 Pro TRI-MODE Wireless RGB Hotswap",            "DAREU",    1_490_000, 1_890_000, 4.6, 224),
];

// ─── Laptop gaming results ────────────────────────────────────────────────────

const LAPTOP_GAMING_PRODUCTS: ProductCardProps[] = [
  laptop("laptop-asus-rog-g14-2024",    "Laptop ASUS ROG Zephyrus G14 2024 Ryzen 9 8945HS RTX 4060 14\" 165Hz",    "ASUS",        39_990_000, 46_000_000, 4.9, 234, "low-stock"),
  laptop("laptop-asus-rog-strix-g16",   "Laptop ASUS ROG Strix G16 2024 Core i9-14900HX RTX 4070 16\" 240Hz",       "ASUS",        47_990_000, 55_000_000, 4.8, 187),
  laptop("laptop-msi-titan-gt77",       "Laptop MSI Titan GT77 HX i9-13980HX RTX 4090 17.3\" 4K 144Hz",             "MSI",         89_990_000, 99_000_000, 4.9, 112, "low-stock"),
  laptop("laptop-msi-raider-ge78",      "Laptop MSI Raider GE78 HX i9-14900HX RTX 4080 17\" QHD+ 240Hz",            "MSI",         59_990_000, 69_000_000, 4.8, 98),
  laptop("laptop-gigabyte-aorus17x",    "Laptop Gigabyte AORUS 17X Core i9-13980HX RTX 4090 17.3\" QHD 240Hz",      "Gigabyte",    69_990_000, 79_000_000, 4.7, 76),
  laptop("laptop-lenovo-legion-pro7",   "Laptop Lenovo Legion Pro 7i Gen 8 i9-13900HX RTX 4080 16\" 240Hz",          "Lenovo",      49_990_000, 57_000_000, 4.8, 203),
  laptop("laptop-razer-blade-16",       "Laptop Razer Blade 16 2024 Intel Core i9-14900HX RTX 4090 16\" QHD+ 240Hz","Razer",        89_990_000, 99_000_000, 4.9, 89, "low-stock"),
  laptop("laptop-dell-alienware-m18",   "Laptop Dell Alienware m18 R2 i9-14900HX RTX 4090 18\" FHD+ 480Hz",          "Dell",        74_990_000, 85_000_000, 4.7, 67),
  laptop("laptop-hp-omen-16",           "Laptop HP OMEN 16 2024 Ryzen 9 8945HS RTX 4070 16\" QHD 165Hz",             "HP",          37_990_000, 44_000_000, 4.7, 145),
  laptop("laptop-acer-predator-helios", "Laptop Acer Predator Helios 18 i9-14900HX RTX 4090 18\" WQXGA 250Hz",      "Acer",        69_990_000, 80_000_000, 4.6, 134),
  laptop("laptop-asus-tuf-gaming-a16",  "Laptop ASUS TUF Gaming A16 2024 Ryzen 9 7940HS RTX 4070 16\" 165Hz",       "ASUS",        29_990_000, 35_000_000, 4.7, 312),
  laptop("laptop-lenovo-lof-5i-pro",    "Laptop Lenovo LOQ 5i 2024 Core i7-13650HX RTX 4060 15.6\" FHD 144Hz",      "Lenovo",      24_990_000, 29_000_000, 4.6, 267),
];

// ─── RAM DDR5 results ─────────────────────────────────────────────────────────

const RAM_DDR5_PRODUCTS: ProductCardProps[] = [
  ram("ram-corsair-32gb-6000",    "RAM Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz CL36 Black",              "Corsair",  3_490_000, 4_200_000, 4.9, 312),
  ram("ram-gskill-32gb-6000",     "RAM G.Skill Trident Z5 RGB DDR5 32GB (2x16GB) 6000MHz CL30",               "G.Skill",  4_190_000, 5_000_000, 4.9, 278),
  ram("ram-kingston-fury-32gb",   "RAM Kingston Fury Beast DDR5 32GB (2x16GB) 5200MHz CL40",                  "Kingston", 2_890_000, 3_500_000, 4.8, 234),
  ram("ram-adata-xpg-32gb",       "RAM ADATA XPG Lancer RGB DDR5 32GB (2x16GB) 6000MHz CL30",                 "ADATA",    3_190_000, 3_900_000, 4.7, 187),
  ram("ram-corsair-64gb-5600",    "RAM Corsair Dominator Platinum RGB DDR5 64GB (2x32GB) 5600MHz",             "Corsair",  7_990_000, 9_500_000, 4.8, 145),
  ram("ram-gskill-64gb-6400",     "RAM G.Skill Trident Z5 RGB DDR5 64GB (2x32GB) 6400MHz CL32",               "G.Skill",  9_190_000, 11_000_000, 4.9, 89),
  ram("ram-kingston-fury-16gb",   "RAM Kingston Fury Beast DDR5 16GB (1x16GB) 5200MHz CL40",                  "Kingston", 1_490_000, 1_800_000, 4.7, 356),
  ram("ram-teamgroup-t-force",    "RAM TeamGroup T-Force Vulcan DDR5 32GB (2x16GB) 5600MHz CL36",              "TeamGroup",2_790_000, 3_400_000, 4.6, 167),
];

// ─── SSD 1TB results ──────────────────────────────────────────────────────────

const SSD_1TB_PRODUCTS: ProductCardProps[] = [
  ssd("ssd-samsung-990pro-1tb",   "SSD Samsung 990 Pro NVMe M.2 1TB PCIe 4.0 (7450/6900 MB/s)",              "Samsung",  2_890_000, 3_500_000, 4.9, 456),
  ssd("ssd-wd-black-sn850x",      "SSD WD Black SN850X NVMe M.2 1TB PCIe 4.0 (7300/6600 MB/s)",              "WD",       2_690_000, 3_300_000, 4.9, 389),
  ssd("ssd-seagate-firecuda530",  "SSD Seagate FireCuda 530 M.2 1TB PCIe 4.0 (7300/6900 MB/s)",              "Seagate",  2_790_000, 3_400_000, 4.8, 267),
  ssd("ssd-kingston-fury-renegade","SSD Kingston Fury Renegade M.2 1TB PCIe 4.0 (7300/7000 MB/s)",            "Kingston", 2_590_000, 3_200_000, 4.8, 312),
  ssd("ssd-corsair-mp600-pro",    "SSD Corsair MP600 Pro NVMe M.2 1TB PCIe 4.0 (7100/6800 MB/s)",            "Corsair",  2_790_000, 3_400_000, 4.7, 198),
  ssd("ssd-samsung-980pro-1tb",   "SSD Samsung 980 Pro NVMe M.2 1TB PCIe 4.0 (7000/5100 MB/s)",              "Samsung",  2_190_000, 2_700_000, 4.8, 534),
  ssd("ssd-wd-blue-sn580",        "SSD WD Blue SN580 NVMe M.2 1TB PCIe 4.0 (4150/4150 MB/s)",               "WD",       1_490_000, 1_900_000, 4.7, 423),
  ssd("ssd-crucial-p5plus",       "SSD Crucial P5 Plus M.2 1TB PCIe 4.0 (6600/5000 MB/s)",                   "Crucial",  1_790_000, 2_200_000, 4.6, 289),
  ssd("ssd-adata-legend-960",     "SSD ADATA Legend 960 M.2 1TB PCIe 4.0 (7400/6800 MB/s)",                  "ADATA",    2_390_000, 2_900_000, 4.7, 176),
  ssd("ssd-kingston-nv2-1tb",     "SSD Kingston NV2 M.2 1TB PCIe 4.0 (3500/2800 MB/s)",                      "Kingston", 1_190_000, 1_490_000, 4.5, 612),
];

// ─── Màn hình 4K results ──────────────────────────────────────────────────────

const MONITOR_4K_PRODUCTS: ProductCardProps[] = [
  monitor("mon-lg-27gp950b",      "Màn hình LG UltraGear 27GP950-B 27\" 4K IPS 160Hz HDR600 1ms",             "LG",       14_990_000, 18_000_000, 4.9, 213),
  monitor("mon-samsung-odyssey-g7","Màn hình Samsung Odyssey G7 28\" 4K UHD IPS 144Hz HDR400 1ms",             "Samsung",  12_490_000, 15_000_000, 4.8, 178),
  monitor("mon-asus-rog-swift-pg32","Màn hình ASUS ROG Swift PG32UQX 32\" 4K Mini LED 144Hz G-Sync Ultimate",  "ASUS",     39_990_000, 48_000_000, 4.9, 89, "low-stock"),
  monitor("mon-dell-u2723qe",     "Màn hình Dell U2723QE 27\" 4K UHD IPS USB-C 60W Thunderbolt",              "Dell",     14_990_000, 17_500_000, 4.8, 234),
  monitor("mon-lg-32ep950b",      "Màn hình LG UltraFine 32EP950-B 32\" 4K OLED Pro Display HDR",             "LG",       34_990_000, 40_000_000, 4.9, 67, "low-stock"),
  monitor("mon-msi-mag321upx",    "Màn hình MSI MAG 321UPX QD-OLED 32\" 4K 240Hz 0.03ms",                    "MSI",      24_990_000, 29_000_000, 4.8, 123),
  monitor("mon-acer-pred-xb273k", "Màn hình Acer Predator XB273K 27\" 4K IPS 144Hz G-Sync Compatible",        "Acer",     13_490_000, 16_500_000, 4.7, 156),
  monitor("mon-benq-sw321c",      "Màn hình BenQ SW321C 32\" 4K AdobeRGB 99% IPS Thunderbolt 3",              "BenQ",     24_990_000, 29_000_000, 4.8, 98),
];

// ─── Chuột Logitech results ───────────────────────────────────────────────────

const MOUSE_LOGITECH_PRODUCTS: ProductCardProps[] = [
  mouse("mouse-logi-gpro-x2",     "Chuột gaming Logitech G Pro X Superlight 2 Wireless Hero 2 25600 DPI",     "Logitech", 3_490_000, 4_200_000, 4.9, 456),
  mouse("mouse-logi-g502x-plus",  "Chuột gaming Logitech G502 X Plus Wireless LIGHTFORCE 25600 DPI",          "Logitech", 2_990_000, 3_700_000, 4.8, 378),
  mouse("mouse-logi-g303",        "Chuột gaming Logitech G303 Shroud Edition Wireless 25600 DPI",              "Logitech", 2_490_000, 3_100_000, 4.8, 234, "low-stock"),
  mouse("mouse-logi-g-pro-hm",    "Chuột gaming Logitech G Pro Hero Wired 25600 DPI",                         "Logitech", 1_490_000, 1_890_000, 4.7, 567),
  mouse("mouse-logi-g604",        "Chuột gaming Logitech G604 LIGHTSPEED Wireless Hero 16000 DPI",             "Logitech", 1_790_000, 2_200_000, 4.7, 312),
  mouse("mouse-logi-mx-master3s", "Chuột văn phòng Logitech MX Master 3S Wireless 8000 DPI Silent",           "Logitech", 1_990_000, 2_400_000, 4.9, 689),
];

// ─── i9 14900 results ─────────────────────────────────────────────────────────

const I9_14900_PRODUCTS: ProductCardProps[] = [
  cpu("cpu-i9-14900k",   "CPU Intel Core i9-14900K (Up to 6.0GHz, 24 Nhân 32 Luồng, 36MB Cache, LGA1700)",   "Intel", 13_490_000, 16_900_000, 4.9, 178),
  cpu("cpu-i9-14900kf",  "CPU Intel Core i9-14900KF (Up to 6.0GHz, 24 Nhân 32 Luồng, 36MB Cache, LGA1700)",  "Intel", 12_990_000, 16_200_000, 4.9, 143),
  cpu("cpu-i9-14900ks",  "CPU Intel Core i9-14900KS (Up to 6.2GHz, 24 Nhân 32 Luồng, 36MB Cache, LGA1700)",  "Intel", 16_490_000, 20_500_000, 4.9, 89, "low-stock"),
  cpu("cpu-i9-14900",    "CPU Intel Core i9-14900 (Up to 5.8GHz, 24 Nhân 32 Luồng, 36MB Cache, LGA1700)",    "Intel", 11_490_000, 14_400_000, 4.8, 112),
  cpu("cpu-i9-14900f",   "CPU Intel Core i9-14900F (Up to 5.8GHz, 24 Nhân 32 Luồng, 36MB Cache, LGA1700)",   "Intel", 10_990_000, 13_700_000, 4.8, 97),
  cpu("cpu-i9-14900t",   "CPU Intel Core i9-14900T (Up to 5.5GHz, 24 Nhân 32 Luồng, 36MB Cache, 35W, LGA1700)", "Intel", 10_490_000, 13_100_000, 4.7, 56),
];

// ─── Category/brand data ──────────────────────────────────────────────────────

const CAT_GPU: SearchResultCategory        = { type: "category", id: "gpu",          name: "GPU - Card màn hình",       href: "/products/gpu",              productCount: 248, thumbnail: "/icons/gpu.png" };
const CAT_PC_GAMING: SearchResultCategory  = { type: "category", id: "pc-gaming",    name: "PC Gaming",                 href: "/products/pc-gaming",        productCount: 312 };
const CAT_KEYBOARD: SearchResultCategory   = { type: "category", id: "ban-phim",     name: "Bàn phím cơ",               href: "/products/ban-phim",         productCount: 184, thumbnail: "/icons/keyboard.png" };
const CAT_CPU: SearchResultCategory        = { type: "category", id: "cpu",          name: "CPU - Bộ vi xử lý",         href: "/products/cpu",              productCount: 196, thumbnail: "/icons/cpu-intel.png" };
const CAT_LAPTOP: SearchResultCategory     = { type: "category", id: "laptop-gaming",name: "Laptop Gaming",             href: "/products/laptop-gaming",    productCount: 138, thumbnail: "/icons/laptop-gaming.png" };
const CAT_RAM: SearchResultCategory        = { type: "category", id: "ram",          name: "RAM - Bộ nhớ",              href: "/products/ram",              productCount: 112 };
const CAT_SSD: SearchResultCategory        = { type: "category", id: "ssd",          name: "Ổ cứng SSD",                href: "/products/ssd",              productCount: 203 };
const CAT_MONITOR: SearchResultCategory    = { type: "category", id: "man-hinh",     name: "Màn hình máy tính",         href: "/products/man-hinh",         productCount: 176 };
const CAT_MOUSE: SearchResultCategory      = { type: "category", id: "chuot",        name: "Chuột gaming",              href: "/products/chuot",            productCount: 154 };

const BRAND_ASUS: SearchResultBrand     = { type: "brand", id: "asus",     name: "ASUS",     href: "/brands/asus",     description: "Nhà sản xuất linh kiện máy tính hàng đầu thế giới" };
const BRAND_MSI: SearchResultBrand      = { type: "brand", id: "msi",      name: "MSI",      href: "/brands/msi",      description: "Chuyên gaming & workstation" };
const BRAND_INTEL: SearchResultBrand    = { type: "brand", id: "intel",    name: "Intel",    href: "/brands/intel",    description: "Nhà sản xuất CPU hàng đầu thế giới" };
const BRAND_LOGITECH: SearchResultBrand = { type: "brand", id: "logitech", name: "Logitech", href: "/brands/logitech", description: "Thiết bị ngoại vi gaming & văn phòng hàng đầu" };
const BRAND_SAMSUNG: SearchResultBrand  = { type: "brand", id: "samsung",  name: "Samsung",  href: "/brands/samsung",  description: "Màn hình & linh kiện lưu trữ cao cấp" };
const BRAND_CORSAIR: SearchResultBrand  = { type: "brand", id: "corsair",  name: "Corsair",  href: "/brands/corsair",  description: "RAM, PSU, case và thiết bị gaming" };

// ─── Search results map ───────────────────────────────────────────────────────

const MOCK_SEARCH_RESULTS: Record<string, SearchResults> = {
  "rtx 4070": {
    query: "rtx 4070",
    totalProducts: 12,
    products: RTX_4070_PRODUCTS,
    categories: [CAT_GPU, CAT_PC_GAMING],
    brands: [BRAND_ASUS, BRAND_MSI],
  },
  "keybord": {
    query: "keybord",
    totalProducts: 8,
    products: KEYBOARD_PRODUCTS,
    categories: [CAT_KEYBOARD],
    brands: [],
    didYouMean: "keyboard",
  },
  "i9 14900": {
    query: "i9 14900",
    totalProducts: 6,
    products: I9_14900_PRODUCTS,
    categories: [CAT_CPU],
    brands: [BRAND_INTEL],
  },
  "laptop gaming": {
    query: "laptop gaming",
    totalProducts: 12,
    products: LAPTOP_GAMING_PRODUCTS,
    categories: [CAT_LAPTOP, CAT_PC_GAMING],
    brands: [BRAND_ASUS, BRAND_MSI],
  },
  "ram ddr5": {
    query: "ram ddr5",
    totalProducts: 8,
    products: RAM_DDR5_PRODUCTS,
    categories: [CAT_RAM],
    brands: [BRAND_CORSAIR],
  },
  "ssd 1tb": {
    query: "ssd 1tb",
    totalProducts: 10,
    products: SSD_1TB_PRODUCTS,
    categories: [CAT_SSD],
    brands: [BRAND_SAMSUNG],
  },
  "man hinh 4k": {
    query: "man hinh 4k",
    totalProducts: 8,
    products: MONITOR_4K_PRODUCTS,
    categories: [CAT_MONITOR],
    brands: [BRAND_SAMSUNG, BRAND_ASUS],
  },
  "chuot logitech": {
    query: "chuot logitech",
    totalProducts: 6,
    products: MOUSE_LOGITECH_PRODUCTS,
    categories: [CAT_MOUSE],
    brands: [BRAND_LOGITECH],
  },
};

// ─── Lookup helper ────────────────────────────────────────────────────────────

export function getSearchResults(query: string): SearchResults {
  const normalised = query.trim().toLowerCase();

  // Exact match
  if (MOCK_SEARCH_RESULTS[normalised]) return MOCK_SEARCH_RESULTS[normalised];

  // Partial key match
  const partialKey = Object.keys(MOCK_SEARCH_RESULTS).find((k) =>
    k.includes(normalised) || normalised.includes(k)
  );
  if (partialKey) return MOCK_SEARCH_RESULTS[partialKey];

  // No results fallback
  return {
    query,
    totalProducts: 0,
    products: [],
    categories: [],
    brands: [],
  };
}

// ─── Autocomplete suggestions (small inline dataset for the popover) ──────────

export interface SuggestionProduct {
  id: string;
  name: string;
  href: string;
  thumbnail: string;
  price: number;
}

export interface SuggestionCategory {
  id: string;
  name: string;
  href: string;
}

export const SUGGESTION_PRODUCTS: SuggestionProduct[] = [
  { id: "rtx4070-asus-tuf",        name: "ASUS TUF Gaming GeForce RTX 4070 12GB OC",             href: "/products/rtx4070-asus-tuf",        thumbnail: "/icons/gpu.png",           price: 17_990_000 },
  { id: "rtx4090-asus-tuf",        name: "ASUS TUF Gaming GeForce RTX 4090 24GB OC",             href: "/products/rtx4090-asus-tuf",        thumbnail: "/icons/gpu.png",           price: 42_990_000 },
  { id: "rtx4070-msi-slim",        name: "MSI GeForce RTX 4070 Gaming Slim 12G",                 href: "/products/rtx4070-msi-slim",        thumbnail: "/icons/gpu.png",           price: 16_990_000 },
  { id: "rtx4080-gigabyte-eagle",  name: "Gigabyte GeForce RTX 4080 Eagle OC 16G",               href: "/products/rtx4080-gigabyte-eagle",  thumbnail: "/icons/gpu.png",           price: 29_990_000 },
  { id: "cpu-i9-14900k",           name: "CPU Intel Core i9-14900K 24 Nhân 32 Luồng",            href: "/products/cpu-i9-14900k",           thumbnail: "/icons/cpu-intel.png",     price: 13_490_000 },
  { id: "cpu-i7-14700k",           name: "CPU Intel Core i7-14700K 20 Nhân 28 Luồng",            href: "/products/cpu-i7-14700k",           thumbnail: "/icons/cpu-intel.png",     price: 9_290_000  },
  { id: "cpu-ryzen9-7950x",        name: "CPU AMD Ryzen 9 7950X 16 Nhân 32 Luồng",               href: "/products/cpu-ryzen9-7950x",        thumbnail: "/icons/cpu-intel.png",     price: 15_490_000 },
  { id: "cpu-ryzen7-7800x3d",      name: "CPU AMD Ryzen 7 7800X3D 8 Nhân 16 Luồng 3D V-Cache",  href: "/products/cpu-ryzen7-7800x3d",      thumbnail: "/icons/cpu-intel.png",     price: 9_990_000  },
  { id: "kbd-keychron-k2pro",      name: "Bàn phím cơ Keychron K2 Pro QMK Wireless",             href: "/products/kbd-keychron-k2pro",      thumbnail: "/icons/keyboard.png",      price: 2_290_000  },
  { id: "kbd-logi-g915tkl",        name: "Logitech G915 TKL LIGHTSPEED Wireless",                href: "/products/kbd-logi-g915tkl",        thumbnail: "/icons/keyboard.png",      price: 3_990_000  },
  { id: "ram-corsair-32gb-6000",   name: "RAM Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz",     href: "/products/ram-corsair-32gb-6000",   thumbnail: "/icons/ram.png",           price: 3_490_000  },
  { id: "ram-gskill-32gb-6000",    name: "RAM G.Skill Trident Z5 RGB DDR5 32GB 6000MHz CL30",    href: "/products/ram-gskill-32gb-6000",    thumbnail: "/icons/ram.png",           price: 4_190_000  },
  { id: "ssd-samsung-990pro-1tb",  name: "SSD Samsung 990 Pro NVMe M.2 1TB PCIe 4.0",            href: "/products/ssd-samsung-990pro-1tb",  thumbnail: "/icons/ssd.png",           price: 2_890_000  },
  { id: "ssd-wd-black-sn850x",     name: "SSD WD Black SN850X NVMe M.2 1TB PCIe 4.0",            href: "/products/ssd-wd-black-sn850x",     thumbnail: "/icons/ssd.png",           price: 2_690_000  },
  { id: "monitor-lg-27gp950b",     name: "Màn hình LG UltraGear 27GP950-B 27\" 4K 160Hz",        href: "/products/monitor-lg-27gp950b",     thumbnail: "/icons/monitor.png",       price: 14_990_000 },
  { id: "monitor-samsung-g7-28",   name: "Màn hình Samsung Odyssey G7 28\" 4K 144Hz",             href: "/products/mon-samsung-odyssey-g7",  thumbnail: "/icons/monitor.png",       price: 12_490_000 },
  { id: "laptop-asus-rog-g14-2024",name: "Laptop ASUS ROG Zephyrus G14 2024 Ryzen 9 RTX 4060",   href: "/products/laptop-asus-rog-g14-2024",thumbnail: "/icons/laptop-gaming.png", price: 39_990_000 },
  { id: "laptop-lenovo-legion-p7", name: "Laptop Lenovo Legion Pro 7i i9-13900HX RTX 4080 16\"",  href: "/products/laptop-lenovo-legion-pro7",thumbnail: "/icons/laptop-gaming.png",price: 49_990_000 },
  { id: "mouse-logi-gpro-x2",      name: "Chuột gaming Logitech G Pro X Superlight 2",            href: "/products/mouse-logi-gpro-x2",      thumbnail: "/icons/mouse.png",         price: 3_490_000  },
  { id: "mouse-logi-g502x-plus",   name: "Chuột gaming Logitech G502 X Plus Wireless",            href: "/products/mouse-logi-g502x-plus",   thumbnail: "/icons/mouse.png",         price: 2_990_000  },
  { id: "mouse-razer-viper-v3",    name: "Chuột gaming Razer Viper V3 HyperSpeed Wireless",       href: "/products/mouse-razer-viper-v3",    thumbnail: "/icons/mouse.png",         price: 1_890_000  },
  { id: "headset-steelseries-arc", name: "Tai nghe SteelSeries Arctis Nova Pro Wireless",         href: "/products/headset-steelseries-arc", thumbnail: "/icons/mouse.png",         price: 8_990_000  },
  { id: "psu-corsair-rm1000x",     name: "Nguồn Corsair RM1000x SHIFT 1000W 80+ Gold ATX 3.0",   href: "/products/psu-corsair-rm1000x",     thumbnail: "/icons/mouse.png",         price: 4_490_000  },
  { id: "case-lian-li-o11d",       name: "Case Lian Li PC-O11 Dynamic EVO Mid Tower ATX",         href: "/products/case-lian-li-o11d",       thumbnail: "/icons/mouse.png",         price: 2_990_000  },
];

export const SUGGESTION_CATEGORIES: SuggestionCategory[] = [
  { id: "gpu",         name: "GPU - Card màn hình",   href: "/products/gpu" },
  { id: "cpu",         name: "CPU - Bộ vi xử lý",     href: "/products/cpu" },
  { id: "laptop",      name: "Laptop Gaming",          href: "/products/laptop-gaming" },
  { id: "ban-phim",    name: "Bàn phím cơ",            href: "/products/ban-phim" },
  { id: "chuot",       name: "Chuột gaming",            href: "/products/chuot" },
  { id: "ram",         name: "RAM - Bộ nhớ",            href: "/products/ram" },
  { id: "ssd",         name: "Ổ cứng SSD",              href: "/products/ssd" },
  { id: "man-hinh",    name: "Màn hình máy tính",       href: "/products/man-hinh" },
  { id: "mainboard",   name: "Mainboard",               href: "/products/mainboard" },
  { id: "tan-nhiet",   name: "Tản nhiệt CPU",           href: "/products/tan-nhiet" },
  { id: "nguon",       name: "Nguồn máy tính (PSU)",    href: "/products/nguon" },
  { id: "case",        name: "Vỏ case máy tính",        href: "/products/case" },
];
