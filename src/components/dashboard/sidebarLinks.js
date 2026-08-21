import { House, Person, Gear, Bell, ShoppingBag, ShoppingCart, Bookmark, LifeRing, ClockArrowRotateLeft, Wallet} from "@gravity-ui/icons";
import {
  MdOutlineAddBox,
  MdOutlineInventory2,
  MdOutlineListAlt,
  MdOutlineBarChart,
  MdOutlinePeople,
} from "react-icons/md";

export const sidebarLinks = {
  buyer: [
    { name: "Overview", href: "/dashboard/buyer", icon: House },
    { name: "My Profile", href: "/dashboard/buyer/profile", icon: Person },
    { name: "My Orders", href: "/dashboard/buyer/orders", icon: ShoppingBag },
    { name: "Wishlist", href: "/dashboard/buyer/wishlist", icon: Bookmark },
    { name: "Cart", href: "/dashboard/buyer/cart", icon: ShoppingCart },
    // { name: "Support", href: "/dashboard/buyer/support", icon: LifeRing },
    { name: "Payment History", href: "/dashboard/buyer/payment-history", icon: ClockArrowRotateLeft },
  ],

  seller: [
    { name: "Overview", href: "/dashboard/seller", icon: House },
    { name: "My Profile", href: "/dashboard/seller/profile", icon: Person },
    { name: "Add Product", href: "/dashboard/seller/add-product", icon: MdOutlineAddBox },
    { name: "My Products", href: "/dashboard/seller/my-products", icon: MdOutlineInventory2 },
    { name: "Manage Orders", href: "/dashboard/seller/manage-orders", icon: MdOutlineListAlt },
    { name: "Analytics", href: "/dashboard/seller/analytics", icon: MdOutlineBarChart },
  ],

  admin: [
    { name: "Overview", href: "/dashboard/admin", icon: House },
    { name: "My Profile", href: "/dashboard/admin/profile", icon: Person },
    { name: "Manage Users", href: "/dashboard/admin/manage-users", icon: MdOutlinePeople },
    { name: "Manage Products", href: "/dashboard/admin/manage-products", icon: MdOutlineInventory2 },
    { name: "Manage Orders", href: "/dashboard/admin/manage-orders", icon: MdOutlineListAlt },
    { name: "Analytics", href: "/dashboard/admin/analytics", icon: MdOutlineBarChart },
    { name: "Payment Monitoring", href: "/dashboard/admin/manage-payments", icon: Wallet },
  ],
};

export const bottomLinks = (role) => [
  { name: "Settings", href: `/dashboard/${role}/settings`, icon: Gear },
];