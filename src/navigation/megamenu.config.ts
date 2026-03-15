/**
 * megamenu.config.ts
 * Structured data for the storefront SidebarMegaMenu.
 *
 * Data shape mirrors the Vietnamese PC retail reference UI.
 * Import this in any page/layout that renders <SidebarMegaMenu />.
 */

import type { SidebarMenuCategory } from "@/src/components/navigation/MegaMenu";

// ─── Brand lists (reused across multiple categories) ─────────────────────────

const LAPTOP_BRANDS = [
  { name: "Acer",    href: "/brands/acer" },
  { name: "ASUS",    href: "/brands/asus" },
  { name: "Dell",    href: "/brands/dell" },
  { name: "HP",      href: "/brands/hp" },
  { name: "Lenovo",  href: "/brands/lenovo" },
  { name: "LG",      href: "/brands/lg" },
  { name: "MSI",     href: "/brands/msi" },
  { name: "Samsung", href: "/brands/samsung" },
  { name: "Microsoft", href: "/brands/microsoft" },
  { name: "Gigabyte",  href: "/brands/gigabyte" },
];

const PC_COMPONENT_BRANDS = [
  { name: "Intel",    href: "/brands/intel" },
  { name: "AMD",      href: "/brands/amd" },
  { name: "ASUS",     href: "/brands/asus" },
  { name: "Gigabyte", href: "/brands/gigabyte" },
  { name: "MSI",      href: "/brands/msi" },
  { name: "Corsair",  href: "/brands/corsair" },
  { name: "Kingston", href: "/brands/kingston" },
  { name: "Samsung",  href: "/brands/samsung" },
  { name: "WD",       href: "/brands/wd" },
  { name: "Seagate",  href: "/brands/seagate" },
];

const PERIPHERAL_BRANDS = [
  { name: "Logitech",  href: "/brands/logitech" },
  { name: "Razer",     href: "/brands/razer" },
  { name: "Corsair",   href: "/brands/corsair" },
  { name: "HyperX",   href: "/brands/hyperx" },
  { name: "SteelSeries", href: "/brands/steelseries" },
  { name: "Keychron", href: "/brands/keychron" },
  { name: "DAREU",    href: "/brands/dareu" },
  { name: "Akko",     href: "/brands/akko" },
];

// ─── Config ───────────────────────────────────────────────────────────────────

export const STORE_MEGA_MENU: SidebarMenuCategory[] = [
  // 1 ── Apple
  {
    id: "apple",
    label: "Sản phẩm Apple",
    panel: {
      columns: [
        [
          {
            heading: "Mac",
            headingHref: "/products/mac",
            items: [
              { label: "MacBook Air M3",  href: "/products/macbook-air-m3",  badge: "Hot" },
              { label: "MacBook Pro M3",  href: "/products/macbook-pro-m3",  badge: "Hot" },
              { label: "Mac mini M4",     href: "/products/mac-mini-m4" },
              { label: "iMac",            href: "/products/imac" },
              { label: "Mac Pro",         href: "/products/mac-pro" },
            ],
          },
          {
            heading: "iPhone",
            headingHref: "/products/iphone",
            items: [
              { label: "iPhone 16 Series",      href: "/products/iphone-16",      badge: "Hot" },
              { label: "iPhone 16 Pro Series",  href: "/products/iphone-16-pro",  badge: "Hot" },
              { label: "iPhone 15 Series",      href: "/products/iphone-15" },
            ],
          },
        ],
        [
          {
            heading: "iPad",
            headingHref: "/products/ipad",
            items: [
              { label: "iPad Pro M4",      href: "/products/ipad-pro-m4",  badge: "New" },
              { label: "iPad Air M2",      href: "/products/ipad-air-m2" },
              { label: "iPad mini 7",      href: "/products/ipad-mini-7" },
              { label: "iPad (10th gen)",  href: "/products/ipad-10" },
            ],
          },
          {
            heading: "Apple Watch",
            headingHref: "/products/apple-watch",
            items: [
              { label: "Apple Watch Series 10", href: "/products/apple-watch-10", badge: "New" },
              { label: "Apple Watch Ultra 2",   href: "/products/apple-watch-ultra-2" },
              { label: "Apple Watch SE 2",      href: "/products/apple-watch-se-2" },
            ],
          },
        ],
        [
          {
            heading: "Phụ Kiện Apple",
            headingHref: "/products/apple-accessories",
            items: [
              { label: "AirPods 4",          href: "/products/airpods-4",          badge: "New" },
              { label: "AirPods Pro 2",      href: "/products/airpods-pro-2" },
              { label: "Apple Pencil",       href: "/products/apple-pencil" },
              { label: "Magic Keyboard",     href: "/products/magic-keyboard" },
              { label: "Magic Mouse",        href: "/products/magic-mouse" },
              { label: "MagSafe Charger",    href: "/products/magsafe-charger" },
              { label: "Apple TV 4K",        href: "/products/apple-tv" },
            ],
          },
        ],
      ],
    },
  },

  // 2 ── Laptop Tablet Surface
  {
    id: "laptop-tablet",
    label: "Laptop, Tablet, Surface",
    panel: {
      columns: [
        [
          {
            heading: "Laptop Văn Phòng",
            headingHref: "/products/laptop-van-phong",
            items: [
              { label: "Laptop Asus",     href: "/products/laptop-asus" },
              { label: "Laptop Acer",     href: "/products/laptop-acer" },
              { label: "Laptop Dell",     href: "/products/laptop-dell" },
              { label: "Laptop HP",       href: "/products/laptop-hp" },
              { label: "Laptop Lenovo",   href: "/products/laptop-lenovo" },
              { label: "Laptop LG Gram",  href: "/products/laptop-lg-gram" },
            ],
          },
          {
            heading: "Tablet & Surface",
            headingHref: "/products/tablet",
            items: [
              { label: "Surface Pro",          href: "/products/surface-pro",      badge: "New" },
              { label: "Surface Laptop",       href: "/products/surface-laptop" },
              { label: "Samsung Galaxy Tab",   href: "/products/samsung-galaxy-tab" },
              { label: "Máy tính bảng Android",href: "/products/android-tablet" },
            ],
          },
        ],
        [
          {
            heading: "Laptop Theo Cấu Hình",
            headingHref: "/products/laptop-cau-hinh",
            items: [
              { label: "Laptop Core i5",    href: "/products/laptop-i5" },
              { label: "Laptop Core i7",    href: "/products/laptop-i7" },
              { label: "Laptop Core i9",    href: "/products/laptop-i9" },
              { label: "Laptop Ryzen 5",    href: "/products/laptop-ryzen5" },
              { label: "Laptop Ryzen 7",    href: "/products/laptop-ryzen7" },
              { label: "Laptop Apple M-Series", href: "/products/laptop-apple-m" },
            ],
          },
          {
            heading: "Theo Khoảng Giá",
            headingHref: "/products/laptop-gia",
            items: [
              { label: "Dưới 10 Triệu",   href: "/products/laptop?maxPrice=10000000" },
              { label: "10 – 15 Triệu",   href: "/products/laptop?minPrice=10000000&maxPrice=15000000" },
              { label: "15 – 20 Triệu",   href: "/products/laptop?minPrice=15000000&maxPrice=20000000" },
              { label: "20 – 30 Triệu",   href: "/products/laptop?minPrice=20000000&maxPrice=30000000" },
              { label: "Trên 30 Triệu",   href: "/products/laptop?minPrice=30000000" },
            ],
          },
        ],
      ],
      brands: LAPTOP_BRANDS,
    },
  },

  // 3 ── Laptop Gaming
  {
    id: "laptop-gaming",
    label: "Laptop Gaming, Đồ Họa",
    badge: "Hot",
    panel: {
      columns: [
        [
          {
            heading: "Laptop Gaming",
            headingHref: "/products/laptop-gaming",
            headingBadge: "Hot",
            items: [
              { label: "Laptop Gaming Asus", href: "/products/laptop-gaming-asus", hasChildren: true, children: [
                { label: "ROG Strix G16 / G18",    href: "/products/laptop-gaming-asus-rog-strix" },
                { label: "ROG Zephyrus G14",        href: "/products/laptop-gaming-asus-zephyrus-g14", badge: "Hot" },
                { label: "ROG Zephyrus G16",        href: "/products/laptop-gaming-asus-zephyrus-g16" },
                { label: "TUF Gaming A15",          href: "/products/laptop-gaming-asus-tuf-a15" },
                { label: "TUF Gaming F15",          href: "/products/laptop-gaming-asus-tuf-f15" },
              ]},
              { label: "Laptop Gaming Acer", href: "/products/laptop-gaming-acer", hasChildren: true, children: [
                { label: "Predator Helios 16",      href: "/products/laptop-gaming-acer-predator-16", badge: "Hot" },
                { label: "Predator Helios 300",     href: "/products/laptop-gaming-acer-predator-300" },
                { label: "Nitro V 15",              href: "/products/laptop-gaming-acer-nitro-v" },
                { label: "Nitro 5 AN515",           href: "/products/laptop-gaming-acer-nitro5" },
              ]},
              { label: "Laptop Gaming HP", href: "/products/laptop-gaming-hp", hasChildren: true, children: [
                { label: "OMEN Transcend 16",       href: "/products/laptop-gaming-hp-omen-transcend", badge: "New" },
                { label: "OMEN 16",                 href: "/products/laptop-gaming-hp-omen-16" },
                { label: "Victus 15",               href: "/products/laptop-gaming-hp-victus" },
              ]},
              { label: "Laptop Gaming Dell", href: "/products/laptop-gaming-dell", hasChildren: true, children: [
                { label: "Dell G15 5530",           href: "/products/laptop-gaming-dell-g15" },
                { label: "Dell G16 7630",           href: "/products/laptop-gaming-dell-g16" },
              ]},
              { label: "Laptop Gaming Alienware", href: "/products/laptop-gaming-alienware", hasChildren: true, children: [
                { label: "Alienware m16 R2",        href: "/products/laptop-gaming-alienware-m16-r2", badge: "New" },
                { label: "Alienware x16",           href: "/products/laptop-gaming-alienware-x16" },
                { label: "Alienware m15 R7",        href: "/products/laptop-gaming-alienware-m15" },
              ]},
              { label: "Laptop Gaming Lenovo", href: "/products/laptop-gaming-lenovo", hasChildren: true, children: [
                { label: "Legion 5 Pro Gen 9",      href: "/products/laptop-gaming-lenovo-legion5pro", badge: "Hot" },
                { label: "Legion 5i Gen 9",         href: "/products/laptop-gaming-lenovo-legion5i" },
                { label: "Legion 7i Gen 9",         href: "/products/laptop-gaming-lenovo-legion7i" },
                { label: "LOQ 15IRH8",              href: "/products/laptop-gaming-lenovo-loq" },
              ]},
              { label: "Laptop Gaming MSI", href: "/products/laptop-gaming-msi", hasChildren: true, children: [
                { label: "MSI Raider GE78",         href: "/products/laptop-gaming-msi-raider", badge: "New" },
                { label: "MSI Titan GT77",          href: "/products/laptop-gaming-msi-titan" },
                { label: "MSI Katana 15",           href: "/products/laptop-gaming-msi-katana" },
                { label: "MSI Pulse GL76",          href: "/products/laptop-gaming-msi-pulse" },
              ]},
              { label: "Laptop Gaming Gigabyte", href: "/products/laptop-gaming-gigabyte", hasChildren: true, children: [
                { label: "AORUS 17X",               href: "/products/laptop-gaming-gigabyte-aorus-17x", badge: "Hot" },
                { label: "AORUS 16X",               href: "/products/laptop-gaming-gigabyte-aorus-16x" },
                { label: "G7 KF",                   href: "/products/laptop-gaming-gigabyte-g7" },
              ]},
            ],
          },
          {
            heading: "Kệ Tay Bàn Phím Chuột",
            headingHref: "/products/ke-tay-ban-phim",
            items: [
              { label: "Kệ Tay Gỗ",              href: "/products/ke-tay-go" },
              { label: "Kệ Tay Da",              href: "/products/ke-tay-da" },
              { label: "Combo Kệ Tay Phím Chuột",href: "/products/combo-ke-tay" },
            ],
          },
          {
            heading: "Đế Tản Nhiệt Laptop Gaming",
            headingHref: "/products/de-tan-nhiet",
            headingBadge: "Hot",
            items: [
              { label: "Xem tất cả", href: "/products/de-tan-nhiet" },
            ],
          },
        ],
        [
          {
            heading: "Laptop Theo Cấu Hình",
            headingHref: "/products/laptop-gaming-cau-hinh",
            items: [
              { label: "CPU",                href: "/products/laptop-gaming?filter=cpu" },
              { label: "VGA",                href: "/products/laptop-gaming?filter=vga" },
              { label: "RAM",                href: "/products/laptop-gaming?filter=ram" },
              { label: "Kích Thước Màn Hình",href: "/products/laptop-gaming?filter=screen-size" },
              { label: "Độ Phân Giải Màn Hình",href: "/products/laptop-gaming?filter=resolution" },
              { label: "Tần Số Màn Hình",   href: "/products/laptop-gaming?filter=refresh-rate" },
              { label: "Cảm Ứng Màn Hình",  href: "/products/laptop-gaming?filter=touch" },
              { label: "Tùy Chọn Ổ Cứng",   href: "/products/laptop-gaming?filter=storage" },
              { label: "Hệ Điều Hành",       href: "/products/laptop-gaming?filter=os" },
            ],
          },
          {
            heading: "Bàn, Kệ, Giá Đỡ Laptop",
            headingHref: "/products/ban-ke-laptop",
            items: [
              { label: "Bàn Laptop",    href: "/products/ban-laptop" },
              { label: "Kệ Laptop",     href: "/products/ke-laptop" },
              { label: "Giá Đỡ Laptop", href: "/products/gia-do-laptop" },
            ],
          },
          {
            heading: "Bộ Mở Rộng Màn Hình Laptop",
            headingHref: "/products/mo-rong-man-hinh",
            items: [
              { label: "Bộ 2 Màn Hình 11→15 inch", href: "/products/bo-2-man-hinh" },
            ],
          },
        ],
        [
          {
            heading: "Laptop Gaming Theo Khoảng Giá",
            headingHref: "/products/laptop-gaming-gia",
            headingBadge: "Hot",
            items: [
              { label: "Dưới 20 Triệu",    href: "/products/laptop-gaming?maxPrice=20000000" },
              { label: "RTX 50 Series",     href: "/products/laptop-gaming?vga=rtx50",   badge: "Hot" },
              { label: "RTX 40 Series",     href: "/products/laptop-gaming?vga=rtx40" },
              { label: "RTX 30 Series",     href: "/products/laptop-gaming?vga=rtx30" },
              { label: "RTX 10-20 Series",  href: "/products/laptop-gaming?vga=rtx10-20" },
              { label: "AMD RX Series",     href: "/products/laptop-gaming?vga=amd-rx" },
              { label: "50 - 60 Triệu",     href: "/products/laptop-gaming?minPrice=50000000&maxPrice=60000000" },
              { label: "60 - 70 Triệu",     href: "/products/laptop-gaming?minPrice=60000000&maxPrice=70000000" },
              { label: "Trên 70 Triệu",     href: "/products/laptop-gaming?minPrice=70000000" },
            ],
          },
          {
            heading: "Bàn Di Chuột, Thảm Gaming",
            headingHref: "/products/ban-di-chuot",
            items: [
              { label: "Thảm Da Gaming Full Size",     href: "/products/tham-da-gaming" },
              { label: "Bàn Di Chuột Gaming Có LED",   href: "/products/ban-di-chuot-led" },
              { label: "Bàn Di Chuột Gaming Không LED",href: "/products/ban-di-chuot-no-led" },
              { label: "Bàn Di Chuột Cỡ Nhỏ",         href: "/products/ban-di-chuot-nho" },
            ],
          },
        ],
        [
          {
            heading: "Laptop Đồ Họa",
            headingHref: "/products/laptop-do-hoa",
            headingBadge: "Hot",
            items: [
              { label: "Laptop Đồ Họa Asus", href: "/products/laptop-do-hoa-asus", hasChildren: true, children: [
                { label: "ProArt StudioBook 16",    href: "/products/laptop-do-hoa-asus-proart-16" },
                { label: "ProArt StudioBook Pro",   href: "/products/laptop-do-hoa-asus-proart-pro" },
                { label: "Zenbook Pro 16X",         href: "/products/laptop-do-hoa-asus-zenbook-pro" },
              ]},
              { label: "Laptop Đồ Họa HP", href: "/products/laptop-do-hoa-hp", hasChildren: true, children: [
                { label: "ZBook Fury 16 G10",       href: "/products/laptop-do-hoa-hp-zbook-fury" },
                { label: "ZBook Studio 16 G10",     href: "/products/laptop-do-hoa-hp-zbook-studio" },
              ]},
              { label: "Laptop Đồ Họa Dell", href: "/products/laptop-do-hoa-dell", hasChildren: true, children: [
                { label: "Precision 5680",          href: "/products/laptop-do-hoa-dell-precision-5680" },
                { label: "Precision 7680",          href: "/products/laptop-do-hoa-dell-precision-7680" },
                { label: "XPS 15",                  href: "/products/laptop-do-hoa-dell-xps15" },
              ]},
              { label: "Laptop Đồ Họa Lenovo", href: "/products/laptop-do-hoa-lenovo", hasChildren: true, children: [
                { label: "ThinkPad X1 Extreme",     href: "/products/laptop-do-hoa-lenovo-x1-extreme" },
                { label: "ThinkPad P16 Gen 2",      href: "/products/laptop-do-hoa-lenovo-p16" },
              ]},
              { label: "Laptop Đồ Họa LG Gram", href: "/products/laptop-do-hoa-lg", hasChildren: true, children: [
                { label: "LG gram 17 (2024)",       href: "/products/laptop-do-hoa-lg-gram-17" },
                { label: "LG gram Pro 16",          href: "/products/laptop-do-hoa-lg-gram-pro-16" },
              ]},
              { label: "Laptop AI-Trí Tuệ Nhân Tạo", href: "/products/laptop-ai",      badge: "Hot" },
            ],
          },
          {
            heading: "Balo, Cặp, Túi Gaming",
            headingHref: "/products/balo-gaming",
            items: [
              { label: "Balo Gaming",          href: "/products/balo-gaming" },
              { label: "Túi Chống Sốc Gaming", href: "/products/tui-chong-soc-gaming" },
              { label: "Cặp Laptop Gaming",    href: "/products/cap-laptop-gaming" },
              { label: "Tủ Đựng Phụ Kiện",     href: "/products/tu-dung-phu-kien" },
              { label: "Bộ Vệ Sinh Laptop",    href: "/products/bo-ve-sinh-laptop" },
            ],
          },
        ],
      ],
      brands: LAPTOP_BRANDS,
    },
  },

  // 4 ── Phụ Kiện Laptop, PC
  {
    id: "phu-kien",
    label: "Phụ Kiện Laptop, PC, Điện Thoại",
    panel: {
      columns: [
        [
          {
            heading: "Phụ Kiện Laptop",
            headingHref: "/products/phu-kien-laptop",
            items: [
              { label: "Balo, Túi Laptop",       href: "/products/balo-tui-laptop" },
              { label: "Chuột Laptop",            href: "/products/chuot-laptop" },
              { label: "Bàn Phím Bluetooth",      href: "/products/ban-phim-bluetooth" },
              { label: "Hub USB, Dock",           href: "/products/hub-usb-dock" },
              { label: "Màn Hình Phụ Laptop",     href: "/products/man-hinh-phu" },
              { label: "Dây Sạc Laptop",          href: "/products/day-sac-laptop" },
              { label: "Đế Giữ Máy Tính Bảng",   href: "/products/de-giu-may-tinh-bang" },
            ],
          },
        ],
        [
          {
            heading: "Phụ Kiện PC",
            headingHref: "/products/phu-kien-pc",
            items: [
              { label: "Cáp HDMI, DisplayPort",  href: "/products/cap-hdmi" },
              { label: "Card Màn Hình",          href: "/products/card-man-hinh" },
              { label: "Card Âm Thanh",          href: "/products/card-am-thanh" },
              { label: "Card Capture",           href: "/products/card-capture" },
              { label: "USB Wi-Fi, Bluetooth",   href: "/products/usb-wifi" },
              { label: "KVM Switch",             href: "/products/kvm-switch" },
            ],
          },
        ],
        [
          {
            heading: "Phụ Kiện Điện Thoại",
            headingHref: "/products/phu-kien-dien-thoai",
            items: [
              { label: "Ốp Lưng, Bao Da",        href: "/products/op-lung" },
              { label: "Kính Cường Lực",          href: "/products/kinh-cuong-luc" },
              { label: "Sạc Nhanh, Cáp Sạc",     href: "/products/sac-nhanh" },
              { label: "Pin Dự Phòng",            href: "/products/pin-du-phong" },
              { label: "Giá Đỡ Điện Thoại",       href: "/products/gia-do-dien-thoai" },
              { label: "Gậy Selfie, Tripod",      href: "/products/gay-selfie" },
            ],
          },
        ],
      ],
      brands: PERIPHERAL_BRANDS,
    },
  },

  // 5 ── PC Gaming
  {
    id: "pc-gaming",
    label: "PC - Chơi Game, Học Tập",
    panel: {
      columns: [
        [
          {
            heading: "PC Bộ Gaming",
            headingHref: "/products/pc-gaming",
            headingBadge: "Hot",
            items: [
              { label: "PC Gaming RTX 5090",   href: "/products/pc-gaming-rtx5090",   badge: "Hot" },
              { label: "PC Gaming RTX 5080",   href: "/products/pc-gaming-rtx5080",   badge: "Hot" },
              { label: "PC Gaming RTX 4090",   href: "/products/pc-gaming-rtx4090" },
              { label: "PC Gaming RTX 4080",   href: "/products/pc-gaming-rtx4080" },
              { label: "PC Gaming RTX 4070",   href: "/products/pc-gaming-rtx4070" },
              { label: "PC Gaming RX 7900",    href: "/products/pc-gaming-rx7900" },
            ],
          },
          {
            heading: "Theo Khoảng Giá",
            items: [
              { label: "Dưới 10 Triệu",   href: "/products/pc-gaming?maxPrice=10000000" },
              { label: "10 – 15 Triệu",   href: "/products/pc-gaming?minPrice=10000000&maxPrice=15000000" },
              { label: "15 – 20 Triệu",   href: "/products/pc-gaming?minPrice=15000000&maxPrice=20000000" },
              { label: "20 – 30 Triệu",   href: "/products/pc-gaming?minPrice=20000000&maxPrice=30000000" },
              { label: "Trên 30 Triệu",   href: "/products/pc-gaming?minPrice=30000000" },
            ],
          },
        ],
        [
          {
            heading: "PC Bộ Học Tập - Văn Phòng",
            headingHref: "/products/pc-hoc-tap",
            items: [
              { label: "PC Intel Core i3",    href: "/products/pc-i3" },
              { label: "PC Intel Core i5",    href: "/products/pc-i5" },
              { label: "PC Intel Core i7",    href: "/products/pc-i7" },
              { label: "PC AMD Ryzen 3",      href: "/products/pc-ryzen3" },
              { label: "PC AMD Ryzen 5",      href: "/products/pc-ryzen5" },
              { label: "PC Mini (NUC, ...)",  href: "/products/pc-mini" },
            ],
          },
        ],
        [
          {
            heading: "Workstation",
            headingHref: "/products/workstation",
            items: [
              { label: "Workstation AMD EPYC",    href: "/products/workstation-epyc" },
              { label: "Workstation Intel Xeon",  href: "/products/workstation-xeon" },
              { label: "Workstation RTX A-Series",href: "/products/workstation-rtx-a" },
            ],
          },
          {
            heading: "Màn Hình Gaming",
            headingHref: "/products/man-hinh-gaming",
            items: [
              { label: "144Hz – 165Hz",    href: "/products/man-hinh-gaming?hz=165" },
              { label: "240Hz – 280Hz",    href: "/products/man-hinh-gaming?hz=240" },
              { label: "360Hz trở lên",    href: "/products/man-hinh-gaming?hz=360" },
              { label: "Màn Hình Cong",    href: "/products/man-hinh-cong" },
              { label: "Màn Hình 4K HDR",  href: "/products/man-hinh-4k" },
            ],
          },
        ],
      ],
      brands: PC_COMPONENT_BRANDS,
    },
  },

  // 6 ── PC Văn Phòng
  {
    id: "pc-van-phong",
    label: "PC - Văn Phòng, Đồ Họa",
    panel: {
      columns: [
        [
          {
            heading: "PC Văn Phòng",
            headingHref: "/products/pc-van-phong",
            items: [
              { label: "PC Văn Phòng Intel",  href: "/products/pc-van-phong-intel" },
              { label: "PC Văn Phòng AMD",    href: "/products/pc-van-phong-amd" },
              { label: "PC Mini",             href: "/products/pc-mini" },
              { label: "All-in-One",          href: "/products/pc-all-in-one" },
            ],
          },
        ],
        [
          {
            heading: "PC Đồ Họa",
            headingHref: "/products/pc-do-hoa",
            items: [
              { label: "PC RTX A-Series",        href: "/products/pc-do-hoa-rtx-a" },
              { label: "PC Quadro",              href: "/products/pc-do-hoa-quadro" },
              { label: "PC Đồ Họa AMD Radeon",   href: "/products/pc-do-hoa-amd" },
              { label: "Workstation HP Z-Series", href: "/products/workstation-hp" },
            ],
          },
        ],
        [
          {
            heading: "Màn Hình Văn Phòng",
            headingHref: "/products/man-hinh-van-phong",
            items: [
              { label: "Màn Hình 21–24 inch",    href: "/products/man-hinh?size=24" },
              { label: "Màn Hình 27–32 inch",    href: "/products/man-hinh?size=27" },
              { label: "Màn Hình UltraWide",     href: "/products/man-hinh-ultrawide" },
              { label: "Màn Hình Cảm Ứng",       href: "/products/man-hinh-cam-ung" },
            ],
          },
        ],
      ],
    },
  },

  // 7 ── Linh Kiện
  {
    id: "linh-kien",
    label: "Linh Kiện Máy Tính",
    panel: {
      columns: [
        [
          {
            heading: "CPU",
            headingHref: "/products/cpu",
            items: [
              { label: "Intel Core Ultra 9",   href: "/products/cpu-intel-ultra9",   badge: "New" },
              { label: "Intel Core Ultra 7",   href: "/products/cpu-intel-ultra7",   badge: "New" },
              { label: "Intel Core i9",        href: "/products/cpu-intel-i9" },
              { label: "Intel Core i7",        href: "/products/cpu-intel-i7" },
              { label: "Intel Core i5",        href: "/products/cpu-intel-i5" },
              { label: "AMD Ryzen 9 7000X3D",  href: "/products/cpu-ryzen9-x3d",    badge: "Hot" },
              { label: "AMD Ryzen 9",          href: "/products/cpu-ryzen9" },
              { label: "AMD Ryzen 7",          href: "/products/cpu-ryzen7" },
              { label: "AMD Ryzen 5",          href: "/products/cpu-ryzen5" },
            ],
          },
          {
            heading: "Mainboard",
            headingHref: "/products/mainboard",
            items: [
              { label: "Intel Z890",   href: "/products/mainboard-z890",  badge: "New" },
              { label: "Intel Z790",   href: "/products/mainboard-z790" },
              { label: "Intel B760",   href: "/products/mainboard-b760" },
              { label: "AMD X870E",    href: "/products/mainboard-x870e", badge: "New" },
              { label: "AMD X670",     href: "/products/mainboard-x670" },
              { label: "AMD B650",     href: "/products/mainboard-b650" },
            ],
          },
        ],
        [
          {
            heading: "Card Màn Hình (GPU)",
            headingHref: "/products/gpu",
            items: [
              { label: "NVIDIA RTX 5090",  href: "/products/gpu-rtx5090",  badge: "Hot" },
              { label: "NVIDIA RTX 5080",  href: "/products/gpu-rtx5080",  badge: "Hot" },
              { label: "NVIDIA RTX 5070",  href: "/products/gpu-rtx5070",  badge: "Hot" },
              { label: "NVIDIA RTX 4090",  href: "/products/gpu-rtx4090" },
              { label: "NVIDIA RTX 4080",  href: "/products/gpu-rtx4080" },
              { label: "NVIDIA RTX 4070",  href: "/products/gpu-rtx4070" },
              { label: "AMD RX 9070 XT",   href: "/products/gpu-rx9070xt", badge: "New" },
              { label: "AMD RX 7900 XTX",  href: "/products/gpu-rx7900xtx" },
              { label: "Intel Arc A770",   href: "/products/gpu-arc-a770" },
            ],
          },
          {
            heading: "RAM",
            headingHref: "/products/ram",
            items: [
              { label: "RAM DDR5 Desktop",   href: "/products/ram-ddr5" },
              { label: "RAM DDR4 Desktop",   href: "/products/ram-ddr4" },
              { label: "RAM Laptop DDR5",    href: "/products/ram-laptop-ddr5" },
              { label: "RAM Laptop DDR4",    href: "/products/ram-laptop-ddr4" },
            ],
          },
        ],
        [
          {
            heading: "Ổ Cứng",
            headingHref: "/products/o-cung",
            items: [
              { label: "SSD NVMe PCIe 5.0",  href: "/products/ssd-nvme-pcie5",  badge: "New" },
              { label: "SSD NVMe PCIe 4.0",  href: "/products/ssd-nvme-pcie4" },
              { label: "SSD SATA",           href: "/products/ssd-sata" },
              { label: "HDD Desktop",        href: "/products/hdd-desktop" },
              { label: "HDD Laptop",         href: "/products/hdd-laptop" },
              { label: "Ổ Cứng Di Động",     href: "/products/hdd-portable" },
            ],
          },
          {
            heading: "Nguồn & Case",
            headingHref: "/products/nguon-case",
            items: [
              { label: "Nguồn (PSU) ATX",     href: "/products/psu-atx" },
              { label: "Case PC ATX",         href: "/products/case-atx" },
              { label: "Case PC mATX",        href: "/products/case-matx" },
              { label: "Case PC ITX",         href: "/products/case-itx" },
            ],
          },
        ],
      ],
      brands: PC_COMPONENT_BRANDS,
    },
  },

  // 8 ── Tản Nhiệt
  {
    id: "tan-nhiet",
    label: "Tản Nhiệt, Fan, Đèn Led",
    panel: {
      columns: [
        [
          {
            heading: "Tản Nhiệt CPU",
            headingHref: "/products/tan-nhiet-cpu",
            items: [
              { label: "Tản Nhiệt Nước AIO 360mm",  href: "/products/tan-nhiet-nuoc-360" },
              { label: "Tản Nhiệt Nước AIO 240mm",  href: "/products/tan-nhiet-nuoc-240" },
              { label: "Tản Nhiệt Nước Custom",     href: "/products/tan-nhiet-nuoc-custom" },
              { label: "Tản Nhiệt Khí Tower",       href: "/products/tan-nhiet-khi-tower" },
              { label: "Tản Nhiệt Khí Low Profile", href: "/products/tan-nhiet-low-profile" },
            ],
          },
        ],
        [
          {
            heading: "Fan Case & Đèn LED",
            headingHref: "/products/fan-case",
            items: [
              { label: "Fan 120mm ARGB",   href: "/products/fan-120mm-argb" },
              { label: "Fan 140mm ARGB",   href: "/products/fan-140mm-argb" },
              { label: "Fan 120mm RGB",    href: "/products/fan-120mm-rgb" },
              { label: "Fan 80mm Slim",    href: "/products/fan-80mm" },
              { label: "Dây LED Strip",    href: "/products/day-led-strip" },
              { label: "Bộ Hub Fan",       href: "/products/hub-fan" },
            ],
          },
        ],
        [
          {
            heading: "Keo Tản Nhiệt & Phụ Kiện",
            items: [
              { label: "Keo Tản Nhiệt CPU",      href: "/products/keo-tan-nhiet" },
              { label: "Pad Tản Nhiệt RAM/SSD",  href: "/products/pad-tan-nhiet" },
              { label: "Đầu Nối Ống Nước",        href: "/products/dau-noi-ong-nuoc" },
            ],
          },
        ],
      ],
    },
  },

  // 9 ── Màn Hình
  {
    id: "man-hinh",
    label: "Màn Hình Máy Tính",
    panel: {
      columns: [
        [
          {
            heading: "Theo Kích Thước",
            headingHref: "/products/man-hinh",
            items: [
              { label: "Màn Hình 22–24 inch",    href: "/products/man-hinh?size=24" },
              { label: "Màn Hình 27 inch",        href: "/products/man-hinh?size=27" },
              { label: "Màn Hình 32 inch",        href: "/products/man-hinh?size=32" },
              { label: "Màn Hình 34 inch+ (UW)",  href: "/products/man-hinh?size=34" },
              { label: "Màn Hình 49 inch Super UW",href: "/products/man-hinh?size=49" },
            ],
          },
          {
            heading: "Theo Tần Số Quét",
            items: [
              { label: "60Hz – 75Hz (Văn Phòng)", href: "/products/man-hinh?hz=75" },
              { label: "144Hz – 165Hz",           href: "/products/man-hinh?hz=165" },
              { label: "240Hz – 280Hz",           href: "/products/man-hinh?hz=280" },
              { label: "360Hz trở lên",           href: "/products/man-hinh?hz=360" },
            ],
          },
        ],
        [
          {
            heading: "Theo Độ Phân Giải",
            items: [
              { label: "Full HD (1080p)",    href: "/products/man-hinh?res=fhd" },
              { label: "QHD / 2K (1440p)",  href: "/products/man-hinh?res=qhd" },
              { label: "4K UHD (2160p)",    href: "/products/man-hinh?res=4k" },
              { label: "OLED",              href: "/products/man-hinh?panel=oled", badge: "Hot" },
              { label: "Mini-LED",          href: "/products/man-hinh?panel=miniled" },
            ],
          },
          {
            heading: "Theo Hãng",
            items: [
              { label: "Màn Hình ASUS",     href: "/products/man-hinh-asus" },
              { label: "Màn Hình LG",       href: "/products/man-hinh-lg" },
              { label: "Màn Hình Samsung",  href: "/products/man-hinh-samsung" },
              { label: "Màn Hình Dell",     href: "/products/man-hinh-dell" },
              { label: "Màn Hình Acer",     href: "/products/man-hinh-acer" },
              { label: "Màn Hình MSI",      href: "/products/man-hinh-msi" },
              { label: "Màn Hình Gigabyte", href: "/products/man-hinh-gigabyte" },
            ],
          },
        ],
      ],
    },
  },

  // 10 ── Phím Chuột
  {
    id: "phim-chuot",
    label: "Phím Chuột, Bàn, Ghế, Gear",
    panel: {
      columns: [
        [
          {
            heading: "Bàn Phím",
            headingHref: "/products/ban-phim",
            items: [
              { label: "Bàn Phím Cơ (Mechanical)",  href: "/products/ban-phim-co" },
              { label: "Bàn Phím Không Dây",        href: "/products/ban-phim-khong-day" },
              { label: "Bàn Phím Gaming",           href: "/products/ban-phim-gaming" },
              { label: "Bàn Phím 60% / 65% / 75%", href: "/products/ban-phim-compact" },
              { label: "Bàn Phím TKL",              href: "/products/ban-phim-tkl" },
            ],
          },
        ],
        [
          {
            heading: "Chuột",
            headingHref: "/products/chuot",
            items: [
              { label: "Chuột Gaming",          href: "/products/chuot-gaming" },
              { label: "Chuột Không Dây",       href: "/products/chuot-khong-day" },
              { label: "Chuột Văn Phòng",       href: "/products/chuot-van-phong" },
              { label: "Chuột Ergonomic",       href: "/products/chuot-ergonomic" },
              { label: "Trackpad / Trackball",  href: "/products/trackpad" },
            ],
          },
        ],
        [
          {
            heading: "Bàn & Ghế Gaming",
            headingHref: "/products/ban-ghe-gaming",
            items: [
              { label: "Ghế Gaming",          href: "/products/ghe-gaming" },
              { label: "Ghế Công Thái Học",   href: "/products/ghe-cong-thai-hoc" },
              { label: "Bàn Gaming Nâng Hạ",  href: "/products/ban-gaming-nang-ha" },
              { label: "Bàn Gaming Cố Định",  href: "/products/ban-gaming-co-dinh" },
            ],
          },
        ],
      ],
      brands: PERIPHERAL_BRANDS,
    },
  },

  // 11 ── Console
  {
    id: "console",
    label: "PS5, Xbox, Nintendo, Game Pad",
    panel: {
      columns: [
        [
          {
            heading: "PlayStation 5",
            headingHref: "/products/ps5",
            items: [
              { label: "PS5 Console",           href: "/products/ps5-console" },
              { label: "PS5 Pro",               href: "/products/ps5-pro",    badge: "New" },
              { label: "DualSense Controller",  href: "/products/dualsense" },
              { label: "PS5 Game Titles",       href: "/products/ps5-games" },
            ],
          },
        ],
        [
          {
            heading: "Xbox",
            headingHref: "/products/xbox",
            items: [
              { label: "Xbox Series X",         href: "/products/xbox-series-x" },
              { label: "Xbox Series S",         href: "/products/xbox-series-s" },
              { label: "Xbox Controller",       href: "/products/xbox-controller" },
              { label: "Xbox Game Pass",        href: "/products/xbox-game-pass" },
            ],
          },
        ],
        [
          {
            heading: "Nintendo",
            headingHref: "/products/nintendo",
            items: [
              { label: "Nintendo Switch OLED",  href: "/products/switch-oled" },
              { label: "Nintendo Switch Lite",  href: "/products/switch-lite" },
              { label: "Nintendo Joy-Con",      href: "/products/joy-con" },
              { label: "Nintendo Switch Games", href: "/products/switch-games" },
            ],
          },
          {
            heading: "Tay Cầm PC",
            items: [
              { label: "Tay Cầm Xbox PC",     href: "/products/tay-cam-xbox-pc" },
              { label: "Tay Cầm DualShock PC",href: "/products/tay-cam-dualsense-pc" },
              { label: "Tay Cầm Generic",     href: "/products/tay-cam-generic" },
            ],
          },
        ],
      ],
    },
  },

  // 12 ── Loa, Tai Nghe
  {
    id: "audio",
    label: "Loa, Tai Nghe, Mic, Webcam",
    panel: {
      columns: [
        [
          {
            heading: "Tai Nghe",
            headingHref: "/products/tai-nghe",
            items: [
              { label: "Tai Nghe Gaming",           href: "/products/tai-nghe-gaming" },
              { label: "Tai Nghe Không Dây",        href: "/products/tai-nghe-khong-day" },
              { label: "Tai Nghe True Wireless",    href: "/products/twis" },
              { label: "Tai Nghe Over-Ear HiFi",    href: "/products/tai-nghe-hifi" },
            ],
          },
        ],
        [
          {
            heading: "Loa",
            headingHref: "/products/loa",
            items: [
              { label: "Loa Gaming",          href: "/products/loa-gaming" },
              { label: "Loa Bluetooth",       href: "/products/loa-bluetooth" },
              { label: "Loa 2.1 Soundbar",    href: "/products/loa-soundbar" },
              { label: "Loa Vi Tính Để Bàn",  href: "/products/loa-vi-tinh" },
            ],
          },
        ],
        [
          {
            heading: "Mic & Webcam",
            headingHref: "/products/mic-webcam",
            items: [
              { label: "Micro Gaming USB",    href: "/products/micro-gaming" },
              { label: "Micro Condenser",     href: "/products/micro-condenser" },
              { label: "Webcam Full HD",      href: "/products/webcam-fhd" },
              { label: "Webcam 4K",           href: "/products/webcam-4k" },
              { label: "Bộ Live Stream",      href: "/products/bo-live-stream" },
            ],
          },
        ],
      ],
      brands: [
        { name: "Logitech",    href: "/brands/logitech" },
        { name: "Razer",       href: "/brands/razer" },
        { name: "HyperX",      href: "/brands/hyperx" },
        { name: "SteelSeries", href: "/brands/steelseries" },
        { name: "JBL",         href: "/brands/jbl" },
        { name: "Sony",        href: "/brands/sony" },
        { name: "Bose",        href: "/brands/bose" },
        { name: "Edifier",     href: "/brands/edifier" },
      ],
    },
  },

  // 13–18: simpler panels
  {
    id: "camera",
    label: "Camera, Chuông, Khóa, Cháy",
    panel: {
      columns: [
        [
          {
            heading: "Camera An Ninh",
            headingHref: "/products/camera",
            items: [
              { label: "Camera IP Wifi",       href: "/products/camera-ip" },
              { label: "Camera Ngoài Trời",    href: "/products/camera-ngoai-troi" },
              { label: "Camera Trong Nhà",     href: "/products/camera-trong-nha" },
              { label: "Đầu Ghi Hình (DVR)",   href: "/products/dvr" },
            ],
          },
        ],
        [
          {
            heading: "Chuông & Khóa Thông Minh",
            headingHref: "/products/chuong-khoa",
            items: [
              { label: "Chuông Cửa Camera",    href: "/products/chuong-cua" },
              { label: "Khóa Cửa Thông Minh",  href: "/products/khoa-cua" },
              { label: "Khóa Vân Tay",         href: "/products/khoa-van-tay" },
            ],
          },
        ],
        [
          {
            heading: "Báo Cháy & An Toàn",
            items: [
              { label: "Đầu Báo Khói",     href: "/products/dau-bao-khoi" },
              { label: "Bình Chữa Cháy",   href: "/products/binh-chua-chay" },
              { label: "Đèn Khẩn Cấp",     href: "/products/den-khan-cap" },
            ],
          },
        ],
      ],
    },
  },
  {
    id: "van-phong",
    label: "TB Văn Phòng, Hội Nghị",
    panel: {
      columns: [
        [
          {
            heading: "Máy In & Máy Scan",
            headingHref: "/products/may-in",
            items: [
              { label: "Máy In Laser",        href: "/products/may-in-laser" },
              { label: "Máy In Phun Màu",     href: "/products/may-in-phun" },
              { label: "Máy In Đa Năng",      href: "/products/may-in-da-nang" },
              { label: "Máy Scan Tài Liệu",   href: "/products/may-scan" },
            ],
          },
        ],
        [
          {
            heading: "Hội Nghị",
            headingHref: "/products/hoi-nghi",
            items: [
              { label: "Máy Chiếu",           href: "/products/may-chieu" },
              { label: "Màn Chiếu",           href: "/products/man-chieu" },
              { label: "Camera Hội Nghị",     href: "/products/camera-hoi-nghi" },
              { label: "Loa Hội Nghị",        href: "/products/loa-hoi-nghi" },
            ],
          },
        ],
      ],
    },
  },
  {
    id: "mang-luu-tru",
    label: "TB Mạng, Lưu Trữ, Phần Mềm",
    panel: {
      columns: [
        [
          {
            heading: "Thiết Bị Mạng",
            headingHref: "/products/thiet-bi-mang",
            items: [
              { label: "Router Wifi 6E / 7",   href: "/products/router-wifi6",  badge: "Hot" },
              { label: "Mesh Wifi System",      href: "/products/mesh-wifi" },
              { label: "Switch Mạng",           href: "/products/switch-mang" },
              { label: "NAS (Lưu Trữ Mạng)",   href: "/products/nas" },
            ],
          },
        ],
        [
          {
            heading: "Phần Mềm & Bản Quyền",
            headingHref: "/products/phan-mem",
            items: [
              { label: "Windows 11 Pro",        href: "/products/windows-11" },
              { label: "Microsoft Office 365",  href: "/products/office-365" },
              { label: "Phần Mềm Bảo Mật",     href: "/products/antivirus" },
              { label: "Phần Mềm Đồ Họa",      href: "/products/software-design" },
            ],
          },
        ],
      ],
    },
  },
  {
    id: "gia-dung",
    label: "Gia Dụng, Điện Máy, Sức Khỏe",
    href: "/products/gia-dung",
  },
  {
    id: "sua-chua",
    label: "Dịch Vụ Sửa Chữa, Lắp Đặt",
    href: "/services",
  },
  {
    id: "do-choi",
    label: "Đồ Chơi Mô Hình Chính Hãng",
    href: "/products/do-choi-mo-hinh",
  },
];
