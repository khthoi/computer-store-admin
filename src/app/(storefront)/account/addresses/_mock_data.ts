// ─── Types ────────────────────────────────────────────────────────────────────

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  isDefault: boolean;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_ADDRESSES: Address[] = [
  {
    id: "addr-001",
    fullName: "Nguyễn Văn An",
    phone: "0912345678",
    province: "TP. Hồ Chí Minh",
    district: "Quận 1",
    ward: "Phường Bến Nghé",
    street: "123 Đường Lê Lợi",
    isDefault: true,
  },
  {
    id: "addr-002",
    fullName: "Nguyễn Văn An",
    phone: "0987654321",
    province: "Hà Nội",
    district: "Quận Hoàn Kiếm",
    ward: "Phường Hàng Bạc",
    street: "45 Ngõ Hàng Bài",
    isDefault: false,
  },
  {
    id: "addr-003",
    fullName: "Trần Thị Bích",
    phone: "0903333222",
    province: "Đà Nẵng",
    district: "Quận Hải Châu",
    ward: "Phường Nam Dương",
    street: "88 Đường Trần Phú",
    isDefault: false,
  },
];
