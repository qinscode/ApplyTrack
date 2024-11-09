import { useLocation } from "react-router-dom";

export default function useCheckActiveNav() {
  const { pathname } = useLocation();

  const checkActiveNav = (nav: string) => {
    // 处理根路径
    if (nav === "/" && pathname === "/") {
      return true;
    }

    // 处理 /jobs 路径的特殊情况
    if (nav === "/jobs" && pathname === "/jobs") {
      return true;
    }

    // 如果不是根路径，则进行精确匹配
    if (nav !== "/") {
      // 移除开头的斜杠并转换为小写进行比较
      const normalizedNav = nav.replace(/^\//, "").toLowerCase();
      const normalizedPathname = pathname.replace(/^\//, "").toLowerCase();
      
      return normalizedPathname === normalizedNav;
    }

    return false;
  };

  return { checkActiveNav };
}
