import { Outlet } from "react-router-dom";
import AppLayoutFooter from "./AppLayoutFooter";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <AppLayoutFooter />
    </div>
  );
}
